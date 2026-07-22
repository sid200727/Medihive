import { Link } from 'react-router-dom';
import { HeartPulse } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
      <HeartPulse className="text-sky mb-4" size={40} />
      <h1 className="font-serif text-3xl font-bold text-navy mb-2">404</h1>
      <p className="text-gray-500 mb-6">This page doesn't exist in MediHive.</p>
      <Link to="/" className="bg-navy text-white px-5 py-2 rounded-md text-sm font-medium hover:opacity-90">
        Back to Home
      </Link>
    </div>
  );
}
