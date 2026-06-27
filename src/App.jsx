import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/public/Home'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import Clients from './pages/admin/Clients'
import ClientDetail from './pages/admin/ClientDetail'
import Rappels from './pages/admin/Rappels'
import ProtectedRoute from './components/admin/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Vitrine publique */}
        <Route path="/" element={<Home />} />

        {/* Admin */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
        />
        <Route
          path="/admin/clients"
          element={<ProtectedRoute><Clients /></ProtectedRoute>}
        />
        <Route
          path="/admin/clients/:id"
          element={<ProtectedRoute><ClientDetail /></ProtectedRoute>}
        />
        <Route
          path="/admin/rappels"
          element={<ProtectedRoute><Rappels /></ProtectedRoute>}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
