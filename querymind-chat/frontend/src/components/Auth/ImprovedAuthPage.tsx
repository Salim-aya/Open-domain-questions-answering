// src/components/Auth/ImprovedAuthPage.tsx

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Lock, User, Loader2, Eye, EyeOff, Brain } from 'lucide-react'
import { authService } from '../../services/supabase'
import toast from 'react-hot-toast'

interface LoginFormData {
  email: string
  password: string
}

interface SignUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const ImprovedAuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const loginForm = useForm<LoginFormData>()
  const signUpForm = useForm<SignUpFormData>()

  const onLogin = async (data: LoginFormData) => {
    setLoading(true)
    try {
      const { error } = await authService.signIn(data.email, data.password)
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Welcome back! 🎉')
      }
    } catch (error) {
      toast.error('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const onSignUp = async (data: SignUpFormData) => {
    setLoading(true)
    try {
      const { error } = await authService.signUp(data.email, data.password, {
        first_name: data.firstName,
        last_name: data.lastName,
        display_name: `${data.firstName} ${data.lastName}`,
      })
      if (error) {
        toast.error(error.message)
      } else {
        toast.success('Account created! Welcome aboard! 🚀')
      }
    } catch (error) {
      toast.error('An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-bg-main">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-secondary to-accent p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Decoration circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Brain className="w-8 h-8" />
            </div>
            <h1 className="text-5xl font-bold">QueryMind</h1>
          </div>
          <p className="text-xl opacity-90 font-light">
            Your intelligent conversation assistant powered by AI
          </p>
        </div>

        <div className="space-y-8 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Lightning Fast Answers</h3>
              <p className="opacity-80 text-sm">Get instant, accurate responses backed by credible sources</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Secure & Private</h3>
              <p className="opacity-80 text-sm">Your conversations are encrypted and protected</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Evidence-Based</h3>
              <p className="opacity-80 text-sm">Every answer comes with verified sources and citations</p>
            </div>
          </div>
        </div>

        <p className="text-sm opacity-60 relative z-10">© 2026 QueryMind. Academic Research Project</p>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-primary">QueryMind</h1>
            </div>
            <p className="text-text-secondary">Your intelligent assistant</p>
          </div>

          {/* Auth Card */}
          <div className="card p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-text-primary mb-2">
                {isLogin ? 'Welcome back!' : 'Get started'}
              </h2>
              <p className="text-text-secondary">
                {isLogin
                  ? 'Sign in to continue your conversations'
                  : 'Create your account to start exploring'}
              </p>
            </div>

            {/* Toggle Tabs */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
                  isLogin
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 rounded-md font-medium transition-all ${
                  !isLogin
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type="email"
                      {...loginForm.register('email', { required: 'Email is required' })}
                      className="input-field pl-10"
                      placeholder="you@example.com"
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-error">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...loginForm.register('password', { required: 'Password is required' })}
                      className="input-field pl-10 pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-error">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>
            ) : (
              /* Sign Up Form */
              <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                      <input
                        type="text"
                        {...signUpForm.register('firstName', { required: 'Required' })}
                        className="input-field pl-10"
                        placeholder="John"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      {...signUpForm.register('lastName', { required: 'Required' })}
                      className="input-field"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type="email"
                      {...signUpForm.register('email', { required: 'Email is required' })}
                      className="input-field pl-10"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...signUpForm.register('password', {
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Min 6 characters' },
                      })}
                      className="input-field pl-10 pr-12"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      {...signUpForm.register('confirmPassword', {
                        required: 'Please confirm password',
                        validate: (value) =>
                          value === signUpForm.watch('password') || 'Passwords do not match',
                      })}
                      className="input-field pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-text-secondary mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ImprovedAuthPage