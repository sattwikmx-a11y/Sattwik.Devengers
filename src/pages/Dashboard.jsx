import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Dashboard = () => {
  const { complaints } = useAppContext();

  // Mock data for weekly trends
  const weeklyData = [
    { name: 'Mon', reports: 12, resolved: 8 },
    { name: 'Tue', reports: 19, resolved: 15 },
    { name: 'Wed', reports: 15, resolved: 10 },
    { name: 'Thu', reports: 22, resolved: 18 },
    { name: 'Fri', reports: 28, resolved: 20 },
    { name: 'Sat', reports: 35, resolved: 25 },
    { name: 'Sun', reports: 20, resolved: 22 },
  ];

  const categoryData = [
    { name: 'Roads', value: 45 },
    { name: 'Water', value: 25 },
    { name: 'Power', value: 15 },
    { name: 'Waste', value: 10 },
    { name: 'Other', value: 5 },
  ];

  const StatCard = ({ title, value, icon: Icon, colorClass }) => (
    <div className={`glass-card p-6 flex items-center justify-between border-l-4 ${colorClass}`}>
      <div>
        <p className="text-muted text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  );

  const totalReports = 1256 + complaints.length;
  const resolved = 984 + complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">AI <span className="text-primary">Dashboard</span></h1>
        <p className="text-muted">Real-time civic analytics and resolution metrics across regions.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Complaints" value={totalReports.toLocaleString()} icon={AlertTriangle} colorClass="border-l-primary text-primary" />
        <StatCard title="Issues Resolved" value={resolved.toLocaleString()} icon={CheckCircle2} colorClass="border-l-accent text-accent" />
        <StatCard title="Active Users" value="45.2k" icon={Users} colorClass="border-l-secondary text-secondary" />
        <StatCard title="Avg. Resolution" value="3.2 Days" icon={Activity} colorClass="border-l-warning text-warning" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        {/* Main Line Chart */}
        <div className="lg:col-span-2 glass-panel p-6 flex flex-col">
          <h3 className="font-semibold mb-6">Weekly Report vs Resolution Trend</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="reports" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorReports)" />
                <Area type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorResolved)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="glass-panel p-6 flex flex-col">
          <h3 className="font-semibold mb-6">Issues by Category</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#A1A1AA" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: '#09090B', borderColor: 'rgba(255,255,255,0.2)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" fill="#06B6D4" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;
