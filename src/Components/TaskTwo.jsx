import { Decal, Environment, Html, OrbitControls, Text} from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useState, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/three';
import { TextureLoader, CanvasTexture, LinearFilter } from 'three';
import { BlockPicker} from 'react-color';
import { Icon } from '@iconify/react/dist/iconify.js';
// import { TextureLoader } from 'three/src/loaders/TextureLoader';
// import reactLogo from '/images.png';
// import { texture } from 'three/examples/jsm/nodes/Nodes.js';



const degToRad = (degrees) => degrees * (Math.PI / 180);

const createTextTexture = (text, heading, buttonText, headingColor, textColor, buttonColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = 4300; // Adjust this to control the resolution
  canvas.height = 2080; // Adjust this to control the resolution
  const context = canvas.getContext('2d');

  // Background
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Heading
  context.font = 'bold 150px Arial';
  context.fillStyle = headingColor;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.lineJoin = 'round';
  context.miterLimit = 2;
  context.fillText(heading, canvas.width / 2, 200);

  // Button
  const buttonWidth = 800; // Adjusted width
  const buttonHeight = 200; // Adjusted height
  const buttonX = (canvas.width / 2) - (buttonWidth / 2);
  const buttonY = 400; // Adjusted y-position

  context.fillStyle = buttonColor;
  context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
  context.font = 'bold 80px Arial'; // Larger font size
  context.fillStyle = textColor;
  context.fillText(buttonText, canvas.width / 2, buttonY + (buttonHeight / 2));

  // Paragraph
  context.font = '50px Arial'; // Larger font size
  context.fillStyle = buttonColor;
  context.textAlign = 'center';

  const words = text.split(' ');
  let line = '';
  let y = buttonY + buttonHeight + 100; // Adjusted y-position
  const lineHeight = 100; // Increased line height

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > canvas.width - 40 && line !== '') {
      context.fillText(line, canvas.width / 2, y);
      line = `${word} `;
      y += lineHeight;
    } else {
      line = testLine;
    }
  });
  context.fillText(line, canvas.width / 2, y);

  const texture = new CanvasTexture(canvas);
  texture.anisotropy = 16; // Increase anisotropy for better quality at an angle
  texture.minFilter = LinearFilter; // Use linear filter for smoother appearance
  texture.magFilter = LinearFilter; // Use linear filter for smoother appearance
  texture.generateMipmaps = false; // Disable mipmaps if text appears blurry

  return texture;
};


const BoxGeometry = ({ text,mobile, heading, buttonText, headingColor, buttonColor, textColor = 'black', color = 'orange', position, rotateX, rotateY }) => {
 
//   const decalTexture = useLoader(TextureLoader, reactLogo);
const texture = createTextTexture(text, heading, buttonText, headingColor,textColor, buttonColor);

  return (
    <mesh position={position}
     rotation={[rotateX, rotateY, 0]} scale={mobile ? 0.70 : 1}
     >

      <sphereGeometry args={[1, 63, 63]} />
      <meshStandardMaterial
      //  emissive={color}
      //  emissiveIntensity={1}
        metalness={0} roughness={0} opacity={1} color={color} map={texture} />
      {/* {letters.map(({ letter, position, rotation }, index) => (
        <Text
          key={index}
          position={position}
          rotation={rotation}
          fontSize={0.1}
          color={textColor}
          anchorX="center"
          anchorY="middle"
        >
          {letter}
        </Text>
      ))}
      <Decal position={[0, 0.5, 0.8]} rotation={[0, 0, 0]} scale={0.5} map={decalTexture} /> */}
    </mesh>
  );
};

const CameraController = ({ cameraPosition }) => {
  const { camera } = useThree();
  const { position } = useSpring({ position: cameraPosition });

  useEffect(() => {
    camera.position.set(...position.get());
    camera.updateProjectionMatrix();
  }, [position, camera]);

  return null;
};

const Controls = ({ isLimitedZoom, currentDistanceRef, initialDistance, zoomLocked }) => {
  const controlsRef = useRef();
  const { camera } = useThree();
  const [initialPositionSet, setInitialPositionSet] = useState(false);
  const zoomLimitsSetRef = useRef(false);

  useEffect(() => {
    if (!initialPositionSet) {
      camera.position.set(0, 0, initialDistance);
      setInitialPositionSet(true);
    }
  }, [camera, initialDistance, initialPositionSet]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = !zoomLocked;
      controlsRef.current.update();
    }
  }, [zoomLocked]);

  useEffect(() => {
    if (controlsRef.current) {
      const currentDistance = currentDistanceRef.current;

      if (isLimitedZoom && !zoomLimitsSetRef.current) {
        if (currentDistance <= 5) {
          controlsRef.current.minDistance = currentDistance - 1;
          controlsRef.current.maxDistance = currentDistance + 1.10;
        } else {
          controlsRef.current.minDistance = currentDistance - 5;
          controlsRef.current.maxDistance = currentDistance + 5;
        }
        zoomLimitsSetRef.current = true;
        console.log(`Min Distance: ${controlsRef.current.minDistance}, Max Distance: ${controlsRef.current.maxDistance}`);
      } else if (!isLimitedZoom) {
        controlsRef.current.minDistance = 2;
        controlsRef.current.maxDistance = 45;
        zoomLimitsSetRef.current = false;
        console.log(`Zoom limits reset: Min Distance: ${controlsRef.current.minDistance}, Max Distance: ${controlsRef.current.maxDistance}`);
      } 

      controlsRef.current.update();
    }
  }, [isLimitedZoom]);
  useFrame(() => {
    if (controlsRef.current) {
      const currentDistance = controlsRef.current.object.position.distanceTo(controlsRef.current.target);
      currentDistanceRef.current = currentDistance;
    }
  });

  return <OrbitControls ref={controlsRef} enableZoom />;
};

const GGG= () => {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 3]);
  const [buttonText, setButtonText] = useState('Click Me');
  const [heading, setHeading] = useState('Global Text');
  const [text, setText] = useState('TLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspicia Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure.a soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure');
  const [color, setColor] = useState('#754280');
  const [textColor, setTextColor] = useState('#000000');
  const [headingColor, setHeadingColor] = useState('#000000'); // Initial color for heading
const [buttonColor, setButtonColor] = useState('#ff0000'); // Initial color for button

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [envPreset, setEnvPreset] = useState('dawn');
  const rotateIntervalRef = useRef(null);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [isLimitedZoom, setIsLimitedZoom] = useState(false);
  const currentDistanceRef = useRef(3); // Default initial distance
  const initialDistance = 3; // Dynamic initial distance
  const [environmentActive, setEnvironmentActive] = useState(true);
  const [mobile, setmobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:500px)");
    setmobile(mediaQuery.matches);

    const handleMediaQuaryChange = (event) => {
      setmobile(event.matches);
      console.log('Media query matched:', event.matches); // Debug log
      console.log('Current mobile state:', mobile);  
      
      
    };
    mediaQuery.addEventListener("change", handleMediaQuaryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQuaryChange);
    };
  }, []);

  useEffect(() => {
    console.log('Updated mobile state:', mobile);
  }, [mobile]);
  
  const startRotation = (direction) => {
    if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
    }

    rotateIntervalRef.current = setInterval(() => {
      switch (direction) {
        case 'left':
          setRotateY((prevRotateY) => prevRotateY - degToRad(1));
          break;
        case 'right':
          setRotateY((prevRotateY) => prevRotateY + degToRad(1));
          break;
        case 'up':
          setRotateX((prevRotateX) => prevRotateX - degToRad(1));
          break;
        case 'down':
          setRotateX((prevRotateX) => prevRotateX + degToRad(1));
          break;
        default:
          break;
      }
    }, 40);
  };
  const handleHeadingColorChange = (color) => {
    setHeadingColor(color.hex);
};

const handleButtonColorChange = (color) => {
    setButtonColor(color.hex);
};

  const stopRotation = () => {
    if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
    }
  };

  const handleTextColorChange = (color) => {
    setTextColor(color.hex);
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleEnvPresetChange = (e) => {
    if (e.target.value === 'default') {
      setEnvironmentActive(!environmentActive);
    } else {
      setEnvPreset(e.target.value);
    }
  };

  const toggleZoomLock = () => {
    setZoomLocked((prev) => !prev);
  };

  const toggleLimitedZoom = () => {
    setIsLimitedZoom((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen relative">
      <Canvas gl={{antialias:true}} camera={{ position: [0, 0, 0.1], fov: 10, near: 0.1, far: 1000}}>
      <ambientLight intensity={1.5} />
      {/* <directionalLight position={[5, 5, 5]} intensity={1} /> */}
        <CameraController cameraPosition={cameraPosition} />
        {environmentActive && <Environment preset={envPreset} background={false} />}
        <color attach="background" args={['#64748b']} />
        <Controls 
          isLimitedZoom={isLimitedZoom}
          currentDistanceRef={currentDistanceRef}
          initialDistance={initialDistance}
          zoomLocked={zoomLocked}
        />
        <BoxGeometry text={text} headingColor={headingColor}
  buttonColor={buttonColor} buttonText={buttonText} mobile={mobile} heading={heading}  textColor={textColor} color={color} position={[0, 0.1, 0]} rotateX={rotateX} rotateY={rotateY} />
  {/* console.log("is mobile":mobile) */}
 
        <Html>
          <div className='flex max-sm:left-0 max-sm:-top-[135px] max-sm:gap-0 max-sm: space-x-1 absolute bottom-48 left-[550px] transform -translate-x-1/2'>
            <div>
              <button
                onMouseDown={() => startRotation('up')}
                onMouseUp={stopRotation}
                onMouseLeave={stopRotation}
                className="relative overflow-hidden rounded-lgmax-sm:rounded-none max-sm:hidden h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
              >
                <span className="relative  flex items-center text-white font-bold
     max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">Up</span>
              </button>
            </div>
            <button
              onMouseDown={() => startRotation('left')}
              onMouseUp={stopRotation}
              onMouseLeave={stopRotation}
              className="relative overflow-hidden rounded-lgmax-sm:rounded-none max-sm:hidden  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold
     max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">Left</span>
            </button>
            <button
              onMouseDown={() => startRotation('down')}
              onMouseUp={stopRotation}
              onMouseLeave={stopRotation}
              className="relative overflow-hidden rounded-lgmax-sm:rounded-none max-sm:hidden  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold
     max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">Down</span>
            </button>
            <button
              onMouseDown={() => startRotation('right')}
              onMouseUp={stopRotation}
              onMouseLeave={stopRotation}
              className="relative overflow-hidden rounded-lgmax-sm:rounded-none max-sm:hidden  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold
     max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">Right</span>
            </button>
          </div>
          <div className='flex max-sm:flex-col max-sm:justify-center max-sm:-right-[135px] max-sm:gap-2 max-sm:-bottom-20 items-center bottom-48 -right-[429px] space-x-8 absolute transform -translate-x-1/2 p-4 rounded'>
            <div className="relative group">
              <button className="relative overflow-hidden rounded-lgmax-sm:rounded-none max-sm:hidden  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
                <span className="relative flex items-center text-white font-bold
     max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">Color <Icon className='mx-1' icon="pepicons-print:color-picker" /></span>
              </button>
              <div className="absolute z-10 hidden group-hover:block  p-2 bg-white border border-gray-300 rounded shadow-lg">
                <BlockPicker  className="custom-sketch-picker" 
        //         styles={{
        //   default: {
        //     picker: {
        //       width: '100px', 
        //       height: '300px', 
        //     },
        //   },
        // }} 
        color={color} onChangeComplete={handleColorChange} />
              </div>
            </div>
            <div className="relative group">
  <button className="relative overflow-hidden rounded-lgmax-sm:rounded-none max-sm:hidden  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
    <span className="relative flex items-center text-white font-bold
     max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">
      Text <Icon className='mx-1' icon="pepicons-print:color-picker" />
    </span>
  </button>
  <div className="absolute z-10 hidden group-hover:block  p-2 bg-white border border-gray-300 rounded shadow-lg">
    <BlockPicker className="custom-sketch-picker" color={headingColor} onChangeComplete={handleHeadingColorChange} />
  </div>
</div>
{/* <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={environmentActive}
            onChange={() => setEnvironmentActive(!environmentActive)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full  peer-checked:bg-indigo-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
          
        </label>  */}
<div className="relative group">
  <button className="relative overflow-hidden rounded-lgmax-sm:rounded-none max-sm:hidden  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
    <span className="relative flex items-center text-white font-bold
     max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">
      Button <Icon className='mx-1' icon="pepicons-print:color-picker" />
    </span>
  </button>
  <div className="absolute z-10 hidden group-hover:block  p-2 max-sm:p-0 bg-white border border-gray-300 rounded shadow-lg">
    <BlockPicker className="custom-sketch-picker" color={buttonColor} onChangeComplete={handleButtonColorChange} />
  </div>
</div>


            {/* <div className="relative group">
              <button className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
                <span className="relative flex items-center text-white font-bold px-4 py-2">Text <Icon className='mx-1' icon="pepicons-print:color-picker" /></span>
              </button>
              <div className="absolute z-10 hidden group-hover:block mt-0 bg-white border border-gray-300 rounded shadow-lg">
                <BlockPicker color={textColor} onChangeComplete={handleTextColorChange} />
              </div>
            </div> */}
            <select value={envPreset} onChange={handleEnvPresetChange} className="inline-flex mt-2 p-2 w-28 max-sm:hidden border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-300">
              <option value="default">Default</option>
              <option value="city">City</option>
              <option value="sunset">Sunset</option>
              <option value="dawn">Dawn</option>
              <option value="night">Night</option>
              <option value="forest">Forest</option>
              <option value="apartment">Apartment</option>
              <option value="studio">Studio</option>
              <option value="warehouse">Warehouse</option>
              <option value="park">Park</option>
              <option value="lobby">Lobby</option>
            </select>
                 {/* <button
              onClick={toggleZoomLock}
              className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold px-4 py-2">
              {zoomLocked ? <Icon height={"30px"} icon="material-symbols:lock" /> : <Icon height={"30px"} icon="bi:unlock-fill" />}
              </span>
            </button> */}
            <button
              onClick={toggleLimitedZoom}
              className="relative overflow-hidden rounded-lgmax-sm:rounded-none max-sm:hidden  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold
     max-sm:font-light max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">
              {isLimitedZoom ? <Icon className='h-[30px] max-sm:h-[10px]'  icon="material-symbols:lock" /> : <Icon className='h-[30px] max-sm:h-[10px]' icon="bi:unlock-fill" />}
              </span>
            </button>
          </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default GGG;
