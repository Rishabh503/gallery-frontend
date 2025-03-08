import React from 'react'

export const Hero = () => {
  return (
    <section className='min-h-screen min-w-full bg-purple-100 '>
        <div className='w-full flex items-center justify-center '>
            {/* <div className=' w-[200vh] h-[80vh] mx-48 relative flex bg-red-200 items-center justify-center rounded-lg pt-10 '>
                <img src="image.png" alt="" className='h-full w-full object-cover'
                 />
            </div> */}
            <div className="w-full max-w-3xl aspect-[16/12] overflow-hidden">
      <img
        src="image.png"
        alt="Example"
        className="w-full h-full object-cover"
      />
    </div>
         </div>   
    </section>
  )
}
