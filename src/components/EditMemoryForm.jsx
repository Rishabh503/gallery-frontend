import React, { useState } from 'react';
import { updateMemory } from '../services/api';

function EditMemoryForm({ memory, onUpdate, onCancel }) {
  const [formData, setFormData] = useState({
    title: memory.title,
    date: memory.date.substring(0, 10), // Format date as YYYY-MM-DD
    description: memory.description,
    special:memory.special
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    
    if (!formData.title || !formData.date || !formData.description || !formData.special) {
      setError('Title, date, and description are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const data = new FormData();
      data.append('title', formData.title);
      data.append('date', formData.date);
      data.append('description', formData.description);
      data.append('speical', formData.special);
      
      if (image) {
        data.append('image', image);
      }
      
      const updatedMemory = await updateMemory(memory._id, data);
      onUpdate(updatedMemory);
    } catch (err) {
      setError('Failed to update memory. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Edit Memory</h2>
        <button 
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a title for your memory"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Special?</label>
          <input
            type="text"
            name="special"
            value={formData.special}
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
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
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
          
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-2">Current image:</p>
            <img 
              src={memory.imageUrl} 
              alt={memory.title}
              className="h-40 object-cover rounded-md" 
            />
          </div>
          
          {preview && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-2">New image preview:</p>
              <img 
                src={preview} 
                alt="Preview" 
                className="h-40 object-cover rounded-md" 
              />
            </div>
          )}
        </div>
        
        <div className="flex space-x-3">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          
          <button 
            type="button"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditMemoryForm;