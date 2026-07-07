import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, AlertTriangle, Layers } from 'lucide-react';

const hotspots = [
  { name: "New Delhi", x: 44, y: 28, issues: 420, severity: 'medium' },
  { name: "Mumbai", x: 34, y: 55, issues: 850, severity: 'high' },
  { name: "Bengaluru", x: 42, y: 72, issues: 1200, severity: 'critical' },
  { name: "Kolkata", x: 73, y: 42, issues: 310, severity: 'low' },
  { name: "Chennai", x: 48, y: 75, issues: 540, severity: 'medium' },
  { name: "Hyderabad", x: 44, y: 63, issues: 390, severity: 'medium' },
  { name: "Pune", x: 37, y: 57, issues: 270, severity: 'low' },
  { name: "Ahmedabad", x: 30, y: 43, issues: 310, severity: 'medium' },
];

const severityColor = {
  low: { ring: 'rgba(16,185,129,0.6)', dot: '#10B981', glow: 'rgba(16,185,129,0.3)' },
  medium: { ring: 'rgba(245,158,11,0.6)', dot: '#F59E0B', glow: 'rgba(245,158,11,0.3)' },
  high: { ring: 'rgba(239,68,68,0.6)', dot: '#EF4444', glow: 'rgba(239,68,68,0.3)' },
  critical: { ring: 'rgba(239,68,68,0.9)', dot: '#EF4444', glow: 'rgba(239,68,68,0.5)' },
};

const IssueMap = () => {
  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Interactive <span className="text-accent">Civic Map</span></h1>
        <p className="text-muted">Real-time geospatial visualization of reported civic and road safety hazards across India.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Map Panel */}
        <div className="lg:col-span-3 glass-panel p-6 relative overflow-hidden" style={{ minHeight: '520px' }}>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2 text-white">
              <Navigation className="w-4 h-4 text-primary" /> Live Heatmap — India
            </h3>
            <div className="flex items-center gap-2 text-xs text-accent">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse inline-block"></span>
              Live Feed Active
            </div>
          </div>

          {/* India Map SVG */}
          <div className="relative w-full" style={{ height: '420px' }}>
            {/* Grid lines for effect */}
            <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3B82F6" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* India outline (simplified SVG path) */}
            <svg
              viewBox="0 0 200 220"
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M60,10 L80,8 L100,12 L120,10 L140,20 L155,35 L160,55 L150,75 L155,90 L145,105 L140,125 L130,140 L120,155 L110,165 L105,178 L100,195 L95,178 L90,165 L80,155 L70,140 L60,125 L50,110 L40,95 L35,75 L30,55 L40,35 L50,20 Z"
                fill="rgba(59,130,246,0.08)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* State borders simplified */}
              <line x1="60" y1="80" x2="140" y2="80" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="60" y1="120" x2="140" y2="120" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="95" y1="10" x2="95" y2="195" stroke="rgba(59,130,246,0.15)" strokeWidth="0.5" strokeDasharray="3,3" />
            </svg>

            {/* Hotspot markers */}
            {hotspots.map((spot, i) => {
              const colors = severityColor[spot.severity];
              const size = spot.severity === 'critical' ? 14 : spot.severity === 'high' ? 11 : spot.severity === 'medium' ? 9 : 7;
              return (
                <motion.div
                  key={spot.name}
                  className="absolute cursor-pointer"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1, type: 'spring' }}
                  onMouseEnter={() => setTooltip(spot)}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {/* Pulse ring */}
                  <motion.div
                    className="absolute rounded-full"
                    style={{
                      width: size * 3,
                      height: size * 3,
                      background: colors.glow,
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: i * 0.3 }}
                  />
                  {/* Dot */}
                  <div
                    className="rounded-full border-2 border-white/40 shadow-lg relative z-10"
                    style={{
                      width: size,
                      height: size,
                      background: colors.dot,
                      boxShadow: `0 0 10px ${colors.glow}`,
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Tooltip */}
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-20 glass-panel px-4 py-3 text-sm border-white/20 pointer-events-none"
                style={{ left: `${tooltip.x}%`, top: `calc(${tooltip.y}% - 70px)`, transform: 'translateX(-50%)' }}
              >
                <p className="font-bold text-white">{tooltip.name}</p>
                <p className="text-muted text-xs mt-1">
                  <span className="font-semibold text-white">{tooltip.issues.toLocaleString()}</span> active reports
                </p>
                <span className={`text-xs uppercase font-bold tracking-wider ${
                  tooltip.severity === 'critical' || tooltip.severity === 'high' ? 'text-error' : 
                  tooltip.severity === 'medium' ? 'text-warning' : 'text-accent'
                }`}>{tooltip.severity} severity</span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <div className="glass-panel p-4">
            <h4 className="font-semibold text-sm mb-3 text-white/80 uppercase tracking-wider">Legend</h4>
            <div className="flex flex-col gap-3">
              {Object.entries(severityColor).map(([level, colors]) => (
                <div key={level} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: colors.dot, boxShadow: `0 0 6px ${colors.glow}` }} />
                  <span className="text-sm capitalize text-white/70">{level}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-4 flex flex-col gap-3">
            <h4 className="font-semibold text-sm mb-1 text-white/80 uppercase tracking-wider">Top Hotspots</h4>
            {hotspots.sort((a, b) => b.issues - a.issues).slice(0, 5).map((spot, i) => (
              <div key={spot.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted">{i + 1}.</span>
                  <span className="text-sm">{spot.name}</span>
                </div>
                <span className="text-xs font-mono font-bold text-white/60">{spot.issues.toLocaleString()}</span>
              </div>
            ))}
          </div>

          <div className="glass-panel p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-warning" />
              <h4 className="font-semibold text-sm text-white/80">AI Alert</h4>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Bengaluru shows a <span className="text-error font-semibold">136% spike</span> in road safety reports this week. Pothole density is critically high on Outer Ring Road.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueMap;
