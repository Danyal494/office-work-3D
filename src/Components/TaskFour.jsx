import React, { Suspense} from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Decal, Environment, OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import sphereTexture from '/images/wallpaper.jpg'
import fb from '/images/fb1.png'
import ins from '/images/instagram.png'
import pho from '/images/photos.png'
import cal from '/images/calendar.png'
import saf from '/images/safari.png'
import mob from '/images/mobile.png'
import hea from '/images/health.png'
import set from '/images/settings.png'
import gam from '/images/game.png'
import cam from '/images/camera.png'
import map from '/images/map.png'
import app from '/images/appl.png'
import mus from '/images/music.png'
import cala from '/images/calculator.png'
import you from '/images/youtube.png'
import tok from '/images/tiktok.png'
import weather from '/images/weather.png'
import rad from '/images/radios.png'
import not from '/images/notes.png'
import mail from '/images/mails.png'
import * as THREE from 'three';
// Remove the unused appleLogo if it's not needed
// import appleLogo from '/apple.png';

const TaskFour = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, []);

  return (
    <div>
     
        <div>
          <Canvas gl={{ outputEncoding: THREE.sRGBEncoding }} camera={{ position: [-1.1, 0, 2], fov: 10 }} style={{ height: '100vh' }}>
            <Suspense fallback={""}>

            <OrbitControls 
            // Consider enabling these if you need them
            maxDistance={1}
            minDistance={2}
            minPolarAngle={Math.PI / 2}  // Limit vertical rotation to a fixed angle
            maxPolarAngle={Math.PI / 2}    // Vertical rotation limit (keeping it as is)
            minAzimuthAngle={-0.0760}  // -5 degrees in radians
            maxAzimuthAngle={0.009} 
            />
            <Environment preset='night' />
            <BallObject /> 
            </Suspense>
          </Canvas>
        </div>
      
    </div>
  );
};

export default TaskFour;

const BallObject = () => {
  
  const decalTexture = useLoader(TextureLoader, app);
  const safTexture = useLoader(TextureLoader, saf);
  const mobTexture = useLoader(TextureLoader, mob);
  const gamTexture = useLoader(TextureLoader, gam);
  const camTexture = useLoader(TextureLoader, cam);
  const setTexture = useLoader(TextureLoader, set);
  const fbTexture = useLoader(TextureLoader, fb);
  const insTexture = useLoader(TextureLoader, ins);
  const youTexture = useLoader(TextureLoader, you);
  const musTexture = useLoader(TextureLoader, mus);
  const calTexture = useLoader(TextureLoader, cal);
  const phoTexture = useLoader(TextureLoader, pho);
  const calaTexture = useLoader(TextureLoader, cala);
  const tokTexture = useLoader(TextureLoader, tok);
  const mailTexture = useLoader(TextureLoader, mail);
  const notTexture = useLoader(TextureLoader, not);
  const radTexture = useLoader(TextureLoader, rad);
  const mapTexture = useLoader(TextureLoader, map);
  const heaTexture = useLoader(TextureLoader, hea);
  const weatherTexture = useLoader(TextureLoader, weather);
  const texture = useLoader(TextureLoader,sphereTexture)
  insTexture.encoding = THREE.sRGBEncoding;
   // Increase the brightness by multiplying the texture color
   fbTexture.encoding = THREE.sRGBEncoding;
   decalTexture.encoding = THREE.sRGBEncoding;

  return (
    <mesh>
      <sphereGeometry args={[1, 80, 80]} />
      <meshStandardMaterial metalness={1
      } roughness={0.3} map={texture} />
      
      <Decal 
        position={[-0.109, 0.06, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.0201}  // Scale adjusted for a more fitting decal size
        map={fbTexture} 
      />
      <Decal 
        position={[-0.09, 0.06, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={false}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={insTexture} 
        emissive={new THREE.Color(0x000000)}  // Set emissive to black
  emissiveIntensity={0}
      />
     <Decal 
  position={[-0.07, 0.06, 1]}  // Position of the decal in question
  rotation={[0, 0, 0]} 
  scale={0.018}  // Scale adjusted for fitting size
  toneMapped={false}  // Disable tone mapping for this specific decal
  map={decalTexture} 
  emissive={new THREE.Color(0x000000)}  // Set emissive to black
  emissiveIntensity={0}  // Ensure no emissive intensity
/>
      <Decal 
        position={[-0.05, 0.06, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.017}  // Scale adjusted for a more fitting decal size
        map={safTexture} 
      />
      <Decal 
        position={[-0.049, 0.034, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.017}  // Scale adjusted for a more fitting decal size
        map={camTexture} 
      />
      <Decal 
        position={[-0.07, 0.034, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]}
        toneMapped={true}
        scale={0.017}  // Scale adjusted for a more fitting decal size
        map={setTexture} 
      >
     

      </Decal>
     
      <Decal 
        position={[-0.09, 0.034, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={musTexture} 
      />
      <Decal 
        position={[-0.09, 0.012, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.019}  // Scale adjusted for a more fitting decal size
        map={phoTexture} 
      />
      <Decal 
        position={[-0.11, 0.034, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={calTexture} 
        // emissive={new THREE.Color(0x000000)} // Set to black for no emission
        // emissiveIntensity={0} // Adjust this value to control brightness
      />
      <Decal 
        position={[-0.11, 0.012, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={youTexture} 
        // emissive={new THREE.Color(0x000000)} // Set to black for no emission
        // emissiveIntensity={0} // Adjust this value to control brightness
      />
      <Decal 
        position={[-0.11, -0.01, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={notTexture} 
        // emissive={new THREE.Color(0x000000)} // Set to black for no emission
        // emissiveIntensity={0} // Adjust this value to control brightness
      />
      <Decal 
        position={[-0.07, 0.012, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={radTexture} 
        // emissive={new THREE.Color(0x000000)} // Set to black for no emission
        // emissiveIntensity={0} // Adjust this value to control brightness
      />
      <Decal 
        position={[-0.050, 0.012, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={mailTexture} 
        // emissive={new THREE.Color(0x000000)} // Set to black for no emission
        // emissiveIntensity={0} // Adjust this value to control brightness
      />


      {/* left  */}
      <Decal 
        position={[-0.017, 0.06, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={calaTexture} 
      />
      <Decal 
        position={[0.002, 0.06, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={tokTexture} 
      />
      <Decal 
        position={[0.022, 0.06, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={gamTexture} 
      />
      <Decal 
        position={[0.041, 0.06, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={heaTexture} 
      />
      <Decal 
        position={[-0.017, 0.037, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={mobTexture} 
      />
      <Decal 
        position={[0.003, 0.037, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={weatherTexture} 
      />
      <Decal 
        position={[0.022, 0.037, 1]}  // Adjusted to be closer to the sphere's surface
        rotation={[0, 0, 0]} 
        toneMapped={true}
        scale={0.018}  // Scale adjusted for a more fitting decal size
        map={mapTexture} 
      />
     
   
    </mesh>
  );
};
