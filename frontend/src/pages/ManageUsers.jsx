import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { mockUsersList } from '../utils/mockData';

const roleColors = {
  admin: 'bg-navy/10 text-navy',
  doctor: 'bg-sky/10 text-sky',
  patient: 'bg-gold/20 text-yellow-800',
  family: 'bg-gray-100 text-gray-600',
};

export default function ManageUsers() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const filtered = mockUsersList.filter((u) => {
    const matchesSearch = `${u.name} ${u.email}`.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <DashboardLayout title="Manage Users">
      <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search users..."
              className="pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm w-56"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="all">All roles</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
            <option value="family">Family</option>
          </select>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1 text-sm bg-navy text-white px-3 py-2 rounded-md hover:opacity-90"
        >
          <Plus size={14} /> Add User
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white text-left">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={u.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-gray-800">{u.name}</td>
                <td className="px-4 py-3 text-gray-500">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${roleColors[u.role]}`}>
                    {u.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-lg font-semibold text-navy mb-4">Add User</h3>
            <div className="space-y-3">
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="Full name" />
              <input className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="Email" />
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                <option>Patient</option>
                <option>Doctor</option>
                <option>Family</option>
                <option>Admin</option>
              </select>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 border border-gray-300 py-2 rounded-md text-sm">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 bg-navy text-white py-2 rounded-md text-sm">Add</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
