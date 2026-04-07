import { useState, useEffect } from 'react';
import { 
  getConversations, 
  createConversation, 
  deleteConversation,
  updateConversationTitle,
  getMessages,
  createMessage,
  getAIResponse,
} from '../services/api';
import { Conversation, Message } from '../types';

export const useConversations = (userId: string | undefined) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const currentConversation = conversations.find(c => c.id === currentConversationId);

  // Load conversations
  useEffect(() => {
    if (!userId) return;

    const loadConversations = async () => {
      try {
        setLoading(true);
        const data = await getConversations(userId);
        setConversations(data);
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [userId]);

  // Load messages when conversation changes
  useEffect(() => {
    if (!currentConversationId) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      try {
        const data = await getMessages(currentConversationId);
        setMessages(data);
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, [currentConversationId]);

  const createNew = async () => {
    if (!userId) return;

    try {
      const newConv = await createConversation(userId);
      setConversations(prev => [newConv, ...prev]);
      setCurrentConversationId(newConv.id);
      return newConv;
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  };

  const deleteConv = async (conversationId: string) => {
    try {
      await deleteConversation(conversationId);
      setConversations(prev => prev.filter(c => c.id !== conversationId));
      if (currentConversationId === conversationId) {
        setCurrentConversationId(null);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  };

  const updateTitle = async (conversationId: string, title: string) => {
    try {
      await updateConversationTitle(conversationId, title);
      setConversations(prev => 
        prev.map(c => c.id === conversationId ? { ...c, title } : c)
      );
    } catch (error) {
      console.error('Error updating title:', error);
      throw error;
    }
  };

  const sendMessage = async (content: string) => {
    if (!currentConversationId || !content.trim()) return;

    try {
      // Create user message
      const userMessage = await createMessage(currentConversationId, content, 'user');
      setMessages(prev => [...prev, userMessage]);

      // Update conversation title if it's the first message
      if (messages.length === 0) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        await updateTitle(currentConversationId, title);
      }

      // Get AI response
      setIsTyping(true);
      const aiResponse = await getAIResponse(content);
      const assistantMessage = await createMessage(currentConversationId, aiResponse, 'assistant');
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    } finally {
      setIsTyping(false);
    }
  };

  return {
    conversations,
    currentConversationId,
    currentConversation,
    messages,
    loading,
    isTyping,
    setCurrentConversationId,
    createNew,
    deleteConv,
    updateTitle,
    sendMessage,
  };
};