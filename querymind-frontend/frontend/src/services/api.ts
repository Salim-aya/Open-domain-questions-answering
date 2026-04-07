import { supabase } from './supabase';
import { SignUpData, SignInData, User, Conversation, Message } from '../types';

// ==================== AUTH ====================

export const signUpWithEmail = async ({ email, password, name }: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;

  // Create user profile si l'utilisateur est confirmé
  if (data.user && data.session) {
    try {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            name,
            created_at: new Date().toISOString(),
          },
        ]);

      if (profileError) {
        console.error('Error creating profile during signup:', profileError);
      }
    } catch (err) {
      console.error('Profile creation error:', err);
    }
  }

  return data;
};

export const signInWithEmail = async ({ email, password }: SignInData) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signInWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
};

export const signOutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};

// ==================== USER PROFILE ====================

export const getUserProfile = async (userId: string): Promise<User | null> => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

export const ensureUserProfile = async (userId: string, email: string, name?: string): Promise<User> => {
  try {
    const profile = await getUserProfile(userId);
    if (profile) {
      console.log('Profile found:', profile);
      return profile;
    }
  } catch (error) {
    console.log('Profile does not exist, creating new profile...');
  }

  const newProfile = {
    id: userId,
    email: email,
    name: name || email.split('@')[0],
    created_at: new Date().toISOString(),
  };

  const { data, error: insertError } = await supabase
    .from('users')
    .insert([newProfile])
    .select()
    .single();

  if (insertError) {
    console.error('Error creating profile:', insertError);
    return newProfile as User;
  }

  console.log('Profile created successfully:', data);
  return data;
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ==================== CONVERSATIONS ====================

export const getConversations = async (userId: string): Promise<Conversation[]> => {
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createConversation = async (userId: string, title: string = 'New Conversation'): Promise<Conversation> => {
  const { data, error } = await supabase
    .from('conversations')
    .insert([
      {
        user_id: userId,
        title,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteConversation = async (conversationId: string) => {
  const { error } = await supabase
    .from('conversations')
    .delete()
    .eq('id', conversationId);

  if (error) throw error;
};

export const updateConversationTitle = async (conversationId: string, title: string) => {
  const { data, error } = await supabase
    .from('conversations')
    .update({ 
      title,
      updated_at: new Date().toISOString(),
    })
    .eq('id', conversationId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ==================== MESSAGES ====================

export const getMessages = async (conversationId: string): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const createMessage = async (conversationId: string, content: string, role: 'user' | 'assistant'): Promise<Message> => {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        conversation_id: conversationId,
        content,
        role,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) throw error;

  await supabase
    .from('conversations')
    .update({ updated_at: new Date().toISOString() })
    .eq('id', conversationId);

  return data;
};

// ==================== AI RESPONSE ====================

export const getAIResponse = async (message: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = [
    "That's a great question! Let me help you understand this concept better...",
    "I'd be happy to explain that. Here's what you need to know...",
    "Interesting topic! Let me break this down for you...",
    "Great question! Based on current knowledge, I can tell you that...",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)] + " " + 
         "This is a simulated response. In your actual implementation, this would connect to your AI backend service.";
};
