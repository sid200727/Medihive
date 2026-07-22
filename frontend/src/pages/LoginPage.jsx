import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const roleRedirect = { admin: '/admin', doctor: '/doctor', patient: '/patient', family: '/patient' };

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Swap this block for authService.login() once the Django backend is live.
    setTimeout(() => {
      const result = login(username, password);
      setLoading(false);
      if (result.success) {
        navigate(roleRedirect[result.user.role] || '/');
      } else {
        setError(result.error);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-sky/70 px-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-navy text-gold p-3 rounded-full mb-2">
            <HeartPulse size={28} />
          </div>
          <h1 className="font-serif text-2xl font-semibold text-navy">MediHive</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky"
              placeholder="admin / doctor / patient"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-navy text-white py-2 rounded-md font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 bg-gray-50 rounded-md p-3 text-xs text-gray-500 space-y-1">
          <p className="font-medium text-gray-600">Demo credentials:</p>
          <p>Admin — admin / admin123</p>
          <p>Doctor — doctor / doctor123</p>
          <p>Patient — patient / patient123</p>
        </div>
      </div>
    </div>
  );
}
