import React, { useEffect, useState } from 'react'
import { fetchMemories } from '../../services/api';
import { useSearchParams } from 'react-router';
import { Display } from '../my/Display';

export const Special = () => {

  // const memories=await fetchMemories();
  // console.log(memories)
  const [memories, setMemories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMemories = async () => {
      try {
        setLoading(true);
        const data = await fetchMemories();
        setMemories(data);
        setError(null);
      } catch (err) {
        setError('Failed to load memories. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMemories();
  }, []);

  console.log(memories)
  const specialdays=memories.filter((memory)=>(memory.special.toLowerCase().includes("true"))) || []
  console.log("shsd",specialdays)
  return (
    <div>Special
      <div className='grid gap-5 items-center content-center grid-cols-1 sm:grid-cols-5'>
        {
          specialdays.map((day,i)=>(
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
      {/* <div>
        <Display value={specialdays}/>
      </div> */}
    </div>
  )
}
