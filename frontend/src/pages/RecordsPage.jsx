import { useState } from 'react';
import { Search } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import RecordTable from '../components/RecordTable';
import { mockRecords } from '../utils/mockData';
import { useAuth } from '../context/AuthContext';

export default function RecordsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const scoped = user.role === 'patient'
    ? mockRecords.filter((r) => r.patientName === 'Siddhi K')
    : mockRecords;

  const filtered = scoped.filter((r) =>
    `${r.patientName} ${r.type} ${r.doctor}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Records">
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by patient, type, or doctor..."
          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky"
        />
      </div>
      <RecordTable records={filtered} />
    </DashboardLayout>
  );
}
