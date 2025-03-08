import React, { useState } from 'react';
import { deleteMemory } from '../services/api';
import EditMemoryForm from './EditMemoryForm';

function MemoryDetail({ memory, onClose, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (isDeleting) {
      try {
        setError('');
        await deleteMemory(memory._id);
        onDelete(memory._id);
        onClose();
      } catch (err) {
        setError('Failed to delete memory. Please try again.');
        console.error(err);
        setIsDeleting(false);
      }
    } else {
      setIsDeleting(true);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  const handleUpdate = (updatedMemory) => {
    onUpdate(updatedMemory);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-auto">
          <EditMemoryForm 
            memory={memory} 
            onUpdate={handleUpdate} 
            onCancel={() => setIsEditing(false)} 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-screen overflow-auto">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-70"
            aria-label="Close"
          >
            ×
          </button>
          <img 
            src={memory.imageUrl} 
            alt={memory.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
        </div>
        
        <div className="p-6">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <h2 className="text-2xl font-bold mb-2">{memory.title}</h2>
          <p className="text-gray-600 mb-4">{new Date(memory.date).toLocaleDateString()}</p>
          <p className="text-gray-800">{memory.description}</p>
          <p className="text-gray-500 text-sm mt-4">Added on {new Date(memory.createdAt).toLocaleString()}</p>
          
          <div className="mt-6 flex space-x-3">
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            
            {isDeleting ? (
              <div className="flex space-x-2">
                <button 
                  onClick={handleDelete}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Confirm Delete
                </button>
                <button 
                  onClick={handleCancelDelete}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button 
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryDetail;