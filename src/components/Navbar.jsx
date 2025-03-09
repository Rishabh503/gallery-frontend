import React from 'react';
import { NavLink } from 'react-router';

function Navbar() {
  return (
    <section className=" min-w-full bg-pink-600 w-full ">
      <div className="  text-white p-4 w-full h-20 container  flex justify-between items-center">
        <div className="flex justify-between px-10 w-full items-center space-x-2">
         <div>
            <span className='text-2xl font-semibold'>
            Memories
            </span>
         </div>
            <div className='flex flex-wrap gap-4'>
              <NavLink to='/my'>
                  View
              </NavLink>
              <NavLink to='/groupBackend'>
                  groupb
              </NavLink>
              <NavLink to='/group'>
                  group
              </NavLink>
              <NavLink to='/speical'>
                  Speical
              </NavLink>
              <NavLink to='/months'>
                  Months
              </NavLink>
              <NavLink to='/editByRishabh'>
                  Add
              </NavLink>
            </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;