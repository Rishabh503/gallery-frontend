import React from 'react'

export const Display = ({specialdays}) => {
    // console.log(specialdays)
    const days=specialdays || [];
    console.log(days)
  return (
    <div className='grid gap-5 items-center content-center grid-cols-5'>
    {
      days.map((day,i)=>(
          <div className='p-3 flex flex-col items-center  bg-green-200 rounded-lg shadow-md'>
              <p className='font-semibold text-lg'>
                {day.title}
              </p>
                   <img className='h-64 w-48 rounded-md contain object-cover' src={day.imageUrl}/>
                   <p>
                {day.description}
              </p>
          </div>

      ))
    }
  </div>
  )
}
