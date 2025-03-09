import React, { useState } from 'react';
import { createMemory } from '../services/api';

function MemoryForm({ onMemoryAdded }) {
  const [memory, setMemory] = useState({
    title: '',
    date: '',
    description: '',
    special:''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMemory({ ...memory, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!memory.title || !memory.date || !memory.description || !image || !memory.special) {
      setError('Please fill in all fields and select an image');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('title', memory.title);
      formData.append('date', memory.date);
      formData.append('description', memory.description);
      formData.append('special', memory.special);
      formData.append('image', image);
      
      const newMemory = await createMemory(formData);
      onMemoryAdded(newMemory);
      
      // Reset form
      setMemory({ title: '', date: '', description: '',special:'' });
      setImage(null);
      setPreview('');
    } catch (err) {
      setError('Failed to save memory. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Add New Memory</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={memory.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a title for your memory"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={memory.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Special?</label>
          <input
            type="boolean"
            name="special"
            value={memory.special}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={memory.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Describe this memory..."
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          
          {preview && (
            <div className="mt-2">
              <img 
                src={preview} 
                alt="Preview" 
                className="h-40 object-cover rounded-md" 
              />
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Memory'}
        </button>
      </form>
    </div>
  );
}

export default MemoryForm;