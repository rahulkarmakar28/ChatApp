import { Routes, Route, Navigate } from 'react-router-dom'

import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'


import OpenRoute from './route/OpenRoute'
import PrivateRoute from './route/PrivateRoute'
import VerifyEmail from './components/auth/VerifyEmail'
import ForgotPassword from './components/auth/ForgotPassword'
import UpdatePassword from './components/auth/ResetPassword'

function App() {
  return (
      <Routes>
        <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
        <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
        <Route path="/verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>} />
        <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
        <Route path="/update-password/:id" element={<OpenRoute><UpdatePassword /></OpenRoute>} />


        <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
        {/* <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} /> */}
        <Route path="*" element={<Navigate to='/login' />} />
      </Routes>
  )
}

export default App