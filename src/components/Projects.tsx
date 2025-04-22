import React, { useState } from 'react';
import { PlusIcon, FolderIcon, TrashIcon, PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface Project {
  id: string;
  name: string;
  description: string;
  tasks: number;
  completedTasks: number;
  dueDate: Date;
  status: 'active' | 'completed' | 'on-hold';
  members: string[];
  createdAt: Date;
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Complete overhaul of the company website with modern design and improved UX',
      tasks: 12,
      completedTasks: 5,
      dueDate: new Date('2024-06-30'),
      status: 'active',
      members: ['Sarah Chen', 'Michael Rodriguez'],
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      name: 'Mobile App Development',
      description: 'Development of a new mobile application for iOS and Android platforms',
      tasks: 20,
      completedTasks: 8,
      dueDate: new Date('2024-08-15'),
      status: 'active',
      members: ['Emma Wilson', 'David Kim'],
      createdAt: new Date('2024-02-01'),
    },
    {
      id: '3',
      name: 'Data Migration',
      description: 'Migration of legacy data to new cloud infrastructure',
      tasks: 8,
      completedTasks: 8,
      dueDate: new Date('2024-03-15'),
      status: 'completed',
      members: ['Sophia Patel'],
      createdAt: new Date('2024-01-01'),
    },
  ]);

  const [showAddProject, setShowAddProject] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<{
    name: string;
    description: string;
    dueDate: Date;
    status: 'active' | 'completed' | 'on-hold';
    members: string[];
  }>({
    name: '',
    description: '',
    dueDate: new Date(),
    status: 'active',
    members: [],
  });

  const handleAddProject = () => {
    if (!newProject.name) return;

    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      tasks: 0,
      completedTasks: 0,
      createdAt: new Date(),
    };

    setProjects([...projects, project]);
    setNewProject({
      name: '',
      description: '',
      dueDate: new Date(),
      status: 'active',
      members: [],
    });
    setShowAddProject(false);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setNewProject({
      name: project.name,
      description: project.description,
      dueDate: project.dueDate,
      status: project.status,
      members: project.members,
    });
    setShowAddProject(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'completed':
        return 'bg-blue-500';
      case 'on-hold':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <FolderIcon className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold">Projects</h1>
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setNewProject({
                name: '',
                description: '',
                dueDate: new Date(),
                status: 'active',
                members: [],
              });
              setShowAddProject(true);
            }}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{project.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-2 text-gray-400 hover:text-white"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{project.completedTasks}/{project.tasks} tasks</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{
                        width: `${(project.completedTasks / project.tasks) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className="text-sm text-gray-400">
                    Due: {project.dueDate.toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.members.map((member, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 rounded-full text-sm"
                      >
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Project Modal */}
        {showAddProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button
                  onClick={() => setShowAddProject(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <input
                  type="date"
                  value={newProject.dueDate.toISOString().split('T')[0]}
                  onChange={(e) => setNewProject({ ...newProject, dueDate: new Date(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={newProject.status}
                  onChange={(e) => setNewProject({ ...newProject, status: e.target.value as Project['status'] })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="on-hold">On Hold</option>
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddProject(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProject}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingProject ? 'Save Changes' : 'Add Project'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects; 