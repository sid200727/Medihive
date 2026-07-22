export default function StatCard({ label, value, icon: Icon, accent = 'sky' }) {
  const accentMap = {
    sky: 'text-sky bg-sky/10',
    gold: 'text-gold bg-gold/10',
    navy: 'text-navy bg-navy/10',
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${accentMap[accent]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-2xl font-semibold text-navy">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
}
