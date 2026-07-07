import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, AlertTriangle, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

const ReportIssue = () => {
  const { addComplaint } = useAppContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    priority: 'Normal'
  });
  const [location, setLocation] = useState('Detecting...');
  const [submitted, setSubmitted] = useState(false);

  // Simulated GPS detection
  const detectLocation = () => {
    setLocation('Locating...');
    setTimeout(() => {
      setLocation('12.9716° N, 77.5946° E (MG Road)');
    }, 1500);
  };

  const categories = [
    'Pothole', 'Broken Streetlight', 'Water Logging', 
    'Traffic Signal Failure', 'Accident Hazard', 'Illegal Parking'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addComplaint({
      ...formData,
      location: location === 'Detecting...' ? 'Unknown Location' : location
    });
    setSubmitted(true);
    setTimeout(() => {
      navigate('/tracker');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 bg-accent/20 rounded-full flex items-center justify-center border-2 border-accent"
        >
          <Send className="w-10 h-10 text-accent" />
        </motion.div>
        <h2 className="text-3xl font-bold">Issue Reported Successfully!</h2>
        <p className="text-muted max-w-md">Our AI has analyzed your report and forwarded it to the relevant department. Redirecting to tracker...</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
      {/* Form Section */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Report a <span className="text-primary">Civic Issue</span></h1>
          <p className="text-muted">Help us maintain road safety by reporting infrastructure issues instantly.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel p-6 flex flex-col gap-5">
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/80">Issue Category</label>
            <select 
              required
              className="bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="" disabled className="bg-[#09090B]">Select a category</option>
              {categories.map(cat => <option key={cat} value={cat} className="bg-[#09090B]">{cat}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white/80">Description</label>
            <textarea 
              required
              rows="4"
              placeholder="Describe the issue in detail..."
              className="bg-white/5 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-primary resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="glass-card p-4 flex flex-col items-center justify-center gap-2 text-muted hover:text-white border-dashed">
              <Camera className="w-6 h-6" />
              <span className="text-sm">Upload Photo</span>
            </button>
            <button type="button" onClick={detectLocation} className="glass-card p-4 flex flex-col items-center justify-center gap-2 text-primary hover:text-blue-400 border-primary/30">
              <MapPin className="w-6 h-6" />
              <span className="text-sm">Use Current Location</span>
            </button>
          </div>

          {location !== 'Detecting...' && (
            <div className="text-xs text-accent bg-accent/10 p-2 rounded flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Location set: {location}
            </div>
          )}

          <button type="submit" className="glow-button-primary mt-4 flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Submit Report
          </button>
        </form>
      </motion.div>

      {/* Simulated Map / AI Vision Section */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="hidden lg:block relative">
        <div className="sticky top-32 glass-panel h-[600px] overflow-hidden p-2 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <span className="font-semibold text-sm">Sattwik AI Vision Mapping</span>
            <span className="flex items-center gap-2 text-xs text-accent"><span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span> Live Sync</span>
          </div>
          
          <div className="flex-1 relative bg-[#0f172a] rounded-b-xl overflow-hidden mt-2">
            {/* Simulated Map Background (Grid) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            {/* Animated Scanning Line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-1 bg-primary/50 blur-sm z-10"
            ></motion.div>

            {/* Simulated User Location blip */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
               <div className="w-4 h-4 bg-primary rounded-full relative z-20">
                 <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
               </div>
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-black/80 px-2 py-1 rounded text-[10px] whitespace-nowrap text-white/90">
                 You are here
               </div>
            </div>

            {/* Simulated existing hazards */}
            <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-warning rounded-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></div>
            <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-error rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ReportIssue;
