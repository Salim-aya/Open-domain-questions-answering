import React from 'react';
import { Trash2 } from 'lucide-react';
import { Conversation } from '../../types';

interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  darkMode: boolean;
  onSelectConversation: (id: string) => void;
  onDeleteConversation: (id: string) => void;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  currentConversationId,
  darkMode,
  onSelectConversation,
  onDeleteConversation,
}) => {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      onDeleteConversation(id);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-2">
      {conversations.length === 0 ? (
        <div className={`text-center ${darkMode ? 'text-gray-500' : 'text-gray-400'} text-sm py-8`}>
          No conversations yet.
          <br />
          Start a new one!
        </div>
      ) : (
        conversations.map((conv) => (
          <div
            key={conv.id}
            className={`group relative w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors cursor-pointer ${
              currentConversationId === conv.id
                ? darkMode
                  ? 'bg-gray-800 text-white'
                  : 'bg-indigo-50 text-indigo-900'
                : darkMode
                ? 'text-gray-400 hover:bg-gray-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => onSelectConversation(conv.id)}
          >
            <div className="truncate text-sm font-medium pr-8">{conv.title}</div>
            <button
              onClick={(e) => handleDelete(e, conv.id)}
              className={`absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${
                darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-600'
              }`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default ConversationList;