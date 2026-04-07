import React from 'react';
import { MessageSquare, Plus } from 'lucide-react';
import ConversationList from './ConversationList';
import UserProfile from './UserProfile';
import { Conversation, User } from '../../types';

interface SidebarProps {
  user: User;
  conversations: Conversation[];
  currentConversationId: string | null;
  darkMode: boolean;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  user,
  conversations,
  currentConversationId,
  darkMode,
  onNewConversation,
  onSelectConversation,
  onDeleteConversation,
  onToggleDarkMode,
  onLogout,
}) => {
  return (
    <div className={`w-64 ${darkMode ? 'bg-gray-950' : 'bg-white'} border-r ${darkMode ? 'border-gray-800' : 'border-gray-200'} flex flex-col`}>
      {/* Header */}
      <div className={`p-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              QueryMind
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Intelligent Q&A
            </p>
          </div>
        </div>
        <button
          onClick={onNewConversation}
          className={`w-full ${
            darkMode ? 'bg-gray-900 hover:bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
          } rounded-lg px-4 py-3 flex items-center gap-2 font-medium transition-colors`}
        >
          <Plus className="w-5 h-5" />
          New Conversation
        </button>
      </div>

      {/* Conversation List */}
      <ConversationList
        conversations={conversations}
        currentConversationId={currentConversationId}
        darkMode={darkMode}
        onSelectConversation={onSelectConversation}
        onDeleteConversation={onDeleteConversation}
      />

      {/* User Profile */}
      <UserProfile
        user={user}
        darkMode={darkMode}
        onToggleDarkMode={onToggleDarkMode}
        onLogout={onLogout}
      />
    </div>
  );
};

export default Sidebar;