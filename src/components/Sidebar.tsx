import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CalendarIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  StarIcon,
  TagIcon,
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { name: 'Tasks', path: '/dashboard/tasks', icon: ClipboardDocumentListIcon },
    { name: 'Projects', path: '/dashboard/projects', icon: FolderIcon },
    { name: 'Calendar', path: '/dashboard/calendar', icon: CalendarIcon },
    { name: 'Time Tracking', path: '/dashboard/time-tracking', icon: ClockIcon },
    { name: 'Tags', path: '/dashboard/tags', icon: TagIcon },
    { name: 'Team', path: '/dashboard/team', icon: UserGroupIcon },
    { name: 'Analytics', path: '/dashboard/analytics', icon: ChartBarIcon },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white">TaskMaster</h1>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive(item.path)
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="space-y-1">
          <button
            onClick={() => {}}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md w-full"
          >
            <Cog6ToothIcon className="mr-3 h-5 w-5" />
            Settings
          </button>
          <button
            onClick={onLogout}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white rounded-md w-full"
          >
            <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 