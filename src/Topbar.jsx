import React from 'react';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion"

const Topbar = () => {
  return (
 <nav className='absolute z-30 flex py-6 px-3  gap-4 flex-col h-screen justify-end'>
<Link className='text-6xl text-white' to="/"><motion.div initial={{opacity:0 , x:-100}} animate={{opacity:1,x:0 ,transition:{delay:0.4,ease:'easeInOut'}}} >TaskOne</motion.div>  </Link>
<Link className='text-6xl text-white' to="/box2"> <motion.div initial={{opacity:0 , x:-100}} animate={{opacity:1,x:0 ,transition:{delay:0.5,ease:'easeInOut'}}} >TaskTwo</motion.div>  </Link>
<Link className='text-6xl text-white' to="/box3"><motion.div initial={{opacity:0 , x:-100}} animate={{opacity:1,x:0 ,transition:{delay:0.6,ease:'easeInOut'}}} >TaskThree</motion.div>  </Link>

 </nav>
  );
};

export default Topbar;
