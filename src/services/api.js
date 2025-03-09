const API_URL = 'http://localhost:5000/api';

export const fetchMemories = async () => {
  const response = await fetch(`https://gallery-back-2.onrender.com/api/memories`);
  if (!response.ok) {
    throw new Error('Failed to fetch memories');
  }
  return response.json();
};

export const createMemory = async (formData) => {
  const response = await fetch(`https://gallery-back-2.onrender.com/api/memories`, {
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
  const response = await fetch(`https://gallery-back-2.onrender.com/api/memories/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete memory');
  }
  
  return response.json();
};

export const updateMemory = async (id, formData) => {
  const response = await fetch(`https://gallery-back-2.onrender.com/api/memories/${id}`, {
    method: 'PUT',
    body: formData,
  });
  
  if (!response.ok) {
    throw new Error('Failed to update memory');
  }
  
  return response.json();
};

// Group-related API methods

export const fetchGroups = async () => {
  const response = await fetch(`https://gallery-back-2.onrender.com/api/groups`);
  if (!response.ok) {
    throw new Error('Failed to fetch groups');
  }
  return response.json();
};

export const createGroup = async (groupData) => {
  const response = await fetch(`https://gallery-back-2.onrender.com/api/groups`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create group');
  }
  
  return response.json();
};

export const updateGroup = async (id, groupData) => {
  const response = await fetch(`https://gallery-back-2.onrender.com/api/groups/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(groupData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update group');
  }
  
  return response.json();
};

export const deleteGroup = async (id) => {
  const response = await fetch(`https://gallery-back-2.onrender.com/api/groups/${id}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete group');
  }
  
  return response.json();
};

// Additional memory methods for group functionality

export const addMemoriesToGroup = async (groupId, memoryIds) => {
  const group = await fetchGroupById(groupId);
  const updatedMemoryIds = [...new Set([...group.memoryIds, ...memoryIds])];
  
  return updateGroup(groupId, {
    ...group,
    memoryIds: updatedMemoryIds
  });
};

export const removeMemoryFromGroup = async (groupId, memoryId) => {
  const group = await fetchGroupById(groupId);
  const updatedMemoryIds = group.memoryIds.filter(id => id !== memoryId);
  
  return updateGroup(groupId, {
    ...group,
    memoryIds: updatedMemoryIds
  });
};

export const fetchGroupById = async (id) => {
  const response = await fetch(`https://gallery-back-2.onrender.com/api/groups/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch group');
  }
  return response.json();
};