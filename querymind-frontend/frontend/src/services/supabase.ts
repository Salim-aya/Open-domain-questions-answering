import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // ✅ On garde le refresh automatique (utile pour maintenir la session active)
    autoRefreshToken: true,

    // ✅ On garde la persistance, mais seulement pendant la session de l'onglet
    persistSession: true,

    // ✅ Détecte les sessions dans l'URL (important pour OAuth comme Google)
    detectSessionInUrl: true,

    // ✅ CHANGEMENT CLÉ : utilisation de sessionStorage au lieu de localStorage
    storage: window.sessionStorage,

    // ✅ Optionnel mais recommandé : clé personnalisée pour éviter conflits
    storageKey: 'sb-myapp-auth-token', // tu peux garder ou changer le nom
  },

  // Les autres optimisations que tu avais sont bonnes, on les garde
  global: {
    headers: {
      'x-client-info': 'supabase-js-web',
    },
  },

  db: {
    schema: 'public',
  },

  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});