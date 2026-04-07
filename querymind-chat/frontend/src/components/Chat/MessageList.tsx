import React, { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  darkMode: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping, darkMode }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          darkMode={darkMode}
        />
      ))}

      {isTyping && (
        <div className="mb-6 flex justify-start">
          <div className={`max-w-[80%] ${darkMode ? 'bg-gray-800' : 'bg-white border border-gray-200'} rounded-2xl px-5 py-3 shadow-sm`}>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;