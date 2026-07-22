import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import RecordsPage from './pages/RecordsPage';
import UploadPage from './pages/UploadPage';
import ManageUsers from './pages/ManageUsers';
import Patients from './pages/Patients';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute roles={['admin']}><ManageUsers /></ProtectedRoute>
          } />

          <Route path="/doctor" element={
            <ProtectedRoute roles={['doctor']}><DoctorDashboard /></ProtectedRoute>
          } />
          <Route path="/doctor/patients" element={
            <ProtectedRoute roles={['doctor']}><Patients /></ProtectedRoute>
          } />

          <Route path="/patient" element={
            <ProtectedRoute roles={['patient', 'family']}><PatientDashboard /></ProtectedRoute>
          } />

          <Route path="/records" element={
            <ProtectedRoute roles={['admin', 'doctor', 'patient', 'family']}><RecordsPage /></ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute roles={['doctor', 'admin']}><UploadPage /></ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
