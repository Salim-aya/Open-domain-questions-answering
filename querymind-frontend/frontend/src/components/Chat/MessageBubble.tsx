import React from 'react';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  darkMode: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, darkMode }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`mb-6 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] ${
          isUser
            ? 'bg-indigo-600 text-white'
            : darkMode
            ? 'bg-gray-800 text-gray-100'
            : 'bg-white text-gray-900 border border-gray-200'
        } rounded-2xl px-5 py-3 shadow-sm`}
      >
        <div className="whitespace-pre-wrap break-words">{message.content}</div>
        <div
          className={`text-xs mt-2 ${
            isUser ? 'text-indigo-200' : darkMode ? 'text-gray-500' : 'text-gray-500'
          }`}
        >
          {new Date(message.created_at).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;