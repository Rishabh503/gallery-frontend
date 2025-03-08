import React, { useState } from 'react';
import MemoryDetail from './MemoryDetail';

function MemoryGallery({ memories, setMemories }) {
  const [selectedMemory, setSelectedMemory] = useState(null);
  
  const closeDetail = () => {
    setSelectedMemory(null);
  };
  
  const handleDelete = (deletedId) => {
    setMemories(memories.filter(memory => memory._id !== deletedId));
  };
  
  const handleUpdate = (updatedMemory) => {
    setMemories(memories.map(memory => 
      memory._id === updatedMemory._id ? updatedMemory : memory
    ));
  };
  
  // If there are no memories yet, show a message
  if (memories.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-medium text-gray-600">No memories yet</h2>
        <p className="mt-2 text-gray-500">Add your first memory using the button above!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {memories.map((memory) => (
          <div 
            key={memory._id}
            className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedMemory(memory)}
          >
            <div className="h-48">
              <img 
                src={memory.imageUrl} 
                alt={memory.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{memory.title}</h3>
              <p className="text-gray-600 text-sm">{new Date(memory.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      
      {selectedMemory && (
        <MemoryDetail 
          memory={selectedMemory} 
          onClose={closeDetail} 
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default MemoryGallery;