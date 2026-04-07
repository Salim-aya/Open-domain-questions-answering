// src/components/Auth/AuthCallback.tsx

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../services/supabase'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

const AuthCallback = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Récupérer le hash de l'URL (contient les tokens après OAuth)
        const hashParams = new URLSearchParams(window.location.hash.substring(1))
        const accessToken = hashParams.get('access_token')
        const refreshToken = hashParams.get('refresh_token')

        if (accessToken && refreshToken) {
          // Définir la session avec les tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (error) {
            console.error('Error setting session:', error)
            toast.error('Authentication failed')
            navigate('/auth')
            return
          }

          toast.success('Successfully signed in with Google!')
          navigate('/')
        } else {
          // Pas de tokens, rediriger vers la page d'auth
          navigate('/auth')
        }
      } catch (error) {
        console.error('Callback error:', error)
        toast.error('An error occurred during authentication')
        navigate('/auth')
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-blue-50">
      <div className="text-center">
        <Loader2 className="w-16 h-16 text-primary animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Completing authentication...
        </h2>
        <p className="text-gray-600">Please wait while we sign you in.</p>
      </div>
    </div>
  )
}

export default AuthCallback