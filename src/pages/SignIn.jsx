import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IoMail, IoLockClosed, IoEye, IoEyeOff } from 'react-icons/io5'

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await signIn(email, password)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1625] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#C9A961] mb-2">Welcome Back</h1>
          <p className="text-[#B8B8C8]">Sign in to continue to Kironji</p>
        </div>

        <div className="bg-[#252235] rounded-2xl p-8 border-2 border-[#C9A961]/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <IoMail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8B8C8]" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl pl-10 pr-4 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <IoLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8B8C8]" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl pl-10 pr-12 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B8B8C8] hover:text-[#C9A961] transition-colors"
                >
                  {showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#DBA39A] to-[#C9A961] text-[#1A1625] font-bold py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#B8B8C8] text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-[#C9A961] hover:text-[#DBA39A] font-semibold transition-colors">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
