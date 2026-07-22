import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import FileUpload from '../components/FileUpload';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ patientName: '', type: '', notes: '' });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !form.patientName || !form.type) return;
    // Swap for recordsService.upload(formData) once the Django backend is live.
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setForm({ patientName: '', type: '', notes: '' });
    setFile(null);
  };

  return (
    <DashboardLayout title="Upload Record">
      <div className="grid md:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white rounded-lg border border-gray-100 shadow-sm p-6 space-y-4">
          <FileUpload onFileSelect={setFile} />

          <div>
            <label className="text-sm font-medium text-gray-700">Patient Name</label>
            <input
              value={form.patientName}
              onChange={(e) => setForm({ ...form, patientName: e.target.value })}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Record Type</label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              required
            >
              <option value="">Select type</option>
              <option>Blood Test</option>
              <option>X-Ray</option>
              <option>MRI Scan</option>
              <option>Prescription</option>
              <option>ECG Report</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Notes (optional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {success && (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-md px-3 py-2 text-sm">
              <CheckCircle2 size={16} /> Record uploaded successfully.
            </div>
          )}

          <button type="submit" className="w-full bg-navy text-white py-2 rounded-md font-medium hover:opacity-90">
            Upload Record
          </button>
        </form>

        <aside className="bg-white rounded-lg border border-gray-100 shadow-sm p-5 h-fit">
          <h3 className="font-serif font-semibold text-navy mb-3">Guidelines</h3>
          <ul className="text-sm text-gray-500 space-y-2 list-disc list-inside">
            <li>Accepted formats: PDF, JPG, PNG</li>
            <li>Max file size: 10MB</li>
            <li>Ensure patient name matches records exactly</li>
            <li>Sensitive files are encrypted at rest</li>
          </ul>
        </aside>
      </div>
    </DashboardLayout>
  );
}
