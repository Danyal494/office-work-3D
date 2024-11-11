import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for open/close button

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle button for mobile */}
      <button
        onClick={toggleMenu}
        className="absolute z-40 top-4 left-4 md:hidden text-white text-3xl focus:outline-none"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Navigation menu */}
      <nav
        className={`absolute z-30 flex py-6 px-3 gap-4 flex-col h-screen justify-end  transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:flex-col md:h-screen`}
      >
        <Link className="text-6xl text-white" to="/" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.4, ease: 'easeInOut' } }}
          >
            TaskOne
          </motion.div>
        </Link>
        <Link className="text-6xl text-white" to="/box2" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.5, ease: 'easeInOut' } }}
          >
            TaskTwo
          </motion.div>
        </Link>
        <Link className="text-6xl text-white" to="/box3" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0, transition: { delay: 0.6, ease: 'easeInOut' } }}
          >
            TaskThree
          </motion.div>
        </Link>
      </nav>
    </div>
  );
};

export default Topbar;
