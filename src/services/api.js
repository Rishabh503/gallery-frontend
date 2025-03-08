const API_URL = 'http://localhost:5000/api';

export const fetchMemories = async () => {
  const response = await fetch(`${API_URL}/memories`);
  if (!response.ok) {
    throw new Error('Failed to fetch memories');
  }
  return response.json();
};

export const createMemory = async (formData) => {
  const response = await fetch(`${API_URL}/memories`, {
    method: 'POST',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to create memory');
  }
  
  return response.json();
};

// BACKEND UPDATE AND DELETE ENDPOINTS
// Add these to your server.js file


// FRONTEND API SERVICE
// Update your src/services/api.js with these new functions

export const deleteMemory = async (id) => {
  const response = await fetch(`${API_URL}/memories/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete memory');
  }
  
  return response.json();
};

export const updateMemory = async (id, formData) => {
  const response = await fetch(`${API_URL}/memories/${id}`, {
    method: 'PUT',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to update memory');
  }
  
  return response.json();
};
