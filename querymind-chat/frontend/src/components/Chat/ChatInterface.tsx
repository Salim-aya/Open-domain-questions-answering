import React from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';
import WelcomeHeader from '../Header/WelcomeHeader';
import { Message } from '../../types';

interface ChatInterfaceProps {
  messages: Message[];
  isTyping: boolean;
  userName: string;
  darkMode: boolean;
  onSendMessage: (content: string) => void;
  onSuggestionClick: (question: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  isTyping,
  userName,
  darkMode,
  onSendMessage,
  onSuggestionClick,
}) => {
  const hasMessages = messages.length > 0;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          <WelcomeHeader
            userName={userName}
            darkMode={darkMode}
            onSuggestionClick={onSuggestionClick}
          />
        ) : (
          <MessageList
            messages={messages}
            isTyping={isTyping}
            darkMode={darkMode}
          />
        )}
      </div>

      <InputBox
        darkMode={darkMode}
        onSendMessage={onSendMessage}
      />
    </div>
  );
};

export default ChatInterface;