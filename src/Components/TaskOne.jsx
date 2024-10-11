import { Decal, Environment, Html, OrbitControls, Plane, Text } from '@react-three/drei';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import React, { useState, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/three';
import { SketchPicker } from 'react-color';
import { Icon } from '@iconify/react/dist/iconify.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import reactLogo from '/images/images.png';


const degToRad = (degrees) => degrees * (Math.PI / 180);

const curvedText = (text, radius, angle) => {
  const letters = text.split('');
  const segmentAngle = angle / (letters.length - 1);
  return letters.map((letter, i) => {
    const theta = degToRad(-angle / 2 + segmentAngle * i);
    const x = radius * Math.sin(theta);
    const z = radius * Math.cos(theta);
    const rotationY = theta;
    return { letter, position: [x, 0, z], rotation: [0, rotationY, 0] };
  });
};

const BoxGeometry = ({ selectedText, fontSize,planeText, planeHight, textColor = 'black', color = 'orange', position, rotateX, rotateY }) => {
  const radius = 1;
  const angle = 150;
  const letters = curvedText(selectedText, radius, angle);
  const decalTexture = useLoader(TextureLoader, reactLogo);

   // Calculate plane position and rotation
   const planeRadius = radius; // on the sphere surface
   const planeAngle = degToRad(11); // angle on the sphere surface
   const planeX = planeRadius * Math.sin(planeAngle);
   const planeZ = planeRadius * Math.cos(planeAngle);
   const planeRotationX = degToRad(360); // rotate plane to be perpendicular to the sphere surface
   const planeRotationY = planeAngle;
 
  return (
    <mesh position={position} rotation={[rotateX, rotateY, 0]}>
      <sphereGeometry args={[1, 63, 63]} />
      <meshStandardMaterial emissive={color} emissiveIntensity={1} metalness={1} roughness={0} color={color} />
      {letters.map(({ letter, position, rotation }, index) => (
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
      <Decal position={[0, 0.5, 0.8]} rotation={[0, 0, 0]} scale={0.5} map={decalTexture} />
        {/* Add a plane with text on it */}
        <Plane position={[planeX, -0.3, planeZ]} rotation={[planeRotationX, planeRotationY, 0]} scale={0.5} args={[1.44, planeHight]}>
        <meshStandardMaterial 
        emissive={color}
         emissiveIntensity={1} 
         metalness={1} roughness={0} color={color} />
        <Text
          fontSize={fontSize}
          color={textColor}
          anchorX="center"      // Align text to the right
          anchorY="middle"        // Align text to the top
          // textAlign="center"    // Align text content to the right within the box
          maxWidth={0.9}      // Ensure text wraps within this width
          lineHeight={1.2}     // Adjust line height if needed
        >
          {planeText}
        </Text>
      </Plane>
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
          controlsRef.current.maxDistance = currentDistance + 1.99;
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

const TaskOne = () => {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 3]);
  const [selectedText, setSelectedText] = useState('The world is round and you can meet any one any time');
  const [fontSize, setFontSize] = useState(0.1);
  const [planeHight, setplaneHight] = useState(0.99);
  const [planeText, setPlaneText] = useState('This is for Plane Text');
  const [color, setColor] = useState('#390A63');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [envPreset, setEnvPreset] = useState('dawn');
  const rotateIntervalRef = useRef(null);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [isLimitedZoom, setIsLimitedZoom] = useState(false);
  const currentDistanceRef = useRef(3); // Default initial distance
  const initialDistance = 3; // Dynamic initial distance

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
    setEnvPreset(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    const value = e.target.value;
    if (value === "0.1") {
      setFontSize(0.1);
      setplaneHight(0.99);
    } else if (value === "0.2") {
      setFontSize(0.2);
      setplaneHight(2.66);
    } else if (value === "0.3") {
      setFontSize(0.3);
      setplaneHight(5.66);
    }
  };

  const handleTextChange = (e) => {
    setSelectedText(e.target.value);
  };
  const toggleZoomLock = () => {
    setZoomLocked((prev) => !prev);
  };
  const handlePlaneTextChange = (e) => {
    setPlaneText(e.target.value);
  };

  const toggleLimitedZoom = () => {
    setIsLimitedZoom((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen relative">
      <Canvas camera={{ position: [0, 0, 0.1], fov: 10 }}>
      <BoxGeometry
          selectedText={selectedText}
          fontSize={fontSize}
          planeText={planeText}
          planeHight={planeHight}
          textColor={textColor}
          color={color}
          position={[0, 0, 0]}
          rotateX={rotateX}
          rotateY={rotateY}
        />
        <CameraController cameraPosition={cameraPosition} />
        <Environment preset={envPreset} background={false} />
        <color attach="background" args={['#64748b']} />
        <Controls 
          isLimitedZoom={isLimitedZoom}
          currentDistanceRef={currentDistanceRef}
          initialDistance={initialDistance}
          zoomLocked={zoomLocked}
        />
        
        {/* <BoxGeometry text={Text} textColor={textColor} color={color} position={[0, 0.1, 0]} rotateX={rotateX} rotateY={rotateY} /> */}
        <Html>
          <div className='flex space-x-2 absolute bottom-[25rem] left-[550px] transform -translate-x-1/2'>
            
            <div>

              <button
                onMouseDown={() => startRotation('up')}
                onMouseUp={stopRotation}
                onMouseLeave={stopRotation}
                className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
              >
                <span className="relative flex items-center text-white font-bold px-4 py-2">Up</span>
              </button>
            </div>
            <button
              onMouseDown={() => startRotation('left')}
              onMouseUp={stopRotation}
              onMouseLeave={stopRotation}
              className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold px-4 py-2">Left</span>
            </button>
            <button
              onMouseDown={() => startRotation('down')}
              onMouseUp={stopRotation}
              onMouseLeave={stopRotation}
              className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold px-4 py-2">Down</span>
            </button>
            <button
              onMouseDown={() => startRotation('right')}
              onMouseUp={stopRotation}
              onMouseLeave={stopRotation}
              className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold px-4 py-2">Right</span>
            </button>
          </div>
          
          <div className='flex items-center right-24 bottom-[25rem] space-x-8 absolute transform -translate-x-1/2 p-4 rounded'>
            <div className="relative group">
              <button className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
                <span className="relative flex items-center text-white  font-bold px-4 py-2">Color <Icon className='mx-1' icon="pepicons-print:color-picker" /></span>
              </button>
              <div className="absolute z-10 hidden group-hover:block  p-2 bg-white border border-gray-300 rounded shadow-lg">
                <SketchPicker color={color} onChangeComplete={handleColorChange} />
              </div>
            </div>
            <div className="relative group">
              <button className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
                <span className="relative flex items-center text-white font-bold px-4 py-2">Text <Icon className='mx-1' icon="pepicons-print:color-picker" /></span>
              </button>
              <div className="absolute z-10 hidden group-hover:block mt-0 bg-white border border-gray-300 rounded shadow-lg">
                <SketchPicker color={textColor} onChangeComplete={handleTextColorChange} />
              </div>
            </div>
            <select value={envPreset} onChange={handleEnvPresetChange} className="inline-flex mt-2 p-2 border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-300">
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
              className="relative overflow-hidden rounded-lg h-12 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
            >
              <span className="relative flex items-center text-white font-bold w-16  justify-center ">
              {isLimitedZoom ? <Icon height={"30px"} icon="material-symbols:lock" /> : <Icon height={"30px"} icon="bi:unlock-fill" />}
              </span>
            </button>
         

            
          </div>
          <div className='relative right-[45.5rem] bottom-[10rem]'>
               <label className='text-white'>
          Select font size:
          <select
            className="border p-1 rounded w-full mb-10 text-black"
            value={fontSize}
            onChange={handleFontSizeChange}
          >
            <option value="0.1">Small</option>
            <option value="0.2">Medium</option>
            <option value="0.3">Large</option>
          </select>
        </label>
            
              
        <div className=" top-4 w-48 left-4 bg-white bg-opacity-75 p-4 rounded shadow-md">
        <label>
          Enter text:
          <textarea
            className="border p-1 rounded w-full"
            value={planeText} onChange={handlePlaneTextChange}
            rows={3}
          />
        </label>
            </div>
        </div>
        </Html>
      </Canvas>
    </div>
  );
};

export default TaskOne;
