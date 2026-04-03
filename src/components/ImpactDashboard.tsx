import { motion } from 'motion/react';
import { Droplets, Wind, Leaf, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import ImpactReportModal from './ImpactReportModal';

export default function ImpactDashboard() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const stats = [
    { label: 'Water Saved', value: '12,450L', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'CO2 Offset', value: '45.2kg', icon: Wind, color: 'text-stone-500', bg: 'bg-stone-100' },
    { label: 'Circular Items', value: '12', icon: RefreshCw, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Bio-Score', value: '94/100', icon: Leaf, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-stone-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-black text-stone-900 tracking-tight mb-2">Your Environmental Impact</h2>
            <p className="text-stone-500 font-medium">Real-time tracking of your sustainable choices with BioThreads.</p>
          </div>
          <button 
            onClick={() => setIsReportOpen(true)}
            className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
          >
            View Full Report
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl border border-stone-100 hover:border-emerald-200 hover:shadow-lg transition-all group"
            >
              <div className={`${stat.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-stone-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-stone-50 rounded-3xl border border-stone-100 flex flex-col md:flex-row items-center gap-6">
          <div className="flex -space-x-4">
            {[
              '1534528741775-53994a69daeb',
              '1507003211169-0a1dd7228f2d',
              '1494790108377-be9c29b29330',
              '1500648767791-00dcc994a43e'
            ].map((id, i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-stone-200">
                <img 
                  src={`https://images.unsplash.com/photo-${id}?q=80&w=100&auto=format&fit=crop`} 
                  alt="User" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer" 
                />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-white bg-emerald-600 flex items-center justify-center text-white text-xs font-bold">
              +2k
            </div>
          </div>
          <p className="text-sm font-medium text-stone-600 text-center md:text-left">
            Join <span className="font-black text-stone-900">2,450+ others</span> in the BioLoop circular economy. 
            Together we've saved over <span className="font-black text-emerald-600">1.2M Liters</span> of water this month.
          </p>
        </div>
      </div>
      <ImpactReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
}
