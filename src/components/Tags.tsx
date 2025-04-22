import React, { useState } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Tag {
  id: string;
  name: string;
  color: string;
  taskCount: number;
}

const Tags: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: 'Work', color: 'bg-blue-600', taskCount: 5 },
    { id: '2', name: 'Personal', color: 'bg-green-600', taskCount: 3 },
    { id: '3', name: 'Urgent', color: 'bg-red-600', taskCount: 2 },
  ]);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('bg-blue-600');

  const colors = [
    'bg-blue-600',
    'bg-green-600',
    'bg-red-600',
    'bg-yellow-600',
    'bg-purple-600',
    'bg-pink-600',
  ];

  const handleAddTag = () => {
    if (!newTagName.trim()) return;

    const newTag: Tag = {
      id: Date.now().toString(),
      name: newTagName,
      color: newTagColor,
      taskCount: 0,
    };

    setTags([...tags, newTag]);
    setNewTagName('');
  };

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Tags</h2>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            placeholder="Enter tag name"
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={newTagColor}
            onChange={(e) => setNewTagColor(e.target.value)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color.replace('bg-', '').replace('-600', '')}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddTag}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${tag.color}`} />
              <div>
                <div className="text-white font-medium">{tag.name}</div>
                <div className="text-sm text-gray-400">
                  {tag.taskCount} tasks
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDeleteTag(tag.id)}
              className="p-1 text-gray-400 hover:text-red-400"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags; 