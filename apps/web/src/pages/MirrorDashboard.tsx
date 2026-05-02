import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { 
  Network, 
  ShieldAlert, 
  Activity, 
  Lock,
  ArrowUpRight,
  TrendingDown,
  Clock,
  Eye,
  Database,
  Cpu,
  ChevronRight,
  Zap,
  AlertTriangle
} from 'lucide-react';

const trafficData = [
  { name: '00:00', throughput: 120, threats: 1 },
  { name: '04:00', throughput: 80, threats: 0 },
  { name: '08:00', throughput: 450, threats: 4 },
  { name: '12:00', throughput: 620, threats: 12 },
  { name: '16:00', throughput: 580, threats: 8 },
  { name: '20:00', throughput: 340, threats: 2 },
  { name: '23:59', throughput: 150, threats: 1 },
];

const KPI_CARDS = [
  { title: 'Active Sessions', value: '14', trend: '+2', color: 'indigo', icon: Network },
  { title: 'Threats Detected', value: '82', trend: '+12%', color: 'rose', icon: ShieldAlert },
  { title: 'Mirror Throughput', value: '1.2 GB/s', trend: '+150MB', color: 'emerald', icon: Zap },
  { title: 'Analysis Latency', value: '12ms', trend: '-2ms', color: 'indigo', icon: Activity },
];

const MirrorDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Traffic Mirroring Control Center</h1>
          <p className="text-slate-400">Enterprise-grade network duplication and automated IDS threat detection platform.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all border border-slate-700">
            Export PCAP Snapshot
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-600/20">
            Initialize New Mirror
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-indigo-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-indigo-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('+') && card.color === 'rose' ? 'text-rose-400' : 'text-emerald-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Throughput */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Real-Time Mirror Throughput (MB/s)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="throughput" stroke="#6366f1" fill="url(#colorThroughput)" name="Mirror Throughput" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IDS Alert Summary */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Threat Severity Distribution</h3>
          <div className="flex-1 space-y-6">
            {[
              { label: 'Critical (SQLi/XSS)', count: 12, color: 'bg-rose-500', percent: 15 },
              { label: 'High (Port Scanning)', count: 24, color: 'bg-amber-500', percent: 30 },
              { label: 'Medium (Anomaly)', count: 38, color: 'bg-indigo-500', percent: 45 },
              { label: 'Low (Policy)', count: 8, color: 'bg-slate-500', percent: 10 },
            ].map((node) => (
              <div key={node.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{node.label}</span>
                  <span className="text-slate-400">{node.count} Alerts</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${node.color}`} style={{ width: `${node.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-3">
            <AlertTriangle className="text-rose-400 shrink-0" size={18} />
            <p className="text-xs text-slate-400">Critical Alert: <span className="text-rose-400 font-bold">SQL Injection</span> pattern detected from mirrored stream <span className="text-indigo-400 font-bold">mir-8a2f1c</span>.</p>
          </div>
        </div>
      </div>

      {/* Mirror Sessions Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Active Mirroring Sessions</h3>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Manage All Policies</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Session ID</th>
                <th className="px-6 py-4 font-semibold">Source (VPC/NIC)</th>
                <th className="px-6 py-4 font-semibold">IDS Target</th>
                <th className="px-6 py-4 font-semibold">Mirror Rate</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { id: 'mir-7a12b5', source: 'vpc-prod-app (eth0)', target: 'ids-pool-us-east', rate: '425 MB/s', status: 'MIRRORING' },
                { id: 'mir-9c34d2', source: 'vpc-db-cluster (eth1)', target: 'ids-pool-us-west', rate: '120 MB/s', status: 'HEALTHY' },
                { id: 'mir-3e56f8', source: 'edge-gateway-eu', target: 'ids-edge-pcap', rate: '850 MB/s', status: 'FILTERING' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-medium text-indigo-400">{row.id}</span>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-400">{row.source}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.target}</td>
                  <td className="px-6 py-4 text-sm text-emerald-400 font-bold">{row.rate}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      row.status === 'MIRRORING' ? 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10' : 
                      'text-emerald-400 border-emerald-500/20 bg-emerald-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MirrorDashboard;
