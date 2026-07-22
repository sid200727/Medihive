import { Download, ShieldCheck } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import { mockRecords } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';

export default function PatientDashboard() {
  const { user } = useAuth();
  const myRecords = mockRecords.filter((r) => r.patientName === 'Siddhi K');

  return (
    <DashboardLayout title="My Dashboard">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <h3 className="font-serif font-semibold text-navy mb-4">Health Card</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd>{user.first_name} {user.last_name}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Patient ID</dt><dd>{user.id}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Blood Group</dt><dd>O+</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Assigned Doctor</dt><dd>Dr. Verma</dd></div>
          </dl>
          <div className="mt-4 flex items-start gap-2 bg-sky/5 text-xs text-navy p-3 rounded-md">
            <ShieldCheck size={16} className="shrink-0 mt-0.5" />
            Your records are only visible to you and your assigned doctor.
          </div>
        </div>

        <div className="md:col-span-2 bg-white rounded-lg border border-gray-100 shadow-sm p-5">
          <h3 className="font-serif font-semibold text-navy mb-4">My Records</h3>
          <div className="space-y-2">
            {myRecords.map((r) => (
              <div key={r.id} className="flex items-center justify-between border border-gray-100 rounded-md p-3">
                <div>
                  <p className="text-sm font-medium text-gray-800">{r.type}</p>
                  <p className="text-xs text-gray-500">{r.doctor} · {r.date}</p>
                </div>
                <button className="p-2 rounded-md hover:bg-navy/10 text-navy" title="Download">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
