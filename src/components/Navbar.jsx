import React from 'react';

function Navbar() {
  return (
    <nav className="bg-pink-600 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">Memory Gallery</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;