import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Upload, Users, UserCog } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const linksByRole = {
  admin: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Manage Users', icon: UserCog },
    { to: '/records', label: 'Records', icon: FileText },
  ],
  doctor: [
    { to: '/doctor', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/doctor/patients', label: 'Patients', icon: Users },
    { to: '/records', label: 'Records', icon: FileText },
    { to: '/upload', label: 'Upload Record', icon: Upload },
  ],
  patient: [
    { to: '/patient', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/records', label: 'My Records', icon: FileText },
  ],
  family: [
    { to: '/patient', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/records', label: 'Records', icon: FileText },
  ],
};

export default function Sidebar() {
  const { user } = useAuth();
  const links = linksByRole[user?.role] || [];

  return (
    <aside className="w-56 bg-white border-r border-gray-200 min-h-[calc(100vh-56px)] py-6">
      <nav className="flex flex-col gap-1 px-3">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition border-l-4 ${
                isActive
                  ? 'bg-sky/10 text-navy border-gold'
                  : 'text-gray-600 border-transparent hover:bg-gray-50'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
