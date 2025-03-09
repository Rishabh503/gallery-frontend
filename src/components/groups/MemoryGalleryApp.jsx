import React, { useState, useEffect } from 'react';
import { 
  fetchMemories, 
  fetchGroups, 
  createGroup, 
  updateGroup, 
  deleteGroup 
} from '../../services/api.js'; // Adjust path as needed

export const MemoryGalleryApp = () => {
  // Data state
  const [memories, setMemories] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // UI state
  const [selectedMemories, setSelectedMemories] = useState([]);
  const [newGroupName, setNewGroupName] = useState('');
  const [displayMode, setDisplayMode] = useState('grid');
  const [activeGroupId, setActiveGroupId] = useState('all');
  
  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        const [memoriesData, groupsData] = await Promise.all([
          fetchMemories(),
          fetchGroups()
        ]);
        
        setMemories(memoriesData);
        setGroups(groupsData || []);
        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again.');
        setLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Toggle memory selection
  const toggleMemorySelection = (memoryId) => {
    setSelectedMemories(prev => 
      prev.includes(memoryId) 
        ? prev.filter(id => id !== memoryId)
        : [...prev, memoryId]
    );
  };
  
  // Handle creating a new group
  const handleCreateGroup = async () => {
    if (!newGroupName.trim() || selectedMemories.length === 0) return;
    
    try {
      const newGroup = await createGroup({
        name: newGroupName,
        memoryIds: selectedMemories
      });
      
      setGroups([...groups, newGroup]);
      setNewGroupName('');
      setSelectedMemories([]);
    } catch (err) {
      console.error('Error creating group:', err);
      setError('Failed to create group. Please try again.');
    }
  };
  
  // Handle adding memories to an existing group
  const handleAddToGroup = async (groupId) => {
    if (selectedMemories.length === 0) return;
    
    try {
      const group = groups.find(g => g._id === groupId);
      if (!group) return;
      
      // Combine existing and new memory IDs (avoid duplicates)
      const updatedMemoryIds = [...new Set([...group.memoryIds, ...selectedMemories])];
      
      const updatedGroup = await updateGroup(groupId, {
        ...group,
        memoryIds: updatedMemoryIds
      });
      
      // Update groups state
      setGroups(groups.map(g => g._id === groupId ? updatedGroup : g));
      setSelectedMemories([]);
    } catch (err) {
      console.error('Error adding to group:', err);
      setError('Failed to update group. Please try again.');
    }
  };
  
  // Handle removing a memory from a group
  const handleRemoveFromGroup = async (groupId, memoryId) => {
    try {
      const group = groups.find(g => g._id === groupId);
      if (!group) return;
      
      const updatedMemoryIds = group.memoryIds.filter(id => id !== memoryId);
      
      const updatedGroup = await updateGroup(groupId, {
        ...group,
        memoryIds: updatedMemoryIds
      });
      
      // Update groups state
      setGroups(groups.map(g => g._id === groupId ? updatedGroup : g));
    } catch (err) {
      console.error('Error removing from group:', err);
      setError('Failed to update group. Please try again.');
    }
  };
  
  // Handle deleting a group
  const handleDeleteGroup = async (groupId) => {
    try {
      await deleteGroup(groupId);
      setGroups(groups.filter(g => g._id !== groupId));
      
      if (activeGroupId === groupId) {
        setActiveGroupId('all');
      }
    } catch (err) {
      console.error('Error deleting group:', err);
      setError('Failed to delete group. Please try again.');
    }
  };
  
  // Get memories to display based on active group
  const getDisplayMemories = () => {
    if (activeGroupId === 'all') {
      return memories;
    } else {
      const group = groups.find(g => g._id === activeGroupId);
      console.log(group)
      if (!group) return [];
      return memories.filter(memory => group.memoryIds.includes(memory._id));
    }
  };
  
  // Clear any error message
  const clearError = () => setError(null);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Error message if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <span className="block sm:inline">{error}</span>
          <span 
            className="absolute top-0 bottom-0 right-0 px-4 py-3" 
            onClick={clearError}
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="md:w-64 flex-shrink-0">
          {/* Groups navigation */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
            <h2 className="text-lg font-semibold mb-3">Memory Groups</h2>
            
            <ul className="space-y-1">
              <li>
                <button 
                  onClick={() => setActiveGroupId('all')}
                  className={`w-full text-left px-3 py-2 rounded ${
                    activeGroupId === 'all' 
                      ? 'bg-blue-500 text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  All Memories ({memories.length})
                </button>
              </li>
              
              {groups.map(group => (
                <li key={group._id} className="flex items-center">
                  <button 
                    onClick={() => setActiveGroupId(group._id)}
                    className={`flex-1 text-left px-3 py-2 rounded ${
                      activeGroupId === group._id 
                        ? 'bg-blue-500 text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {group.name} ({group.memoryIds.length})
                  </button>
                  <button 
                    onClick={() => handleDeleteGroup(group._id)}
                    className="ml-1 p-1 text-gray-500 hover:text-red-500"
                    title="Delete group"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Create new group */}
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium mb-2">Create New Group</h3>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Group name"
                  className="w-full px-3 py-2 border rounded"
                />
                <button
                  onClick={handleCreateGroup}
                  disabled={!newGroupName.trim() || selectedMemories.length === 0}
                  className="w-full px-3 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Create Group
                </button>
                <p className="text-xs text-gray-500">
                  {selectedMemories.length} memories selected
                </p>
              </div>
            </div>
          </div>
          
          {/* Display options */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
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
          
          {/* Selection controls */}
          {selectedMemories.length > 0 && (
            <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
              <h3 className="font-medium mb-2">{selectedMemories.length} Memories Selected</h3>
              
              {groups.length > 0 && (
                <div className="mb-2">
                  <label className="block text-sm mb-1">Add to existing group:</label>
                  <select 
                    className="w-full px-3 py-2 border rounded"
                    onChange={(e) => {
                      if (e.target.value) {
                        handleAddToGroup(e.target.value);
                        e.target.value = '';
                      }
                    }}
                    defaultValue=""
                  >
                    <option value="" disabled>Select a group...</option>
                    {groups.map(group => (
                      <option key={group._id} value={group._id}>{group.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <button
                onClick={() => setSelectedMemories([])}
                className="w-full px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">
            {activeGroupId === 'all' 
              ? 'All Memories' 
              : groups.find(g => g._id === activeGroupId)?.name || 'Memories'}
          </h2>
          
          {/* Memories grid */}
          <div className={
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
                onClick={() => toggleMemorySelection(memory._id)}
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
                
                {/* Selection indicator */}
                {selectedMemories.includes(memory._id) && (
                  <div className="absolute top-2 left-2 bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md"
                  >
                    ✓
                  </div>
                )}
                
                {/* Remove from group button - only show when viewing a specific group */}
                {activeGroupId !== 'all' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFromGroup(activeGroupId, memory._id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove from group"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          
          {/* Empty state */}
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
    </div>
  );
};

// export default MemoryGroups;