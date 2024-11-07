import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <div className='flex justify-between  absolute z-50 top-4  left-1/3 max-sm:left-1.5'>
    
      <nav>
        <button  className="relative overflow-hidden rounded-lg space-x-3 max-sm:rounded-none mx-3  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
          <span  className="relative flex items-center text-white font-bold
     max-sm:font-light max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">

          <Link to="/">one</Link>
          </span>
        </button>
        {/* <button  className="relative overflow-hidden rounded-lg max-sm:rounded-none  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
          <span  className="relative flex items-center text-white font-bold
     max-sm:font-light max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">

          <Link to="/box2">Two</Link>
          </span>
        </button> */}
        <button  className="relative overflow-hidden rounded-lg max-sm:rounded-none  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 mx-3 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
          <span  className="relative flex items-center text-white font-bold
     max-sm:font-light max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">

          <Link to="/box3">Three</Link>
          </span>
        </button>
        <button  className="relative overflow-hidden rounded-lg max-sm:rounded-none  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 mx-3 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
          <span  className="relative flex items-center text-white font-bold
     max-sm:font-light max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">

          <Link to="/box4">Four</Link>
          </span>
        </button>
        <button  className="relative overflow-hidden rounded-lg max-sm:rounded-none  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 mx-3 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
          <span  className="relative flex items-center text-white font-bold
     max-sm:font-light max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">

          <Link to="/box5">Five</Link>
          </span>
        </button>
        <button  className="relative overflow-hidden rounded-lg max-sm:rounded-none  h-12 max-sm:h-5 group hover:shadow-lg hover:scale-105 mx-3 transition duration-500 before:absolute  before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400">
          <span  className="relative flex items-center text-white font-bold
     max-sm:font-light max-sm:text-sm px-4 max-sm:px-1 py-2 max-sm:py-0">

          <Link to="/box6">Six</Link>
          </span>
        </button>
      </nav>
    </div>
  );
};

export default Topbar;
