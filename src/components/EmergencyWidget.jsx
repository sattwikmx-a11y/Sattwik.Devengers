import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ShieldAlert, Ambulance, Flame, X, Info } from 'lucide-react';

const EmergencyWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Police / Traffic', number: '100 / 103', icon: <ShieldAlert className="w-5 h-5 text-primary" />, color: 'border-primary/30 hover:bg-primary/10' },
    { name: 'Ambulance', number: '108', icon: <Ambulance className="w-5 h-5 text-error" />, color: 'border-error/30 hover:bg-error/10' },
    { name: 'Fire Rescue', number: '101', icon: <Flame className="w-5 h-5 text-warning" />, color: 'border-warning/30 hover:bg-warning/10' },
    { name: 'Roadside Assist', number: '1033', icon: <Info className="w-5 h-5 text-secondary" />, color: 'border-secondary/30 hover:bg-secondary/10' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-72 glass-panel p-4 mb-4 shadow-2xl border-error/30"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
              <h3 className="font-bold text-error flex items-center gap-2">
                <ShieldAlert className="w-4 h-4" /> Emergency Contacts
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-col gap-2">
              {emergencyContacts.map((contact, idx) => (
                <a 
                  key={idx} 
                  href={`tel:${contact.number.split(' / ')[0]}`}
                  className={`flex items-center justify-between p-3 rounded-xl border bg-white/5 transition-colors cursor-pointer ${contact.color}`}
                >
                  <div className="flex items-center gap-3">
                    {contact.icon}
                    <span className="font-medium text-sm">{contact.name}</span>
                  </div>
                  <span className="font-bold font-mono text-white/90">{contact.number}</span>
                </a>
              ))}
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-error/10 border border-error/20 text-xs text-error/90 text-center">
              Tap any number to call immediately. Use only in real emergencies.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-error text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
        aria-label="Emergency Services"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Phone className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default EmergencyWidget;
