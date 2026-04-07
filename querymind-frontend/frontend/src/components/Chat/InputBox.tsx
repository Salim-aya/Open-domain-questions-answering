import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface InputBoxProps {
  darkMode: boolean;
  onSendMessage: (content: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ darkMode, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`border-t ${darkMode ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} p-4`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask your question..."
            className={`flex-1 ${
              darkMode
                ? 'bg-gray-800 text-white placeholder-gray-400'
                : 'bg-gray-50 text-gray-900 placeholder-gray-500'
            } rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl px-5 py-3 flex items-center justify-center transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className={`text-xs text-center mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
          Press <kbd className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} px-2 py-0.5 rounded`}>Enter</kbd> to send,{' '}
          <kbd className={`${darkMode ? 'bg-gray-800' : 'bg-gray-200'} px-2 py-0.5 rounded`}>Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
};

export default InputBox;