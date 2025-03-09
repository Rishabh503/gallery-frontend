import React, { useState, useEffect } from 'react';

const MemoryGalleryApp = () => {
  // State for memories and groups
  const [memories, setMemories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI state
  const [selectedMemories, setSelectedMemories] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [displayMode, setDisplayMode] = useState('grid');
  const [activeGroup, setActiveGroup] = useState('all');
  
  // Fetch memories when component mounts
  useEffect(() => {
    const fetchMemories = async () => {
      try {
        setLoading(true);
        // Use your existing API endpoint
        const response = await fetch('https://gallery-back-2.onrender.com/api/memories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch memories');
        }
        
        const data = await response.json();
        setMemories(data);
        
        // For demo purposes, we'll simulate groups in frontend
        // In production, you would fetch from a /api/groups endpoint
        setGroups([
          { id: 'favorites', name: 'Favorites', memoryIds: [] },
          { id: 'family', name: 'Family', memoryIds: [] },
          { id: 'travel', name: 'Travel', memoryIds: [] }
        ]);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchMemories();
  }, []);
  
  // Toggle memory selection
  const toggleMemorySelection = (memoryId) => {
    if (selectedMemories.includes(memoryId)) {
      setSelectedMemories(selectedMemories.filter(id => id !== memoryId));
    } else {
      setSelectedMemories([...selectedMemories, memoryId]);
    }
  };
  
  // Create a new group
  const createNewGroup = () => {
    if (newGroupName.trim() === '') return;
    
    const newGroup = {
      id: newGroupName.toLowerCase().replace(/\s+/g, '-'),
      name: newGroupName,
      memoryIds: [...selectedMemories]
    };
    
    setGroups([...groups, newGroup]);
    setNewGroupName('');
    setSelectedMemories([]);
  };
  
  // Add selected memories to a group
  const addToGroup = (groupId) => {
    if (selectedMemories.length === 0) return;
    
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        // Add only memories that aren't already in the group
        const newMemoryIds = [...new Set([...group.memoryIds, ...selectedMemories])];
        return { ...group, memoryIds: newMemoryIds };
      }
      return group;
    }));
    
    setSelectedMemories([]);
  };
  
  // Remove a memory from a group
  const removeFromGroup = (groupId, memoryId) => {
    setGroups(groups.map(group => {
      if (group.id === groupId) {
        return { ...group, memoryIds: group.memoryIds.filter(id => id !== memoryId) };
      }
      return group;
    }));
  };
  
  // Delete a group
  const deleteGroup = (groupId) => {
    setGroups(groups.filter(group => group.id !== groupId));
    if (activeGroup === groupId) {
      setActiveGroup('all');
    }
  };
  
  // Get memories to display based on active group
  const getDisplayMemories = () => {
    if (activeGroup === 'all') {
      return memories;
    } else {
      const group = groups.find(g => g.id === activeGroup);
      if (!group) return [];
      return memories.filter(memory => group.memoryIds.includes(memory._id));
    }
  };
  
  if (loading) {
    return <div className="text-center py-8">Loading memories...</div>;
  }
  
  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }
  
  return (
    <div className="flex flex-col p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Memory Gallery</h1>
      
      {/* Group Navigation Sidebar */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h2 className="text-xl font-semibold mb-3">Groups</h2>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveGroup('all')}
                  className={`w-full text-left px-3 py-2 rounded ${activeGroup === 'all' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                >
                  All Memories
                </button>
              </li>
              {groups.map(group => (
                <li key={group.id} className="flex justify-between items-center">
                  <button 
                    onClick={() => setActiveGroup(group.id)}
                    className={`flex-1 text-left px-3 py-2 rounded ${activeGroup === group.id ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                  >
                    {group.name} ({group.memoryIds.length})
                  </button>
                  <button 
                    onClick={() => deleteGroup(group.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Create New Group UI */}
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium mb-2">Create New Group</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Group name"
                  className="flex-1 px-3 py-2 border rounded"
                />
                <button
                  onClick={createNewGroup}
                  disabled={newGroupName.trim() === ''}
                  className="px-3 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          {/* Add to Existing Group */}
          {selectedMemories.length > 0 && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-medium mb-2">Selected: {selectedMemories.length}</h3>
              <select 
                className="w-full px-3 py-2 border rounded mb-2"
                onChange={(e) => e.target.value && addToGroup(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Add to group...</option>
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
              <button
                onClick={() => setSelectedMemories([])}
                className="w-full px-3 py-2 bg-gray-200 rounded"
              >
                Clear Selection
              </button>
            </div>
          )}
          
          {/* Display Options */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h3 className="font-medium mb-2">Display Mode</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setDisplayMode('grid')}
                className={`flex-1 px-3 py-2 rounded ${displayMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setDisplayMode('masonry')}
                className={`flex-1 px-3 py-2 rounded ${displayMode === 'masonry' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Masonry
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            {activeGroup === 'all' ? 'All Memories' : 
             groups.find(g => g.id === activeGroup)?.name || 'Memories'}
          </h2>
          
          {/* Memories Display */}
          <div className={displayMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'columns-1 sm:columns-2 lg:columns-3 gap-4'
          }>
            {getDisplayMemories().map(memory => (
              <div 
                key={memory._id} 
                className={`
                  relative group border rounded-lg overflow-hidden cursor-pointer
                  ${selectedMemories.includes(memory._id) ? 'ring-2 ring-blue-500' : ''}
                  ${displayMode === 'masonry' ? 'mb-4 break-inside-avoid' : ''}
                `}
                onClick={() => toggleMemorySelection(memory._id)}
              >
                <img 
                  src={memory.imageUrl} 
                  alt={memory.title} 
                  className="w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-semibold">{memory.title}</h3>
                  <p className="text-sm text-gray-200">
                    {new Date(memory.date).toLocaleDateString()}
                  </p>
                </div>
                
                {/* Show remove button if in a specific group view */}
                {activeGroup !== 'all' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromGroup(activeGroup, memory._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
                
                {/* Selection indicator */}
                {selectedMemories.includes(memory._id) && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full">
                    ✓
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {getDisplayMemories().length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg border">
              <p className="text-gray-500">
                {activeGroup === 'all' 
                  ? 'No memories found. Start by adding memories!' 
                  : 'No memories in this group. Select some memories and add them to this group!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryGalleryApp;