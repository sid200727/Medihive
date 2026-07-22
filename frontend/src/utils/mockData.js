// Demo/mock data used until the Django backend is wired in.
// Swap these calls for real api/services calls when ready.

export const demoUsers = {
  admin:   { username: 'admin',   password: 'admin123',   role: 'admin',   first_name: 'Ananya',  last_name: 'Rao',    id: 'u-001' },
  doctor:  { username: 'doctor',  password: 'doctor123',  role: 'doctor',  first_name: 'Rahul',   last_name: 'Verma',  id: 'u-002' },
  patient: { username: 'patient', password: 'patient123', role: 'patient', first_name: 'Siddhi',  last_name: 'K',      id: 'u-003' },
};

export const mockStats = {
  patients: 128,
  doctors: 14,
  records: 342,
  sessions: 57,
};

export const mockRecords = [
  { id: 'r-1', patientName: 'Siddhi K',    type: 'Blood Test',      doctor: 'Dr. Verma',  date: '2026-07-02', status: 'Reviewed' },
  { id: 'r-2', patientName: 'Rohan Mehta', type: 'X-Ray Chest',     doctor: 'Dr. Iyer',   date: '2026-07-05', status: 'Pending'  },
  { id: 'r-3', patientName: 'Anjali Nair', type: 'MRI Scan',        doctor: 'Dr. Verma',  date: '2026-07-10', status: 'Reviewed' },
  { id: 'r-4', patientName: 'Siddhi K',    type: 'Prescription',    doctor: 'Dr. Verma',  date: '2026-07-14', status: 'Reviewed' },
  { id: 'r-5', patientName: 'Kabir Shah',  type: 'ECG Report',      doctor: 'Dr. Iyer',   date: '2026-07-15', status: 'Pending'  },
];

export const mockUsersList = [
  { id: 'u-001', name: 'Ananya Rao',   email: 'ananya.rao@medihive.com',   role: 'admin'   },
  { id: 'u-002', name: 'Rahul Verma',  email: 'rahul.verma@medihive.com',  role: 'doctor'  },
  { id: 'u-004', name: 'Priya Iyer',   email: 'priya.iyer@medihive.com',   role: 'doctor'  },
  { id: 'u-003', name: 'Siddhi K',     email: 'siddhi.k@medihive.com',     role: 'patient' },
  { id: 'u-005', name: 'Rohan Mehta',  email: 'rohan.mehta@medihive.com',  role: 'patient' },
  { id: 'u-006', name: 'Kabir Shah',   email: 'kabir.shah@medihive.com',   role: 'family'  },
];

export const mockPatients = [
  { id: 'u-003', name: 'Siddhi K',    bloodGroup: 'O+', age: 19, assignedDoctor: 'Dr. Verma' },
  { id: 'u-005', name: 'Rohan Mehta', bloodGroup: 'B+', age: 34, assignedDoctor: 'Dr. Iyer'  },
  { id: 'u-007', name: 'Anjali Nair', bloodGroup: 'A-', age: 27, assignedDoctor: 'Dr. Verma' },
];
