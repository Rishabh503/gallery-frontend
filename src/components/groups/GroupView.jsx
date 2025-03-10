import React, { useEffect, useState } from 'react'
import { fetchGroups, fetchMemories } from '../../services/api'

export const GroupView = () => {

    const [groups, setGroups] = useState([])
    const [loading , setLoading ] = useState(true)
    const [memories,setMemories]=useState('')
    const [activeGroupId,setActiveGroupId]=useState('')
     const [selectedMemories, setSelectedMemories] = useState([]);

  const [displayMode, setDisplayMode] = useState('grid');

    useEffect(()=>{
        const getGroups =async()=>{
            try {
                const data=await fetchGroups();
                setGroups(data);
                setLoading(true)
            } catch (error) {
                console.log("eerroreee",error)
            }
        }
        const getMemories=async()=>{
            try {
                const data =await fetchMemories()
                setMemories(data)
            } catch (error) {
                console.log("eerroreee",error)
            }
        }
        getGroups();getMemories()
    },[])

    const getDisplayMemories = () => {
        if (activeGroupId === 'all') {
          return memories;
        } else {
          const group = groups.find(g => g._id == activeGroupId);
          console.log("getting gr",group)
          if (!group) return [];
          return memories.filter(memory => group.memoryIds.includes(memory._id));
        }
      };
    console.log(groups);
    console.log(memories);
  return (
    <section className='sm:flex-row flex-col justify-between'>
        <div className='sm:pl-20 sm:pr-10 sm:pt-12 sm:mb-20 p-4'>
            <div className='border  rounded-md'>
                <button onClick={()=>(setActiveGroupId("all"))}  className='font-semibold text-xl pl-4 pb-2'>Memoriesss</button>
                {groups.length>0?
                groups.map((group)=>(
                    <div className='pl-4 py-1 font-semibold text-start text-xl shadow-md'>
                    <button onClick={()=>setActiveGroupId(group._id)} className=' rounded-md'>
                    <p className=''>{group.name}</p>
                        </button> 
                        {/* {activeGroupId} */}
                    </div>
                ))
                :"ha"
                    
                }
            </div>

                <div className="bg-white mt-10 rounded-lg shadow-sm border p-4 mb-4">
                    <h3 className="font-medium mb-2">Display Options</h3>
                    <div className="flex gap-2">
                    <button
                        onClick={() => setDisplayMode('grid')}
                        className={`flex-1 px-3 py-2 rounded ${displayMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        Grid
                    </button>
                    <button
                        onClick={() => setDisplayMode('masonry')}
                        className={`flex-1 px-3 py-2 rounded ${displayMode === 'masonry' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        Masonry
                    </button>
                    </div>
                </div>
          </div>

        <div className="flex-1 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            {activeGroupId === 'all' 
              ? 'All Memories' 
              : groups.find(g => g._id === activeGroupId)?.name || 'Memories'}
          </h2>
          
          {/* Memories grid */}
          <div  className={
            displayMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              : 'columns-1 sm:columns-2 lg:columns-3 gap-4' 
          }>
            {getDisplayMemories().map(memory => (
              <div 
                key={memory._id} 
                className={`
                  relative group mb-4 overflow-hidden rounded-lg shadow-sm border 
                  ${selectedMemories.includes(memory._id) ? 'ring-2 ring-blue-500' : ''}
                  ${displayMode === 'masonry' ? 'break-inside-avoid' : ''}
                `}
               //
              >
                <img 
                  src={memory.imageUrl} 
                  alt={memory.title} 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                  <h3 className="font-semibold text-lg">{memory.title}</h3>
                  <p className="text-sm opacity-90">
                    {new Date(memory.date).toLocaleDateString()}
                  </p>
                  {memory.description && (
                    <p className="text-sm mt-1 line-clamp-2 opacity-80">
                      {memory.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {getDisplayMemories().length === 0 && (
            <div className="bg-gray-50 rounded-lg border p-8 text-center">
              <p className="text-gray-500">
                {activeGroupId === 'all' 
                  ? 'No memories found. Start by adding some memories!'
                  : 'No memories in this group. Select some memories and add them to this group!'}
              </p>
            </div>
          )}
            </div>
          </div>
    </section>
  )
}
