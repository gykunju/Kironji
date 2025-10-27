import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { IoMail, IoLockClosed, IoPerson, IoEye, IoEyeOff } from 'react-icons/io5'

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    const { data, error } = await signUp(email, password, username, fullName)

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/signin')
    }
  }

  return (
    <div className="min-h-screen bg-[#1A1625] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#C9A961] mb-2">Create Account</h1>
          <p className="text-[#B8B8C8]">Join Kironji to start sharing memories</p>
        </div>

        <div className="bg-[#252235] rounded-2xl p-8 border-2 border-[#C9A961]/20 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                Full Name
              </label>
              <div className="relative">
                <IoPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8B8C8]" size={20} />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl pl-10 pr-4 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[#F8F6F1] text-sm font-medium mb-2">
                Username
              </label>
              <div className="relative">
                <IoPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-[#B8B8C8]" size={20} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#1A1625] border-2 border-[#C9A961]/30 rounded-xl pl-10 pr-4 py-3 text-[#F8F6F1] placeholder-[#B8B8C8] focus:border-[#C9A961] focus:outline-none transition-all"
                  placeholder="Choose a username"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password (min 6 characters)"
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
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#B8B8C8] text-sm">
              Already have an account?{' '}
              <Link to="/signin" className="text-[#C9A961] hover:text-[#DBA39A] font-semibold transition-colors">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
