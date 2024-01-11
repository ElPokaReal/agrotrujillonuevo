import React from 'react';
import ThemeSwitch from './ThemeSwitch';
import Sidebar from './Sidebar';

function Navbar() {

  return (
    <header className="w-full bg-gray-100 dark:bg-slate-800 py-4 flex justify-end items-center p-9 text-white dark:text-[#0f0f0f]">
        <ThemeSwitch/>
    </header>
  );
}

export default Navbar;