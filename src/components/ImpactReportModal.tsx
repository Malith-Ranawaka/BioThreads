import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Droplets, Wind, Leaf, RefreshCw, TrendingUp, Award, Users } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface ImpactReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const monthlyData = [
  { month: 'Jan', water: 1200, co2: 4.5, circular: 2 },
  { month: 'Feb', water: 2100, co2: 8.2, circular: 3 },
  { month: 'Mar', water: 3400, co2: 12.5, circular: 5 },
  { month: 'Apr', water: 5700, co2: 20.1, circular: 2 },
];

const categoryData = [
  { name: 'Water', value: 85, color: '#10b981' },
  { name: 'CO2', value: 65, color: '#78716c' },
  { name: 'Circular', value: 92, color: '#059669' },
  { name: 'Bio-Score', value: 94, color: '#059669' },
];

export default function ImpactReportModal({ isOpen, onClose }: ImpactReportModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-8 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-600 p-3 rounded-2xl text-white shadow-lg shadow-emerald-600/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-stone-900 tracking-tight">Full Impact Report</h2>
                  <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">Real-time Environmental Audit</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-3 bg-white hover:bg-stone-900 hover:text-white rounded-2xl text-stone-400 transition-all shadow-sm border border-stone-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-grow overflow-y-auto p-8 md:p-12 space-y-12">
              {/* Top Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-5 h-5 text-emerald-600" />
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Sustainability Rank</span>
                  </div>
                  <p className="text-3xl font-black text-emerald-900 mb-1">Top 5%</p>
                  <p className="text-xs text-emerald-700 font-medium">Of the BioThreads community</p>
                </div>
                <div className="bg-stone-50 p-6 rounded-[2rem] border border-stone-100">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-5 h-5 text-stone-500" />
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Community Impact</span>
                  </div>
                  <p className="text-3xl font-black text-stone-900 mb-1">1.2M Liters</p>
                  <p className="text-xs text-stone-500 font-medium">Total water saved this month</p>
                </div>
                <div className="bg-stone-900 p-6 rounded-[2rem] text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <RefreshCw className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Circular Score</span>
                  </div>
                  <p className="text-3xl font-black mb-1">94/100</p>
                  <p className="text-xs text-stone-400 font-medium">Verified by BioLoop Protocol</p>
                </div>
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Water Savings Chart */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-stone-900 mb-1">Water Savings Growth</h3>
                    <p className="text-sm text-stone-500 font-medium">Monthly accumulation of water saved through organic fibers.</p>
                  </div>
                  <div className="h-[300px] w-full bg-stone-50 rounded-3xl p-6 border border-stone-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={monthlyData}>
                        <defs>
                          <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 700, fill: '#a8a29e' }}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 700, fill: '#a8a29e' }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }} 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="water" 
                          stroke="#10b981" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorWater)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Performance Breakdown */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-black text-stone-900 mb-1">Performance Breakdown</h3>
                    <p className="text-sm text-stone-500 font-medium">Your sustainability metrics compared to industry standards.</p>
                  </div>
                  <div className="h-[300px] w-full bg-stone-50 rounded-3xl p-6 border border-stone-100">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData} layout="vertical" margin={{ left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
                        <XAxis type="number" hide />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fontSize: 10, fontWeight: 900, fill: '#1c1917', textAnchor: 'end' }}
                        />
                        <Tooltip 
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{ 
                            borderRadius: '16px', 
                            border: 'none', 
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                          }} 
                        />
                        <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={24}>
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown List */}
              <div className="space-y-6">
                <h3 className="text-lg font-black text-stone-900">Detailed Impact Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Water Savings', value: '12,450 Liters', detail: 'Equivalent to 150 showers', icon: Droplets },
                    { label: 'CO2 Avoided', value: '45.2 kg', detail: 'Equivalent to 250km driven', icon: Wind },
                    { label: 'Waste Diverted', value: '8.4 kg', detail: 'Upcycled through BioLoop', icon: RefreshCw },
                    { label: 'Soil Health', value: 'Regenerative', detail: '100% pesticide-free fibers', icon: Leaf },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm">
                      <div className="bg-stone-50 p-3 rounded-2xl">
                        <item.icon className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{item.label}</p>
                        <p className="text-lg font-black text-stone-900">{item.value}</p>
                        <p className="text-xs text-stone-500 font-medium">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-stone-100 bg-stone-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest">
                Data verified by BioThreads Circular Protocol v3.1
              </p>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-4 bg-stone-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-stone-900/10"
              >
                Close Report
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
