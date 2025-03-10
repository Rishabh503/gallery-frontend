import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { fetchMemories } from '../../services/api'

export const Month = () => {

    const monthdId=useParams()

    console.log(monthdId.monthId)
    let month=monthdId.monthId;
    console.log(month)
    // console.log(monthdId)
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

      const filtered=memories.filter((memory)=>(
        console.log(memory.date),
        memory.date.includes(monthdId.monthId

        ))) ||[];
      console.log("lets see",filtered)
  return (

    <section>
        <div className='grid gap-5 items-center content-center grid-cols-1 sm:grid-cols-5'>
         
        {
          filtered.map((day,i)=>(
              <div className='p-3 relative h-auto w-full flex flex-col gap-4 items-start   '>
                  
                       <img className=' rounded-xl className="w-full h-auto object-cover" ' src={day.imageUrl}/>
                     <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                     <p className='font-semibold sm:text-lg text-2xl'>
                    {day.title}
                  </p>
                        <p className="text-md sm:text-xs mt-1 line-clamp-2 opacity-80">
                    {day.description}
                  </p>
                     </div>
              </div>

          ))
        }
      </div>
    </section>
  )
}
