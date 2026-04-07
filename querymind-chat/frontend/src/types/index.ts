export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  created_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  created_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  messages: Message[];
  created_at: Date;
  updated_at: Date;
}

export interface AuthResponse {
  user: User | null;
  error: Error | null;
}

export interface SignUpData {
  email: string;
  password: string;
  name: string;
}

export interface SignInData {
  email: string;
  password: string;
}