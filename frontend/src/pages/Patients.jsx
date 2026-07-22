import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { mockPatients, mockRecords } from '../utils/mockData';

export default function Patients() {
  const [selected, setSelected] = useState(mockPatients[0]);
  const patientRecords = mockRecords.filter((r) => r.patientName === selected?.name);

  return (
    <DashboardLayout title="Patients">
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4">
          <h3 className="font-serif font-semibold text-navy mb-3 text-sm">Patient List</h3>
          <div className="space-y-2">
            {mockPatients.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                  selected?.id === p.id ? 'bg-sky/10 text-navy font-medium' : 'hover:bg-gray-50 text-gray-600'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {selected && (
            <>
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                <h3 className="font-serif font-semibold text-navy mb-4">{selected.name}</h3>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <div><dt className="text-gray-500">Blood Group</dt><dd className="font-medium">{selected.bloodGroup}</dd></div>
                  <div><dt className="text-gray-500">Age</dt><dd className="font-medium">{selected.age}</dd></div>
                  <div><dt className="text-gray-500">Assigned Doctor</dt><dd className="font-medium">{selected.assignedDoctor}</dd></div>
                </dl>
              </div>

              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                <h3 className="font-serif font-semibold text-navy mb-4">Records</h3>
                {patientRecords.length === 0 ? (
                  <p className="text-sm text-gray-400">No records on file yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {patientRecords.map((r) => (
                      <li key={r.id} className="py-2 flex justify-between text-sm">
                        <span className="text-gray-700">{r.type}</span>
                        <span className="text-gray-400">{r.date}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
