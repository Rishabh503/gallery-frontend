import React, { useState, useEffect } from 'react';
import './App.css';
import MemoryForm from './components/MemoryForm';
import MemoryGallery from './components/MemoryGallery';
import Navbar from './components/Navbar';
import { fetchMemories } from './services/api';

function App() {
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

  const handleMemoryAdded = (newMemory) => {
    setMemories([newMemory, ...memories]);
    setShowForm(false);
  };

  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Memory Gallery</h1>
          <button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
          >
            {showForm ? 'Close Form' : 'Add New Memory'}
          </button>
        </div>

        {showForm && <MemoryForm onMemoryAdded={handleMemoryAdded} />}
        
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
            >
              Retry
            </button>
          </div>
        ) : (
          <MemoryGallery memories={memories} setMemories={setMemories} />
        )}
      </main>
    </div>
  );
}


export default App;