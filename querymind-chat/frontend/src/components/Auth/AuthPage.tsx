import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

interface AuthPageProps {
  darkMode: boolean;
  onLogin: (email: string, password: string) => Promise<void>;
  onSignUp: (email: string, password: string, name: string) => Promise<void>;
  onGoogleAuth: () => Promise<void>;
}

const AuthPage: React.FC<AuthPageProps> = ({ darkMode, onLogin, onSignUp, onGoogleAuth }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} px-4`}>
      <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-4">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>QueryMind</h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2`}>
            Your intelligent question-answering companion
          </p>
        </div>

        <div className="flex mb-6">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 font-medium transition-colors ${
              !isSignUp 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 font-medium transition-colors ${
              isSignUp 
                ? 'border-b-2 border-indigo-600 text-indigo-600' 
                : darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {isSignUp ? (
          <SignUpForm 
            darkMode={darkMode} 
            onSubmit={onSignUp}
            onGoogleAuth={onGoogleAuth}
          />
        ) : (
          <LoginForm 
            darkMode={darkMode} 
            onSubmit={onLogin}
            onGoogleAuth={onGoogleAuth}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;