import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useConversations } from './hooks/useConversations';
import AuthPage from './components/Auth/AuthPage';
import Sidebar from './components/Sidebar/Sidebar';
import ChatInterface from './components/Chat/ChatInterface';
import { updateUserProfile } from './services/api';
import { Mail, CheckCircle, ArrowLeft, AlertCircle, MessageSquare } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeName, setWelcomeName] = useState('');
  const [showEmailConfirmation, setShowEmailConfirmation] = useState(false);

  const {
    user,
    loading: authLoading,
    signUp,
    signIn,
    signInGoogle,
    signOut,
    updateUser,
    isAuthenticated,
    needsEmailConfirmation,
    confirmationEmail,
  } = useAuth();

  const {
    conversations,
    currentConversationId,
    messages,
    loading: conversationsLoading,
    isTyping,
    setCurrentConversationId,
    createNew,
    deleteConv,
    sendMessage,
  } = useConversations(user?.id);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (user && !user.name) {
      setTimeout(() => setShowWelcome(true), 500);
    }
  }, [user]);

  // IMPORTANT: Surveiller needsEmailConfirmation
  useEffect(() => {
    if (needsEmailConfirmation && confirmationEmail) {
      console.log('📧 Showing email confirmation page for:', confirmationEmail);
      setShowEmailConfirmation(true);
    }
  }, [needsEmailConfirmation, confirmationEmail]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await signIn({ email, password });
    } catch (err: any) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const handleSignUp = async (email: string, password: string, name: string) => {
    try {
      const result = await signUp({ email, password, name });
      
      console.log('📝 SignUp result in App:', result);
      
      if (result?.needsConfirmation) {
        console.log('📧 Need confirmation, showing page');
        setShowEmailConfirmation(true);
      }
    } catch (err: any) {
      console.error('SignUp error in App:', err);
      throw err;
    }
  };

  const handleGoogleAuth = async () => {
    await signInGoogle();
  };

  const handleWelcomeContinue = async (name: string) => {
    if (user) {
      try {
        await updateUserProfile(user.id, { name });
        updateUser({ name });
        setShowWelcome(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const handleSkipWelcome = () => {
    setShowWelcome(false);
  };

  const handleNewConversation = async () => {
    await createNew();
  };

  const handleSendMessage = async (content: string) => {
    if (!currentConversationId) {
      await createNew();
      setTimeout(() => sendMessage(content), 100);
    } else {
      await sendMessage(content);
    }
  };

  const handleSuggestionClick = async (question: string) => {
    if (!currentConversationId) {
      await createNew();
      setTimeout(() => sendMessage(question), 100);
    } else {
      await sendMessage(question);
    }
  };

  const handleLogout = async () => {
    await signOut();
    setShowEmailConfirmation(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  console.log('🔍 App state - Loading:', authLoading, 'Authenticated:', isAuthenticated, 'ShowConfirmation:', showEmailConfirmation);

  // Loading state
  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Vérification...
          </p>
        </div>
      </div>
    );
  }

  // Email confirmation page - PRIORITÉ ABSOLUE
  if (showEmailConfirmation && confirmationEmail) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} px-4`}>
        <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6 relative shadow-lg">
              <Mail className="w-12 h-12 text-white" />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-center mb-3`}>
              Vérifiez votre email
            </h1>
            
            <div className={`${darkMode ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'} border-2 rounded-xl p-4 mb-4`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} text-center mb-2`}>
                Un email de confirmation a été envoyé à :
              </p>
              <p className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'} font-bold text-center text-lg`}>
                {confirmationEmail}
              </p>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-yellow-900/20 border-yellow-700/50' : 'bg-yellow-50 border-yellow-200'} border rounded-xl p-4 mb-6`}>
            <div className="flex items-start gap-3">
              <AlertCircle className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'} flex-shrink-0 mt-0.5`} />
              <div>
                <p className={`text-sm font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-800'} mb-2`}>
                  Action requise
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Cliquez sur le lien dans l'email pour activer votre compte.
                </p>
              </div>
            </div>
          </div>

          <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-xl p-4 mb-6`}>
            <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
              📋 Instructions :
            </p>
            <ul className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} space-y-2`}>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">1.</span>
                <span>Ouvrez votre boîte email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">2.</span>
                <span>Cherchez l'email de confirmation (vérifiez les spams)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">3.</span>
                <span>Cliquez sur le lien de confirmation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">4.</span>
                <span>Revenez ici pour vous connecter</span>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setShowEmailConfirmation(false)}
            className={`w-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} font-semibold rounded-xl py-3 transition-colors flex items-center justify-center gap-2 shadow-md`}
          >
            <ArrowLeft className="w-5 h-5" />
            Retour à la connexion
          </button>
        </div>
      </div>
    );
  }

  // Auth page
  if (!isAuthenticated) {
    return (
      <AuthPage
        darkMode={darkMode}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onGoogleAuth={handleGoogleAuth}
      />
    );
  }

  // Welcome page
  if (showWelcome) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} px-4`}>
        <div className={`w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-2xl p-8`}>
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center mb-4">
              <MessageSquare className="w-10 h-10 text-white" />
            </div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome! 👋
            </h1>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 text-center`}>
              How should the assistant address you?
            </p>
          </div>

          <div className="mb-6">
            <input
              type="text"
              value={welcomeName}
              onChange={(e) => setWelcomeName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && welcomeName.trim() && handleWelcomeContinue(welcomeName)}
              placeholder="Enter your name"
              className={`w-full ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-900'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              autoFocus
            />
          </div>

          <button
            onClick={() => handleWelcomeContinue(welcomeName)}
            disabled={!welcomeName.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 mb-3 transition-colors"
          >
            Continue
          </button>

          <button
            onClick={handleSkipWelcome}
            className={`w-full ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'} font-medium py-2 transition-colors`}
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  // Main app
  return (
    <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar
        user={user!}
        conversations={conversations}
        currentConversationId={currentConversationId}
        darkMode={darkMode}
        onNewConversation={handleNewConversation}
        onSelectConversation={setCurrentConversationId}
        onDeleteConversation={deleteConv}
        onToggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      />

      <ChatInterface
        messages={messages}
        isTyping={isTyping}
        userName={user?.name || 'there'}
        darkMode={darkMode}
        onSendMessage={handleSendMessage}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  );
}

export default App;