import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, Users, FileStack, Stethoscope } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-navy text-white text-center text-sm py-2 px-4">
        Now supporting family-linked accounts for shared record access.
      </div>

      <section className="bg-gradient-to-br from-navy to-sky/80 text-white py-20 px-6 text-center">
        <HeartPulse className="mx-auto text-gold mb-4" size={48} />
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
          Your medical records, unified.
        </h1>
        <p className="max-w-xl mx-auto text-sky-100 mb-8">
          MediHive connects patients, doctors, and families around one secure,
          role-based record system — no more scattered reports and lost prescriptions.
        </p>
        <Link
          to="/login"
          className="inline-block bg-gold text-navy font-semibold px-6 py-3 rounded-md hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </section>

      <section className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 px-6 text-center">
        {[
          ['128', 'Patients'], ['14', 'Doctors'], ['342', 'Records Stored'], ['57', 'Active Sessions'],
        ].map(([value, label]) => (
          <div key={label}>
            <p className="text-3xl font-serif font-bold text-navy">{value}</p>
            <p className="text-sm text-gray-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 px-6 pb-16">
        {[
          [ShieldCheck, 'Secure by design', 'JWT-based auth and role-scoped access keep records visible only to who should see them.'],
          [Users, 'Built for families', 'Family accounts can be linked to a patient for shared visibility, with consent.'],
          [Stethoscope, 'Doctor workflows', 'Upload, review, and track patient records without leaving the dashboard.'],
        ].map(([Icon, title, desc]) => (
          <div key={title} className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
            <Icon className="text-sky mb-3" size={28} />
            <h3 className="font-serif font-semibold text-navy mb-1">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="font-serif text-2xl font-semibold text-navy mb-6 text-center">Built for every role</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            ['Admin', 'Manage users, oversee all records, monitor system activity.'],
            ['Doctor', 'View assigned patients, upload records, track case history.'],
            ['Patient / Family', 'View your own records securely, download reports anytime.'],
          ].map(([role, desc]) => (
            <div key={role} className="border border-gray-100 rounded-lg p-5 bg-white">
              <FileStack className="text-gold mb-2" size={20} />
              <p className="font-semibold text-navy">{role}</p>
              <p className="text-sm text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-navy text-sky-100 text-center text-sm py-6">
        © 2026 MediHive. Built for coursework/demo purposes.
      </footer>
    </div>
  );
}
