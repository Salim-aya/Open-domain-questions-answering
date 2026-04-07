import React from 'react';
import { Sun, Moon, LogOut } from 'lucide-react';
import { User } from '../../types';

interface UserProfileProps {
  user: User;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  darkMode,
  onToggleDarkMode,
  onLogout,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={`p-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="flex items-center gap-3 mb-3">
        {user.avatar_url ? (
          <img
            src={user.avatar_url}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {getInitials(user.name)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {user.name}
          </div>
          <div className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {user.email}
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onToggleDarkMode}
          className={`flex-1 ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
          } rounded-lg px-3 py-2 flex items-center justify-center gap-2 text-sm hover:opacity-80 transition-opacity`}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          onClick={onLogout}
          className={`flex-1 ${
            darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
          } rounded-lg px-3 py-2 flex items-center justify-center gap-2 text-sm hover:opacity-80 transition-opacity`}
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserProfile;