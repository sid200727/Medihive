import { Users, Stethoscope, FileStack, Activity, Plus } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { mockStats, mockRecords, mockUsersList } from '../utils/mockData';

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);

  const roleCounts = mockUsersList.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  return (
    <DashboardLayout title="Admin Dashboard">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Patients" value={mockStats.patients} icon={Users} accent="sky" />
        <StatCard label="Doctors" value={mockStats.doctors} icon={Stethoscope} accent="navy" />
        <StatCard label="Records" value={mockStats.records} icon={FileStack} accent="gold" />
        <StatCard label="Active Sessions" value={mockStats.sessions} icon={Activity} accent="sky" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif font-semibold text-navy">User Breakdown</h3>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 text-sm bg-navy text-white px-3 py-1.5 rounded-md hover:opacity-90"
            >
              <Plus size={14} /> Add User
            </button>
          </div>
          <div className="space-y-3">
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize text-gray-600">{role}</span>
                  <span className="text-gray-500">{count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sky"
                    style={{ width: `${(count / mockUsersList.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <h3 className="font-serif font-semibold text-navy mb-4">Recent Records</h3>
          <ul className="divide-y divide-gray-100">
            {mockRecords.slice(0, 5).map((r) => (
              <li key={r.id} className="py-2 flex justify-between text-sm">
                <span className="text-gray-700">{r.patientName} — {r.type}</span>
                <span className="text-gray-400">{r.date}</span>
              </li>
            ))}
          </ul>
        </div>
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
