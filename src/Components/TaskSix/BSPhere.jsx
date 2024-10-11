import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Decal, Sphere, Environment } from "@react-three/drei";
import * as THREE from "three";
import bg from "/images/back.jpeg";
import Loader from "./Loader";
import { CanvasTexture,LinearFilter } from "three";

const DecalOnSphere = () => {
  const sphereRef = useRef();
  const [MailPosition] = useState(new THREE.Vector3(0, 0.09, 2)); // Position of decal
  const [MailScale] = useState(new THREE.Vector3(0.09, 0.10, 0.1)); // Increase scale of decal
  const [InstaScale] = useState(new THREE.Vector3(0.09, 0.10, 0.1)); // Increase scale of decal
  const [SafariScale] = useState(new THREE.Vector3(0.09, 0.10, 0.1)); // Increase scale of decal
  const [PhotoScale] = useState(new THREE.Vector3(0.09, 0.10, 0.1)); // Increase scale of decal
  const MailRotation = new THREE.Euler(0, 0, 0); // Decal rotation
  const Mailtexture = useLoader(THREE.TextureLoader, "/images/Untitled.png");
  const Instatexture = useLoader(THREE.TextureLoader, "/images/instagram copy.png");
  const Phototexture = useLoader(THREE.TextureLoader, "/images/Photo.png");
  const Safaritexture = useLoader(THREE.TextureLoader, "/images/safari copy.png");
  const bgtexture = useLoader(THREE.TextureLoader, bg);
  // Create a canvas texture with the paragraph text
  const createTextTexture = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = 6200;
    canvas.height = 6200;

    // Make the background transparent by not filling it
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.textRendering = "optimizeLegibility";

    // Text settings
    context.fillStyle = "white"; // Text color to contrast with the green sphere
    context.font = "100 150px CustomFont";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Add your paragraph text
    const paragraphText = `
    The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog again and again. The quick brown fox 
    jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog swiftly and elegantly. The quick brown fox jumps over the
     lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog with grace and speed. The quick brown fox jumps over the lazy dog. The
     quick brown fox jumps over the lazy dog. The quick brown fox leaps over with unmatched energy.The agile feline prowls in the night. The agile feline prowls in the night.
     
      The agile feline prowls in the shadows with a graceful leap. The agile feline prowls in the night. The agile feline prowls in the night. The agile feline moves silently,
  always out of sight.The moon glows bright in the sky tonight. The moon glows bright in the sky tonight. The moon lights up the night 
  like a shining beacon. The moon glows bright in the sky tonight. The moon glows bright in the sky tonight.The stars twinkle as they keep their secret glow. 
  The moon glows bright in the sky tonight. The moon glows bright in the sky tonight. The endless expanse continues to stretch beyond sight. The moon glows bright in the sky tonight.
   The moon glows bright in the sky tonight. The moon illuminates the dark as the earth spins slowly.Amidst the silence, whispers of the wind echo
    in every corner, stirring the trees gently and creating a soft lullaby as nature falls into slumber.

    The old zoom tower stands tall in the middle of the town. The old wasd tower stands tall with its hands frozen at midnight.The old alot tower is a relic from another era, watching silently.
     The old work tower stands tall in the middle of the town. The old alpha tower stands tall with its bricks weathered by time. The old beta tower echoes the memories of days long gone. 
     The old loop tower stands tall in the middle of the town. The old gama tower stands tall as the wind howls through its hollow frame, whispering tales from the past. The old zero tower
      stands tall in the middle of the town. The old Not tower stands tall with a lone raven perched on its peak, gazing over the cobblestone streets below.

The streets are empty, deserted under Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem , shadows creeping into every corner. The streets are empty, save for the gentle rustling of leaves. 
The streets are empty, deserted under ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum , an eerie silence hanging in the air. The streets are empty, echoing the sound of distant footsteps.
 The streets are empty, deserted under The quick brown fox jumps over the lazy dog, but every window holds a story. The streets are empty, yet whispers from the past seem to linger.
  The streets are empty, deserted under  The agile feline prowls in the night. The agile feline prowls, lit by the dim flickering lights. The streets are empty, carrying the scent of the rain that just fell.


A lone figure emerges, cloaked in mystery and shadow. A lone figure emerges with a tattered coat fluttering in the wind. A lone figure emerges, eyes gleaming with secrets untold. 
A lone figure emerges, cloaked in mystery and shadow. A lone figure emerges with footsteps echoing against the stone. A lone figure emerges, pausing to gaze up at the tower's peak.
 A lone figure emerges, cloaked in mystery and shadow. A lone figure emerges, clutching an old, worn-out map. A lone figure emerges, as if searching for something long lost. 
 A lone figure emerges, cloaked in mystery and shadow. A lone figure emerges, and his breath is visible in the cold night air. A lone figure emerges, carrying the weight of a forgotten 
 promise.

The wind picks up, carrying the scent of rain and pine. The wind picks up, howling through the narrow alleys. The wind picks up, as if it’s trying to whisper something important.
 The wind picks up, carrying the scent of rain and pine. The wind picks up, rustling the papers scattered on the ground. The wind picks up, swirling around the figure in a gentle embrace.
  The wind picks up, carrying the scent of rain and pine. The wind picks up, tugging at the corners of his map. The wind picks up, echoing a song only he can hear. The wind picks up,
   carrying the scent of rain and pine. The wind picks up, as the clouds gather overhead. The wind picks up, carrying the past and present in a single gust.

The figure pauses, looking up at the clock tower one last time. The figure pauses, tracing the map with a gloved finger. The figure pauses, as if the answer lies within the shadows.
 The figure pauses, looking up at the clock tower one last time. The figure pauses, feeling the weight of the years upon him. The figure pauses, ready to face whatever lies ahead. 
 The figure pauses, looking up at the clock tower one last time. The figure pauses, and the world holds its breath. The figure pauses, and then steps forward into the unknown.
  The figure pauses, looking up at the clock tower one last time. The figure pauses, as the clock strikes midnight. The figure pauses, ready to uncover the mystery of the night.

And so, under the watchful gaze of the tower, the figure continues on. The figure continues on, as the lanterns flicker and fade. The figure continues on, with the wind guiding
 his every step. And so, under the watchful gaze of the tower, the figure continues on. The figure continues on, disappearing into the misty horizon. The figure continues on, chasing 
 the story that the night hides. And so, under the watchful gaze of the tower, the figure continues on. The figure continues on, until only his shadow remains. The figure continues on,
  becoming one with the legend of the town. And so, under the watchful gaze of the tower, the figure continues on. The figure continues on, leaving only echoes in his wake.
   The figure continues on, as the story begins anew.
    `;

    // Split the paragraph into lines
    const lines = paragraphText.split("\n");
    const lineHeight = 140;
    const x = canvas.width / 2;
    let y = canvas.height / 2 - (lines.length / 2) * lineHeight;

    lines.forEach((line) => {
      context.fillText(line.trim(), x, y);
      y += lineHeight;
    });


    const texture = new CanvasTexture(canvas);
    texture.anisotropy = 16; // Higher quality
texture.minFilter = THREE.LinearMipMapLinearFilter;
texture.magFilter = THREE.LinearFilter;
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;
texture.needsUpdate = true; 

    return new THREE.CanvasTexture(canvas);
  };

  const textTexture = useMemo(() => createTextTexture(), []);

  
  const MailRef = useRef();
  const InstaRef= useRef()
  const PhotoRef= useRef()
  const SafariRef= useRef()
  const [mailHovered, setMailHovered] = useState(false);
  const [instaHovered, setInstaHovered] = useState(false);
  const [safariHovered, setSafariHovered] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);

  // Rotate the sphere slowly
  useFrame(() => {
    if (MailRef.current) {
      const targetScale = mailHovered ? new THREE.Vector3(1.2, 1.2, 1) : new THREE.Vector3(1, 1, 1);
      MailRef.current.scale.lerp(targetScale, 0.1);
    }
    if (InstaRef.current) {
      const targetScale = instaHovered ? new THREE.Vector3(1.2, 1.2, 1) : new THREE.Vector3(1, 1, 1);
      InstaRef.current.scale.lerp(targetScale, 0.1);
    }
    if (SafariRef.current) {
      const targetScale = safariHovered ? new THREE.Vector3(1.2, 1.2, 1) : new THREE.Vector3(1, 1, 1);
      SafariRef.current.scale.lerp(targetScale, 0.1);
    }
    if (PhotoRef.current) {
      const targetScale = photoHovered ? new THREE.Vector3(1.2, 1.2, 1) : new THREE.Vector3(1, 1, 1);
      PhotoRef.current.scale.lerp(targetScale, 0.1);
    }
    
  });

 

  return (
    <Sphere ref={sphereRef} args={[2, 128, 128]} position={[0, 0, 0]}>
      <meshStandardMaterial
        // color={"green"}
        metalness={0}
        roughness={0}
        emissiveMap={textTexture}
        map={bgtexture}
        emissive={"white"}
        transparent
        opacity={0.8}
      />
       <Decal
      position={[0, 0.09, 2]}
      scale={MailScale}
      rotation={[0, 0, 0]}
      map={Mailtexture}
      depthWrite={true}
      polygonOffset={true}
      polygonOffsetFactor={-4}
      onPointerOver={() => {
        setMailHovered(true);
        // console.log('mail hovered');
      }}
      onPointerOut={() => {
        setMailHovered(false);
        // console.log('mail unhovered');
      }}
      ref={MailRef}
    />
       <Decal
      position={[0.19, 0.09, 2]}
      scale={InstaScale}
      rotation={[0, 0, 0]}
      map={Instatexture}
      depthWrite={true}
      polygonOffset={true}
      polygonOffsetFactor={-4}
      onPointerOver={() => {
        setInstaHovered(true);
        // console.log('Insta hovered');
      }}
      onPointerOut={() => {
        setInstaHovered(false);
        // console.log('Insta unhovered');
      }}
      ref={InstaRef}
    />
      <Decal
        position={[0.35, 0.09, 2]}
        scale={PhotoScale}
        rotation={[0,0,0]}
        map={Phototexture}
        // depthTest={true}
        depthWrite={true}
        polygonOffset={true}
        polygonOffsetFactor={-4}
        onPointerOver={() => setPhotoHovered(true)}
        onPointerOut={() => setPhotoHovered(false)}
        ref={PhotoRef}
   
      />
      <Decal
        position={[-0.19, 0.09, 2]}
        scale={SafariScale}
        rotation={[0,0,0]}
        map={Safaritexture}
        // depthTest={true}
        depthWrite={true}
        polygonOffset={true}
        polygonOffsetFactor={-4}
        onPointerOver={() => setSafariHovered(true)}
        onPointerOut={() => setSafariHovered(false)}
        ref={SafariRef}
      
      />
    </Sphere>
  );
};

const NewSphere = () => {
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
    const getResponsiveStyles = () => {
        let styles = {
          position: "absolute",
          zIndex: 10,
          borderRadius: "38px",
          height: "81.5vh",
          top: "46.5%",
          left: "50%",
          transform: "translate(-50%, -50%)",
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
{loading ? (<Loader/>) : ( <Canvas
      style={responsiveStyles}
      camera={{ position: [0, 0, 10], fov: 3 }}
      >
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <Environment preset="city" background={false} /> 
      <color attach="background" args={["lightblue"]} />
      <DecalOnSphere />
      <OrbitControls 
      minDistance={19} maxDistance={28}
       />
    </Canvas>)}
   
        </div>
  );
};

export default NewSphere;
