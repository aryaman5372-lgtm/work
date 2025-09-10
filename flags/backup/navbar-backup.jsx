
import React from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { useDarkMode } from './DarkModeContext';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <nav className="navbar">
        <div className="nav">
     <h1>Where in the world?</h1>
     <button className="dark-mode-btn" onClick={toggleDarkMode}>
       <DarkModeSwitch
         checked={isDarkMode}
         onChange={toggleDarkMode}
         size={20}
         moonColor="#ffffff"
         sunColor="#ffffff"
       />
       Dark Mode
     </button> 
  
        </div>
   </nav>
  );
};

export default Navbar;
