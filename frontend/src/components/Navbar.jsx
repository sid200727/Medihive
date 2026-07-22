import { Link, useNavigate } from 'react-router-dom';
import { HeartPulse, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-navy text-white px-6 py-3 flex items-center justify-between shadow-md">
      <Link to="/" className="flex items-center gap-2 font-serif text-xl font-semibold">
        <HeartPulse className="text-gold" size={24} />
        MediHive
      </Link>

      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-sky-100 hidden sm:inline">
              {user.first_name} {user.last_name} · <span className="capitalize">{user.role}</span>
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-sm bg-sky/20 hover:bg-sky/40 px-3 py-1.5 rounded-md transition"
            >
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="text-sm bg-gold text-navy font-medium px-4 py-1.5 rounded-md hover:opacity-90 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
