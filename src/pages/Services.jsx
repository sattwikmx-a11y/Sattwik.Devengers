import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FileText, IndianRupee, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

const Services = () => {
  const [step, setStep] = useState(1);
  const [filters, setFilters] = useState({
    occupation: '',
    income: '',
    category: ''
  });
  
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);
  const handleFind = () => setShowResults(true);

  // Mock Schemes Database
  const schemes = [
    { name: 'PM Kisan Samman Nidhi', desc: '₹6,000 per year income support for landholding farmers.', icon: <IndianRupee />, tag: 'Farmer' },
    { name: 'Ayushman Bharat', desc: 'Health insurance coverage up to ₹5 Lakhs per family.', icon: <Briefcase />, tag: 'Healthcare' },
    { name: 'PM Vidyalakshmi', desc: 'Education loan scheme for higher studies.', icon: <GraduationCap />, tag: 'Student' }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Smart <span className="text-gradient">Scheme Finder</span></h1>
        <p className="text-muted max-w-2xl mx-auto">Discover government schemes you are eligible for using our AI matching system.</p>
      </div>

      {!showResults ? (
        <div className="glass-panel p-8 max-w-2xl mx-auto w-full relative overflow-hidden">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-white/10'}`}></div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2"><Briefcase className="text-primary"/> What is your primary occupation?</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Student', 'Farmer', 'Self Employed', 'Salaried'].map(occ => (
                    <button 
                      key={occ}
                      onClick={() => setFilters({...filters, occupation: occ})}
                      className={`p-4 rounded-xl border transition-all ${filters.occupation === occ ? 'bg-primary/20 border-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
                <button onClick={handleNext} disabled={!filters.occupation} className="glow-button-primary mt-4 self-end flex items-center gap-2">Next <ArrowRight className="w-4 h-4" /></button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2"><IndianRupee className="text-accent"/> What is your annual family income?</h3>
                <div className="grid grid-cols-1 gap-4">
                  {['Less than ₹2.5 Lakhs', '₹2.5 Lakhs - ₹5 Lakhs', '₹5 Lakhs - ₹8 Lakhs', 'Above ₹8 Lakhs'].map(inc => (
                    <button 
                      key={inc}
                      onClick={() => setFilters({...filters, income: inc})}
                      className={`p-4 rounded-xl border transition-all ${filters.income === inc ? 'bg-accent/20 border-accent shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                    >
                      {inc}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-4">
                  <button onClick={handleBack} className="text-muted hover:text-white px-4">Back</button>
                  <button onClick={handleNext} disabled={!filters.income} className="glow-button-primary flex items-center gap-2">Next <ArrowRight className="w-4 h-4" /></button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-6">
                <h3 className="text-2xl font-semibold flex items-center gap-2"><Sparkles className="text-secondary"/> Almost done!</h3>
                <p className="text-muted mb-4">Click below to let Sattwik AI analyze your inputs and match you with the best government schemes and services.</p>
                
                <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-sm flex flex-col gap-2">
                  <p><span className="text-white/60">Occupation:</span> {filters.occupation}</p>
                  <p><span className="text-white/60">Income:</span> {filters.income}</p>
                </div>

                <div className="flex justify-between mt-4">
                  <button onClick={handleBack} className="text-muted hover:text-white px-4">Back</button>
                  <button onClick={handleFind} className="glow-button-primary bg-secondary hover:bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.6)] flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Find Schemes
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Sparkles className="text-accent" /> Recommended for You
            </h2>
            <button onClick={() => {setShowResults(false); setStep(1); setFilters({occupation:'', income:'', category:''});}} className="text-sm text-muted hover:text-white border border-white/20 px-4 py-2 rounded-lg">Start Over</button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schemes.map((scheme, idx) => (
              <div key={idx} className="glass-card p-6 flex flex-col justify-between h-full group">
                <div>
                  <div className="w-12 h-12 bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {scheme.icon}
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 bg-white/10 rounded text-muted uppercase tracking-wider">{scheme.tag}</span>
                  <h3 className="text-xl font-bold mt-3 mb-2">{scheme.name}</h3>
                  <p className="text-muted text-sm leading-relaxed">{scheme.desc}</p>
                </div>
                <button className="mt-6 w-full py-3 bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/50 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" /> Check Eligibility
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Services;
