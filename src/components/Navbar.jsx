import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { IoCloseSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";


function Navbar() {
  const [open,setOpen]=useState(false)
  const handleOpen=()=>{
    // console.log("clic")
    setOpen(!open);
  }
  return (
    <section className=" min-w-full bg-pink-600 w-full ">
      
      <div className="  text-white p-4 w-full min-h-20 h-auto container  flex justify-between items-center">
        <div className="flex justify-between px-10 w-full items-center space-x-2">
         <div>
            <span className='text-2xl font-semibold'>
     {open?"Memories":''}
            </span>
         </div>
         <div className=''>
        <button onClick={()=>handleOpen()}>
          <FaHeart  className='text-xl font-semibold'/>
        </button>
        <br />
        {/* {open?"set hi":"say bye"} */}
      </div>
            <div className={`sm:flex-row ${open?"hidden":"block"} flex-col flex sm:flex-wrap gap-4 text-center `}>
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