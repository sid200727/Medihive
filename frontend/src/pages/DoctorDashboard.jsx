import { Link } from 'react-router-dom';
import { Users, FileStack, Upload } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import StatCard from '../components/StatCard';
import { mockPatients, mockRecords } from '../utils/mockData';

export default function DoctorDashboard() {
  return (
    <DashboardLayout title="Doctor Dashboard">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <StatCard label="Assigned Patients" value={mockPatients.length} icon={Users} accent="sky" />
        <StatCard label="Records Reviewed" value={mockRecords.filter(r => r.status === 'Reviewed').length} icon={FileStack} accent="navy" />
        <StatCard label="Pending Review" value={mockRecords.filter(r => r.status === 'Pending').length} icon={Upload} accent="gold" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <h3 className="font-serif font-semibold text-navy mb-4">Your Patients</h3>
          <div className="space-y-3">
            {mockPatients.map((p) => (
              <div key={p.id} className="flex items-center justify-between border border-gray-100 rounded-md p-3">
                <div>
                  <p className="font-medium text-gray-800 text-sm">{p.name}</p>
                  <p className="text-xs text-gray-500">Blood group {p.bloodGroup} · Age {p.age}</p>
                </div>
                <Link to="/doctor/patients" className="text-xs text-sky font-medium hover:underline">View</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-serif font-semibold text-navy">Recent Uploads</h3>
            <Link to="/upload" className="flex items-center gap-1 text-sm bg-navy text-white px-3 py-1.5 rounded-md hover:opacity-90">
              <Upload size={14} /> Upload
            </Link>
          </div>
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
    </DashboardLayout>
  );
}
