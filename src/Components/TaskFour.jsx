import React, { Suspense, useEffect, useState} from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Decal, Environment, OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import sphereTexture from '/images/wallpaper.jpg'
import fb from '/images/fb1.png'
import ins from '/images/instagram.png'
import pho from '/images/photos.png'
import cal from '/images/calendar.png'
import saf from '/images/safaris.png'
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
import Loader from './TaskSix/Loader';
import { Leva, useControls } from 'leva';
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


const [mrmode,setMrmode] = useState(false)
const{
  Mobile_RMode,
} = useControls( {Mobile_RMode: { // Add model control
  value: false,
  label: "Mobile Mode",
  onChange: (value) => setMrmode(value),
}})

const getResponsiveStyles = () => {
  let styles = {
    position: "absolute",
    zIndex: 10,
    borderRadius: "38px",
    height: "81.5vh",
    // top: "46.5%",
    left: "50%",
    // margintop:"20%",
    transform: "translate(-60%, 12%)",
  };

  switch (true) {
    case window.innerHeight < 400:
      styles.width = "148px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight < 410:
      styles.width = "150px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight < 440:
      styles.width = "158px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight < 460:
      styles.width = "167px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight <= 479:
      styles.width = "175px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight <= 510:
      styles.width = "186px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight <= 556:
      styles.width = "206px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight <= 605:
      styles.width = "237px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight <= 658:
      styles.width = "255px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight <= 705:
      styles.width = "265px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight <= 750:
      styles.width = "287px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight <= 785:
      styles.width = "295px";
     // styles.borderRadius = "47px";
      break;
    case window.innerHeight < 800:
      styles.width = "297px";
     // styles.borderRadius = "44px";
      break;
    case window.innerHeight < 828:
      styles.width = "311px";
     // styles.borderRadius = "47px";
      break;
    case window.innerHeight < 875:
      styles.width = "330px";
     // styles.borderRadius = "47px";
      break;
    case window.innerHeight < 907:
      styles.width = "354px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight < 966:
      styles.width = "363px";
    //  styles.position= "absolute";
    //  styles.margintop= "10";
      //  styles.zIndex= 10;
      //  styles.borderRadius= "38px";
      //  styles.height= "81.5vh";
      //  styles.top= "46.5%";
      //  styles.left= "50%";
      //  styles.margintop= "20%"
      //  styles.transform= "translate(-50%, -50%)";
     // styles.borderRadius = "49px";
      break;
    case window.innerHeight < 1015:
      styles.width = "384px";
     // styles.borderRadius = "62px";
      break;
    case window.innerHeight < 1050:
      styles.width = "398px";
     // styles.borderRadius = "68px";
      break;
    case window.innerHeight < 1085:
      styles.width = "400px";
     // styles.borderRadius = "61px";
      break;
    default:
      styles.width = "427px";
     // styles.borderRadius = "80px";  // Fallback for other cases
      break;
  }

  // Optionally, you can include width-based responsiveness here as well, as per your initial code
  // if (window.innerWidth < 500) {
  //   styles.width = "348.2px";
  // } else if (window.innerWidth < 768) {
  //   styles.width = "15.5%";
  // } else if (window.innerWidth < 1200) {
  //   styles.width = "357px";
  // } else {
  //   styles.width = "357px";
  // }

  return styles;
};

const [responsiveStyles, setResponsiveStyles] = useState(getResponsiveStyles());

useEffect(() => {
  const handleResize = () => {
    setResponsiveStyles(getResponsiveStyles());
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


  return (
    <div>
      <Suspense fallback={<Loader/>}>

     
        <div>
<Leva/>
      
          <Canvas gl={{ outputEncoding: THREE.sRGBEncoding }} camera={{ position: [-1.1, 0, 2], fov: 10 }} style={mrmode ?{ height: '100vh' } : responsiveStyles}>

            <OrbitControls 
            // Consider enabling these if you need them
            maxDistance={1}
            minDistance={2}
            minPolarAngle={Math.PI / 2}  // Limit vertical rotation to a fixed angle
            maxPolarAngle={Math.PI / 2}    // Vertical rotation limit (keeping it as is)
            minAzimuthAngle={-0.0805}  // -5 degrees in radians
            maxAzimuthAngle={0.009} 
            />
            <Environment preset='night' />
            <BallObject /> 
   
          </Canvas>
        </div>
        </Suspense>
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
