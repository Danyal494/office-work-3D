import React from "react";
import { quantum } from "ldrs";
import { TiVendorApple } from "react-icons/ti";

// Register the zoomies component once
quantum.register()
// grid.register()

const Loader = () => {
  return (
    <div className=" h-screen flex justify-center items-center ">
<l-quantum
  size="90"
  speed="1.75" 
  color="white" 
></l-quantum>

        
      </div>
  );
};

export default Loader;
