import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, FileSearch, ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ComplaintTracker = () => {
  const { complaints } = useAppContext();

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Submitted': return <FileSearch className="w-5 h-5 text-secondary" />;
      case 'In Progress': return <Clock className="w-5 h-5 text-warning" />;
      case 'Resolved': return <CheckCircle2 className="w-5 h-5 text-accent" />;
      default: return <AlertCircle className="w-5 h-5 text-muted" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Submitted': return 'border-secondary/30 bg-secondary/10 text-secondary';
      case 'In Progress': return 'border-warning/30 bg-warning/10 text-warning';
      case 'Resolved': return 'border-accent/30 bg-accent/10 text-accent';
      default: return 'border-white/10 bg-white/5 text-muted';
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Complaint <span className="text-secondary">Tracker</span></h1>
        <p className="text-muted">Track the status of your reported civic issues and road safety hazards in real-time.</p>
      </div>

      <div className="flex flex-col gap-6">
        {complaints.length === 0 ? (
          <div className="glass-panel p-12 text-center flex flex-col items-center justify-center gap-4 text-muted">
            <FileSearch className="w-12 h-12 opacity-50" />
            <p>No complaints reported yet.</p>
          </div>
        ) : (
          complaints.map((complaint, idx) => (
            <motion.div 
              key={complaint.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-6 overflow-hidden relative"
            >
              {/* Dynamic glowing border based on status */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(complaint.status).split(' ')[0].replace('border', 'bg')}`}></div>
              
              <div className="flex flex-col md:flex-row justify-between gap-6">
                
                {/* Info */}
                <div className="flex-1 flex flex-col gap-3 pl-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-sm px-2 py-1 bg-white/5 rounded text-white/70 border border-white/10">{complaint.id}</span>
                    <span className="font-semibold text-lg">{complaint.category}</span>
                    <span className="text-xs text-muted">{complaint.date}</span>
                  </div>
                  
                  <p className="text-sm text-white/80 leading-relaxed">{complaint.description}</p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 w-fit">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                      <span className="text-xs font-medium text-primary">AI Insights</span>
                    </div>
                    <span className="text-xs text-white/70 italic">{complaint.aiAnalysis}</span>
                  </div>
                </div>

                {/* Status Timeline */}
                <div className="md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                  <div className="flex flex-col gap-4 relative">
                    {/* Vertical line connector */}
                    <div className="absolute left-2.5 top-3 bottom-3 w-px bg-white/10 z-0"></div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${complaint.status === 'Submitted' ? 'bg-secondary text-[#09090B]' : 'bg-white/20'}`}>
                        {complaint.status === 'Submitted' ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>}
                      </div>
                      <span className={`text-sm ${complaint.status === 'Submitted' ? 'text-white font-medium' : 'text-muted'}`}>Submitted</span>
                    </div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${complaint.status === 'In Progress' ? 'bg-warning text-[#09090B]' : 'bg-white/20'}`}>
                        {complaint.status === 'In Progress' ? <Clock className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>}
                      </div>
                      <span className={`text-sm ${complaint.status === 'In Progress' ? 'text-white font-medium' : 'text-muted'}`}>In Progress</span>
                    </div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${complaint.status === 'Resolved' ? 'bg-accent text-[#09090B]' : 'bg-white/20'}`}>
                        {complaint.status === 'Resolved' ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>}
                      </div>
                      <span className={`text-sm ${complaint.status === 'Resolved' ? 'text-white font-medium' : 'text-muted'}`}>Resolved</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ComplaintTracker;
