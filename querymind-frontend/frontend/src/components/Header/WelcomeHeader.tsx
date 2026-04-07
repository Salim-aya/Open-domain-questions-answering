import React from 'react';
import { Sparkles, Lightbulb, Code, Globe } from 'lucide-react';

interface WelcomeHeaderProps {
  userName: string;
  darkMode: boolean;
  onSuggestionClick: (question: string) => void;
}

const suggestedQuestions = [
  {
    icon: Lightbulb,
    text: 'Explain quantum computing in simple terms',
    color: 'text-yellow-500',
  },
  {
    icon: Code,
    text: 'What are the main differences between Python and JavaScript?',
    color: 'text-green-500',
  },
  {
    icon: Globe,
    text: 'Tell me about climate change and its effects',
    color: 'text-blue-500',
  },
];

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({
  userName,
  darkMode,
  onSuggestionClick,
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center px-4">
      <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center mb-6">
        <Sparkles className="w-10 h-10 text-indigo-600" />
      </div>
      <h2 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        Hello, {userName}! 👋
      </h2>
      <p className={`text-center mb-12 max-w-2xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        I'm your intelligent Q&A assistant. Ask me anything and I'll do my best to help you find
        accurate answers.
      </p>
      <div className="space-y-3 w-full max-w-2xl">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => onSuggestionClick(q.text)}
            className={`w-full ${
              darkMode
                ? 'bg-gray-800 hover:bg-gray-750 text-gray-200'
                : 'bg-white hover:bg-gray-50 text-gray-800'
            } rounded-xl p-4 flex items-center gap-3 text-left transition-all shadow-sm hover:shadow-md border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            <q.icon className={`w-5 h-5 ${q.color}`} />
            <span className="font-medium">{q.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WelcomeHeader;