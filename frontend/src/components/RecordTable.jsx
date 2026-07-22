import { useState } from 'react';
import { Eye, Download } from 'lucide-react';

export default function RecordTable({ records }) {
  const [selected, setSelected] = useState(null);

  const handleDownload = (record) => {
    const content = `MediHive Record\n\nPatient: ${record.patientName}\nType: ${record.type}\nDoctor: ${record.doctor}\nDate: ${record.date}\nStatus: ${record.status}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${record.type.replace(/\s+/g, '_')}_${record.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-100 shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-navy text-white text-left">
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Doctor</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r, i) => (
              <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-4 py-3 font-medium text-gray-800">{r.patientName}</td>
                <td className="px-4 py-3">{r.type}</td>
                <td className="px-4 py-3">{r.doctor}</td>
                <td className="px-4 py-3">{r.date}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.status === 'Reviewed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gold/20 text-yellow-800'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setSelected(r)}
                      className="p-1.5 rounded hover:bg-sky/10 text-sky"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDownload(r)}
                      className="p-1.5 rounded hover:bg-navy/10 text-navy"
                      title="Download"
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-serif text-lg font-semibold text-navy mb-4">Record Details</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Patient</dt><dd>{selected.patientName}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Type</dt><dd>{selected.type}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Doctor</dt><dd>{selected.doctor}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Date</dt><dd>{selected.date}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Status</dt><dd>{selected.status}</dd></div>
            </dl>
            <button
              onClick={() => setSelected(null)}
              className="mt-5 w-full bg-navy text-white py-2 rounded-md text-sm font-medium hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
