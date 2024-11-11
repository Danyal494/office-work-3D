
import {
  Decal,
  Environment,
  Html,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useSpring } from "@react-spring/three";
import { TextureLoader, CanvasTexture, LinearFilter } from "three";
import * as THREE from "three";

import { Leva, useControls } from "leva";
import Loader from "./TaskSix/Loader";
import { Sphere } from "./Sphere";

const degToRad = (degrees) => degrees * (Math.PI / 180);

const createTextTexture = (
  text,
  heading,
  buttonText,
  headingColor,
  textColor,
  buttonColor
) => {
  const canvas = document.createElement("canvas");
  canvas.width = 4300; // Adjust this to control the resolution
  canvas.height = 2080; // Adjust this to control the resolution
  const context = canvas.getContext("2d");

  // Background
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Heading
  context.font = "bold 150px Arial";
  context.fillStyle = headingColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.lineJoin = "round";
  context.miterLimit = 2;
  context.fillText(heading, canvas.width / 2, 200);

  // Button
  const buttonWidth = 800; // Adjusted width
  const buttonHeight = 200; // Adjusted height
  const buttonX = canvas.width / 2 - buttonWidth / 2;
  const buttonY = 400; // Adjusted y-position

  context.fillStyle = buttonColor;
  context.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
  context.font = "bold 80px Arial"; // Larger font size
  context.fillStyle = textColor;
  context.fillText(buttonText, canvas.width / 2, buttonY + buttonHeight / 2);

  // Paragraph
  context.font = "50px Arial"; // Larger font size
  context.fillStyle = textColor;
  context.textAlign = "center";

  const words = text.split(" ");
  let line = "";
  let y = buttonY + buttonHeight + 100; // Adjusted y-position
  // let x = buttonX + buttonHeight + 0; // Adjusted y-position
  const lineHeight = 100; // Increased line height

  words.forEach((word) => {
    const testLine = `${line}${word} `;
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > canvas.width - 40 && line !== "") {
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

const BoxGeometry = ({
  text,
  mobile,
  heading,
  buttonText,
  headingColor,
  buttonColor,
  textColor = "black",
  color = "orange",
  position,
  rotateX,
  rotateY,
}) => {
  const texture = useMemo(() => {
    return createTextTexture(
      text,
      heading,
      buttonText,
      headingColor,
      textColor,
      buttonColor
    );
  }, [text, heading, buttonText, headingColor, textColor, buttonColor]);

  const SafariRef = useRef();
  const MailRef = useRef();
  const InstaRef = useRef();
  const PhotoRef = useRef();
  const [instaClicked, setInstaClicked] = useState(false);
  // const [safariHovered, setSafariHovered] = useState(false);
  const [safariClicked, setSafariClicked] = useState(false);
  const [mailClicked, setMailClicked] = useState(false);
  const [photoClicked, setPhotoClicked] = useState(false);
  const Safaritexture = useLoader(THREE.TextureLoader, "/images/safaris.png");
  const Instatexture = useLoader(THREE.TextureLoader, "/images/instagramw.png");
  const Mailtexture = useLoader(THREE.TextureLoader, "/images/Mailw.png");
  const Phototexture = useLoader(THREE.TextureLoader, "/images/Photow.png");
  useFrame(() => {
    if(SafariRef.current){

      const targetScales = {
        Safari: safariClicked
        ? new THREE.Vector3(1.2, 1.2, 1)
        : new THREE.Vector3(1, 1, 1),
      };
      
      SafariRef.current.scale.lerp(targetScales.Safari, 0.1);
    }
    if(MailRef.current){
      if (MailRef.current) {
        const targetScale = mailClicked ?  new THREE.Vector3(1.2, 1.2, 1) : new THREE.Vector3(1, 1, 1);
        MailRef.current.scale.lerp(targetScale, 0.1);
      }
    }
    if(InstaRef.current){
      if (MailRef.current) {
        const targetScale = instaClicked ?  new THREE.Vector3(1.2, 1.2, 1) : new THREE.Vector3(1, 1, 1);
        InstaRef.current.scale.lerp(targetScale, 0.1);
      }
    }
    
    // Photo icon scaling
    if (PhotoRef.current) {
      const targetScale = photoClicked ? new THREE.Vector3(1.2, 1.2, 1)  : new THREE.Vector3(1, 1, 1);
      PhotoRef.current.scale.lerp(targetScale, 0.1);
    }

  });
  useEffect(() => {
    const timeoutDuration = 1 * 1000; // 2 minutes in milliseconds

    // Set timeout for photoClicked
    if (photoClicked) {
      const timer = setTimeout(() => {
        setPhotoClicked(false);
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [photoClicked]);

  useEffect(() => {
    const timeoutDuration = 1 * 1000; // 2 minutes in milliseconds

    // Set timeout for photoClicked
    if (safariClicked) {
      const timer = setTimeout(() => {
        setSafariClicked(false);
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [safariClicked]);
  useEffect(() => {
    const timeoutDuration = 1 * 1000; // 2 minutes in milliseconds

    // Set timeout for photoClicked
    if (instaClicked) {
      const timer = setTimeout(() => {
        setInstaClicked(false);
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [instaClicked]);
  useEffect(() => {
    const timeoutDuration = 1 * 1000; // 2 minutes in milliseconds

    // Set timeout for photoClicked
    if (mailClicked) {
      const timer = setTimeout(() => {
        setMailClicked(false);
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [mailClicked]);

  return (
    <mesh
      position={position}
      rotation={[rotateX, rotateY, 0]}
      scale={mobile ? 0.7 : 1}
    >
      <sphereGeometry args={[1, 63, 63]} />
      <meshStandardMaterial
        metalness={0}
        roughness={0}
        opacity={1}
        color={color}
        map={texture}
      />

      <Decal
        depthWrite
        polygonOffset
        ref={SafariRef}
        polygonOffsetFactor={-4}
        // onPointerOver={() => setSafariHovered(true)}
        // onPointerOut={() => setSafariHovered(false)}
        onClick={() => setSafariClicked(true)}
        position={[0, 0.575, 0.8]}
        rotation={[0, 0, 0]}
        scale={new THREE.Vector3(0.08, 0.08, 0.08)}
        map={Safaritexture}
      />
      <Decal
        depthWrite
        polygonOffset
        ref={MailRef}
        polygonOffsetFactor={-4}
        // onPointerOver={() => setSafariHovered(true)}
        // onPointerOut={() => setSafariHovered(false)}
        onClick={() => setMailClicked(true)}
        position={[0.1, 0.575, 0.8]}
        rotation={[0, 0, 0]}
        scale={new THREE.Vector3(0.08, 0.08, 0.08)}
        map={Mailtexture}
      />
      <Decal
        depthWrite
        polygonOffset
        ref={InstaRef}
        polygonOffsetFactor={-4}
        // onPointerOver={() => setSafariHovered(true)}
        // onPointerOut={() => setSafariHovered(false)}
        onClick={() => setInstaClicked(true)}
        position={[-0.1, 0.575, 0.8]}
        rotation={[0, 0, 0]}
        scale={new THREE.Vector3(0.08, 0.08, 0.08)}
        map={Instatexture}
      />
      <Decal
        depthWrite
        polygonOffset
        ref={PhotoRef}
        polygonOffsetFactor={-4}
        // onPointerOver={() => setSafariHovered(true)}
        // onPointerOut={() => setSafariHovered(false)}
        onClick={() => setPhotoClicked(true)}
        position={[0.2, 0.575, 0.8]}
        rotation={[0, 0, 0]}
        scale={new THREE.Vector3(0.08, 0.08, 0.08)}
        map={Phototexture}
      />

      


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

const Controls = ({
  isLimitedZoom,
  currentDistanceRef,
  initialDistance,
  zoomLocked,
}) => {
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
          controlsRef.current.maxDistance = currentDistance + 1.1;
        } else {
          controlsRef.current.minDistance = currentDistance - 5;
          controlsRef.current.maxDistance = currentDistance + 5;
        }
        zoomLimitsSetRef.current = true;
      } else if (!isLimitedZoom) {
        controlsRef.current.minDistance = 2;
        controlsRef.current.maxDistance = 45;
        zoomLimitsSetRef.current = false;
      }

      controlsRef.current.update();
    }
  }, [isLimitedZoom]);

  useFrame(() => {
    if (controlsRef.current) {
      const currentDistance = controlsRef.current.object.position.distanceTo(
        controlsRef.current.target
      );
      currentDistanceRef.current = currentDistance;
    }
  });

  return <OrbitControls ref={controlsRef} enableZoom />;
};

const GGG = () => {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 3]);
  const [buttonText, setButtonText] = useState("Click Me");
  const [heading, setHeading] = useState("Global Text");
  const [text, setText] = useState( 
    " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos sit ea aliquam rerum, saepe fugit maxime nisi veritatis atque soluta dignissimos hic fuga error aut, dicta inventore quo quia cum?Numquam cupiditate autem fugit sit voluptatum itaque, ipsam dolorem repudiandae est doloribus modi saepe ipsa molestias excepturi quis perspiciatis ut nostrum aperiam hic. Veritatis suscipit blanditiis dolor voluptate magni ad!Facere possimus hic harum. Perferendis temporibus ab rerum iste nulla corrupti optio rem alias debitis sapiente voluptas in voluptatibus repellendus similique ullam inventore cum, quis minus accusantium cumque nisi quaerat. ,"
  );
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [environmentActive, setEnvironmentActive] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [isLimitedZoom, setIsLimitedZoom] = useState(false);
  const currentDistanceRef = useRef(3);
  const initialDistance = 3;
  const [model,setModel] = useState(false)
  const [join,setJoin] = useState(false)
  const [mmode,setMmode] = useState(true) 
  // Leva controls
  const {
    Rotate_X,
    Rotate_Y,
    Object_Color,
    Text_Color,
    Heading_Color,
    Button_Color,
    Environment_Preset,
    Zoom_Lock,
    Show_Environment,
    Limited_Zoom,
    Show_Model, // New toggle control for model
    Join_Model,
    Mobile_Mode,
    // Text_Input, // Added control for text input
  } = useControls({
    Rotate_X: {
      value: 0,
      min: -360,
      max: 360,
      step: 1,
      onChange: (value) => setRotateX(degToRad(value)),
    },
    Rotate_Y: {
      value: 0,
      min: -360,
      max: 360,
      step: 1,
      onChange: (value) => setRotateY(degToRad(value)),
    },
    Text_Color: { value: "#000000" },
    Heading_Color: { value: "#000000" },
    Button_Color: { value: "#ff0000" },
    Object_Color: { value: "#754280" },
    Environment_Preset: {
      value: "lobby",
      options: [
        "apartment",
        "city",
        "dawn",
        "forest",
        "lobby",
        "night",
        "park",
        "studio",
        "sunset",
        "warehouse",
      ],
    },
    Zoom_Lock: {
      value: false,
      onChange: (value) => setZoomLocked(value),
    },
    Show_Environment: {
      value: true,
      label: "Show Environment",
    },
    Limited_Zoom: {
      value: false,
      label: "Limited Zoom",
      onChange: (value) => setIsLimitedZoom(value),
    },
    Text_Input: {
      value: text,
      label: "Edit Text",
      onChange: (value) => setText(value),
    }, Show_Model: { // Add model control
      value: true,
      label: "Show Model",
      onChange: (value) => setModel(value),
    },
   Join_Model: { // Add model control
      value: false,
      label: "Join Model",
      onChange: (value) => setJoin(value),
    },
   Mobile_Mode: { // Add model control
      value: true,
      label: "Mobile Mode",
      onChange: (value) => setMmode(value),
    },
  });


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

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:500px)");
    setMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setMobile(event.matches);
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  

  return (
    <div >
      
      <Leva />
      <Suspense fallback={<Loader/>}>

      <Canvas
        gl={{ antialias: true }} style={mmode ? { height: "100vh", width: "100vw", overflow: "hidden", position: "relative" } : responsiveStyles}
        camera={{ position: [0, 0, 10], fov: 40, near: 0.1, far: 1000 }}
      >
        <ambientLight intensity={1.5} />
        <CameraController cameraPosition={cameraPosition} />
        {Show_Environment && Environment_Preset !== "none" && (
          <Environment preset={Environment_Preset} background={false} />
        )}
        <color attach="background" args={["#64748b"]} />
        <Controls
          isLimitedZoom={isLimitedZoom}
          currentDistanceRef={currentDistanceRef}
          initialDistance={initialDistance}
          zoomLocked={zoomLocked}
          />
         {join ? (
            <>
              <BoxGeometry
                text={text}
                heading={heading}
                buttonText={buttonText}
                headingColor={Heading_Color}
                buttonColor={Button_Color}
                textColor={Text_Color}
                color={Object_Color}
                position={[0, 0, 0]}
                rotateX={rotateX}
                rotateY={rotateY}
                mobile={mobile}
              />
              <Sphere
                text={text}
                headingColor={Heading_Color}
                buttonColor={Button_Color}
                createTextTexture={createTextTexture}
                heading={heading}
                textColor={Text_Color}
                position={[0, 0.1, 0]}
                rotateX={rotateX}
                rotateY={rotateY}
                mobile={mobile}
              />
            </>
          ) : model ? (
            <BoxGeometry
              text={text}
              heading={heading}
              buttonText={buttonText}
              headingColor={Heading_Color}
              buttonColor={Button_Color}
              textColor={Text_Color}
              color={Object_Color}
              position={[0, 0, 0]}
              rotateX={rotateX}
              rotateY={rotateY}
              mobile={mobile}
            />
          ) : (
            <Sphere
              text={text}
              color={Object_Color}
              headingColor={Heading_Color}
              buttonColor={Button_Color}
              createTextTexture={createTextTexture}
              heading={heading}
              textColor={Text_Color}
              position={[0, 0.1, 0]}
              rotateX={rotateX}
              rotateY={rotateY}
              mobile={mobile}
            />
          )}
       
       
         
      </Canvas>
          </Suspense>
    </div>
  );
};

export default GGG;
