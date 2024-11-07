import {
  Decal,
  Environment,
  Html,
  OrbitControls,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSpring } from "@react-spring/three";
import { TextureLoader, CanvasTexture, LinearFilter } from "three";
import * as THREE from "three";

import { Leva, useControls } from "leva";

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

  // const [safariHovered, setSafariHovered] = useState(false);
  const [safariClicked, setSafariClicked] = useState(false);

  const Safaritexture = useLoader(THREE.TextureLoader, "/images/safaris.png");

  useFrame(() => {
    const targetScales = {
      Safari: safariClicked
        ? new THREE.Vector3(1.2, 1.2, 1)
        : new THREE.Vector3(1, 1, 1),
    };

    SafariRef.current.scale.lerp(targetScales.Safari, 0.1);
  });

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
        position={[0, 0.601, 0.8]}
        rotation={[0, 0, 0]}
        scale={new THREE.Vector3(0.08, 0.08, 0.08)}
        map={Safaritexture}
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
    "TLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit  perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum  Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspicia Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure.a soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure. dolor sit amet consectetur adipisicing elit. Possimus aperiam hic sapiente, quam doloribus eos assumenda soluta iusto fugit perspiciatis quo, vitae vel sed. Harum eveniet sequi ut laudantium iure"
  );
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [environmentActive, setEnvironmentActive] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [zoomLocked, setZoomLocked] = useState(false);
  const [isLimitedZoom, setIsLimitedZoom] = useState(false);
  const currentDistanceRef = useRef(3);
  const initialDistance = 3;
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
    },
  });

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
    <div className="h-screen w-screen relative">
      
      <Leva />
      <Canvas
        gl={{ antialias: true }}
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
        <BoxGeometry
          text={text} // Use the edited text from Leva
          heading={heading}
          buttonText={buttonText}
          headingColor={Heading_Color} // use dynamic values
          buttonColor={Button_Color} // use dynamic values
          textColor={Text_Color} // use dynamic values
          color={Object_Color} // use dynamic values
          position={[0, 0, 0]}
          rotateX={rotateX}
          rotateY={rotateY}
          mobile={mobile}
        />
      </Canvas>
    </div>
  );
};

export default GGG;
