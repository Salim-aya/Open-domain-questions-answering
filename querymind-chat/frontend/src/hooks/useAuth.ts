import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import { 
  signUpWithEmail, 
  signInWithEmail, 
  signInWithGoogle, 
  signOutUser,
} from '../services/api';
import { User, SignUpData, SignInData } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [needsEmailConfirmation, setNeedsEmailConfirmation] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');

  const loadUserProfile = async (authUser: any): Promise<User> => {
    const minimalProfile: User = {
      id: authUser.id,
      email: authUser.email || '',
      name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
      created_at: new Date().toISOString(),
    };

    setUser(minimalProfile);
    setLoading(false);

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (!error && data) {
        setUser(data);
        return data;
      }

      if (error?.code === 'PGRST116') {
        const { data: newProfile } = await supabase
          .from('users')
          .insert([minimalProfile])
          .select()
          .single();

        if (newProfile) {
          setUser(newProfile);
          return newProfile;
        }
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    }

    return minimalProfile;
  };

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        console.log('🔍 Checking session...');
        
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('❌ Session error:', sessionError);
          if (mounted) {
            setUser(null);
            setLoading(false);
          }
          return;
        }

        console.log('📦 Session:', session ? 'Found' : 'Not found');

        if (!mounted) return;

        if (session?.user) {
          // IMPORTANT: Vérifier que la session est VRAIMENT valide
          const { data: { user: currentUser }, error: userError } = await supabase.auth.getUser();
          
          if (userError || !currentUser) {
            console.log('❌ Session invalide, nettoyage...');
            await supabase.auth.signOut();
            setUser(null);
            setLoading(false);
            return;
          }

          console.log('✅ Session valide, chargement du profil...');
          await loadUserProfile(session.user);
        } else {
          console.log('❌ Pas de session');
          setUser(null);
          setLoading(false);
        }
      } catch (err) {
        console.error('❌ Error checking session:', err);
        if (mounted) {
          setUser(null);
          setLoading(false);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('🔔 Auth event:', event);

        if (event === 'TOKEN_REFRESHED' && user) {
          return;
        }

        if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out');
          setUser(null);
          setLoading(false);
          setNeedsEmailConfirmation(false);
          setConfirmationEmail('');
          return;
        }

        if (event === 'SIGNED_IN' && session?.user) {
          console.log('👤 User signed in');
          setNeedsEmailConfirmation(false);
          setConfirmationEmail('');
          await loadUserProfile(session.user);
          return;
        }

        if (!session) {
          console.log('❌ No session');
          setUser(null);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (data: SignUpData) => {
    try {
      setError(null);
      setNeedsEmailConfirmation(false);
      
      const result = await signUpWithEmail(data);
      
      console.log('📝 SignUp result:', result);
      
      // Si l'utilisateur existe mais pas de session = confirmation requise
      if (result.user && !result.session) {
        console.log('📧 Email confirmation required');
        setNeedsEmailConfirmation(true);
        setConfirmationEmail(data.email);
        setError('CONFIRMATION_REQUIRED');
        return { needsConfirmation: true, email: data.email };
      }
      
      if (result.session) {
        console.log('✅ User signed up and logged in');
        return { needsConfirmation: false };
      }
      
      return { needsConfirmation: false };
    } catch (err: any) {
      console.error('❌ SignUp error:', err);
      setError(err.message);
      throw err;
    }
  };

  const signIn = async (data: SignInData) => {
    try {
      setError(null);
      setNeedsEmailConfirmation(false);
      
      const result = await signInWithEmail(data);
      console.log('🔑 SignIn result:', result);
      
      if (!result.session) {
        setError('EMAIL_NOT_CONFIRMED');
        setConfirmationEmail(data.email);
        throw new Error('Please confirm your email before signing in');
      }
      
      return result;
    } catch (err: any) {
      console.error('❌ SignIn error:', err);
      
      if (err.message?.includes('Email not confirmed') || err.message?.includes('confirm')) {
        setError('EMAIL_NOT_CONFIRMED');
        setNeedsEmailConfirmation(true);
        setConfirmationEmail(data.email);
      } else {
        setError(err.message);
      }
      
      throw err;
    }
  };

  const signInGoogle = async () => {
    try {
      setError(null);
      setNeedsEmailConfirmation(false);
      await signInWithGoogle();
    } catch (err: any) {
      setError(err.message);
      console.error('❌ Google SignIn error:', err);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      console.log('👋 Signing out...');
      await signOutUser();
      setUser(null);
      setNeedsEmailConfirmation(false);
      setConfirmationEmail('');
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return {
    user,
    loading,
    error,
    needsEmailConfirmation,
    confirmationEmail,
    signUp,
    signIn,
    signInGoogle,
    signOut,
    updateUser,
    isAuthenticated: !!user,
  };
};