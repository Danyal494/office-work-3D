import { Environment, Html, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useSpring } from '@react-spring/three';
import React, { useEffect, useRef, useState } from 'react'

import { Icon } from '@iconify/react/dist/iconify.js';
import { CanvasTexture, LinearFilter } from 'three';
import { BlockPicker } from 'react-color';
import { Sphere } from './Sphere';

const degToRad = (degrees) => degrees * (Math.PI / 180);



const createTextTexture = (text, heading, buttonText, headingColor, textColor, buttonColor) => {
  const canvas = document.createElement('canvas');
  canvas.width = 4300; // Adjust this to control the resolution
  canvas.height = 2080; // Adjust this to control the resolution
  const context = canvas.getContext('2d');

  // Background
  context.fillStyle = 'white';
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Check if the screen height is greater than 600px
  context.translate(canvas.width, 0);
  context.scale(-1, 1); // Apply mirror effect
  if (window.innerWidth > 600) {
}

  // Heading
  context.font = '60px Arial';
  context.fillStyle = headingColor;
  context.textAlign = 'center';
  context.textBaseline = 'left';
  context.lineJoin = 'round';
  context.miterLimit = 2;
  context.fillText(heading, canvas.width / 2, 200);
  context.fillText(heading, canvas.width / 2, 300);
  context.fillText(heading, canvas.width / 2, 400);

  // Additional text
  const additionalText = heading;
  const someData = "am doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed";
  context.font = 'normal 90px Arial';
  context.fillStyle = headingColor;
  context.textAlign = 'left';
  context.textBaseline = 'ideographic';

  let yPosition = 50;
  const lineHeight = 100; 

  // Button
  const buttonWidth = 0; // Adjusted width
  const buttonHeight = 0; // Adjusted height
  const buttonX = (canvas.width / 2) - (buttonWidth / 2);
  const buttonY = 400; // Adjusted y-position

  context.fillStyle = buttonColor;
  context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
  context.font = 'bold 80px Arial'; // Larger font size
  context.fillStyle = headingColor;
  context.fillText(buttonText, canvas.width / 2, buttonY + (buttonHeight / 2));

  // Paragraph
  context.font = '80px Arial'; // Larger font size
  context.fillStyle = headingColor;
  context.textAlign = 'center';

  const words = text.split(' ');
  let line = '';
  let y = buttonY + buttonHeight + 1; // Adjusted y-position
  const someHeight = 100; // Increased line height

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > canvas.width + 40 && line !== '') {
      context.fillText(line, canvas.width / 2, y);
      line = `${word} `;
      y += someHeight;
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
        controlsRef.current.maxDistance = 4.5;
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


const TaskFive = () => {
  const [heading, setHeading] = useState('onsectetur adipisicing elit. Possimus aperiam hic sapiente, eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem  sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure.');
  
  const [text, setText] = useState('TLorem ipsum dolor sit amet, consectetur adipiscing elit.  do eiusmod tempor incididunt ut labore et dolore maga aliqua.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspicia Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure.a soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure');
  const [rotateX, setRotateX] = useState(10.01);
  const [rotateY, setRotateY] = useState(90);
  const [color, setColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [headingColor, setHeadingColor] = useState('#000000'); // Initial color for heading
const [buttonColor, setButtonColor] = useState('#ff0000'); // Initial 
const rotateIntervalRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState([0, 0, 3]);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [isLimitedZoom, setIsLimitedZoom] = useState(false);
  const currentDistanceRef = useRef(3); // Default initial distance
  const initialDistance = 3;
  const [envPreset, setEnvPreset] = useState('dawn');
  const [environmentActive, setEnvironmentActive] = useState(false);
  const [mobile, setmobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:600px)");
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
  const toggleLimitedZoom = () => {
    setIsLimitedZoom((prev) => !prev);
  };
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
  const handleEnvPresetChange = (e) => {
    if (e.target.value === 'default') {
      setEnvironmentActive(!environmentActive);
    } else {
      setEnvPreset(e.target.value);
    }
  };
  const stopRotation = () => {
    if (rotateIntervalRef.current) {
      clearInterval(rotateIntervalRef.current);
    }
  };

  const handleColorChange = (color) => {
    setColor(color.hex);
  };

  const handleHeadingColorChange = (color) => {
    setHeadingColor(color.hex);
};

  return (
   <Canvas camera={{ position: [0, 0, 0.1], fov: 10 }} style={{height:"100vh"}}>
     <CameraController cameraPosition={cameraPosition} />
   <Controls 
          isLimitedZoom={isLimitedZoom}
          currentDistanceRef={currentDistanceRef}
          initialDistance={initialDistance}
          zoomLocked={zoomLocked}
        />
        <Html>
          <div >

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
  
        color={color} onChangeComplete={handleColorChange} />
              </div>
            </div>
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
<div className="relative group">

  
</div>
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

          </div>
        </Html>
        <color attach="background" args={["#87CEEB"]} />
        {environmentActive && <Environment preset={envPreset} background={false} />}
 <Sphere text={text} headingColor={headingColor}
  buttonColor={buttonColor} createTextTexture={createTextTexture} heading={heading}  textColor={textColor}  position={[0, 0.1, 0]}
   rotateX={rotateX} rotateY={rotateY} mobile={mobile} color={color}
     />
             <ambientLight intensity={1.5}/>
   </Canvas>
  )
}

export default TaskFive