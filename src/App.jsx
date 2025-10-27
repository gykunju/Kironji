import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Events from './pages/Events'
import Memories from './pages/Memories'
import WishList from './pages/WishList'
import Chats from './pages/Chats'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Navigation from './components/Navigation'
import './App.css'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <div className="bg-[#1A1625] min-h-screen text-[#F8F6F1] overflow-x-hidden">
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/" replace /> : <SignIn />} />
        <Route path="/signup" element={user ? <Navigate to="/" replace /> : <SignUp />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/events" element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
        } />
        <Route path="/memories" element={
          <ProtectedRoute>
            <Memories />
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        } />
        <Route path="/chats" element={
          <ProtectedRoute>
            <Chats />
          </ProtectedRoute>
        } />
      </Routes>
      {user && <Navigation />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
