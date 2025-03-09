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

    <section>Month ,{monthdId.monthId} 
        <div className='grid gap-5 items-center content-center grid-cols-1 sm:grid-cols-5'>
        {
          filtered.map((day,i)=>(
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
    </section>
  )
}
