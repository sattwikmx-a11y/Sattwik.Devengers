import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, CheckCircle2, Download, Bot } from 'lucide-react';

const DocumentAssistant = () => {
  const [selectedService, setSelectedService] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const services = [
    'Passport Application',
    'PAN Card',
    'Driving License',
    'Voter ID',
    'Birth Certificate',
    'Income Certificate'
  ];

  const handleGenerate = () => {
    if (!selectedService) return;
    setIsGenerating(true);
    setResult(null);

    // Simulate AI Generation
    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        title: selectedService,
        fee: selectedService === 'Passport Application' ? '₹1,500' : '₹200 - ₹500',
        time: selectedService === 'Passport Application' ? '15 - 30 Days' : '7 - 14 Days',
        required: [
          'Proof of Address (Aadhar, Utility Bill)',
          'Proof of Date of Birth (Birth Cert, 10th Marksheet)',
          'Identity Proof (Voter ID, PAN)',
          '3 Recent Passport Size Photographs'
        ],
        steps: [
          'Register on the official portal and fill the online form.',
          'Upload scanned copies of the required documents.',
          'Pay the required fee online.',
          'Book an appointment at the nearest verification center.'
        ]
      });
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Document <span className="text-secondary">Assistant</span></h1>
          <p className="text-muted">Select a government service and let our AI generate a complete document checklist and procedure guide instantly.</p>
        </div>

        <div className="glass-panel p-6 flex flex-col gap-5">
          <label className="text-sm font-semibold text-white/80">Select Government Service</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {services.map(service => (
              <button
                key={service}
                onClick={() => setSelectedService(service)}
                className={`p-3 rounded-lg border text-sm text-left transition-all ${
                  selectedService === service 
                    ? 'bg-secondary/20 border-secondary shadow-[0_0_10px_rgba(6,182,212,0.3)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                {service}
              </button>
            ))}
          </div>

          <button 
            onClick={handleGenerate} 
            disabled={!selectedService || isGenerating}
            className={`glow-button-primary mt-4 py-4 flex items-center justify-center gap-2 ${(!selectedService || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isGenerating ? (
              <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> AI is analyzing requirements...</>
            ) : (
              <><FileSearch className="w-5 h-5" /> Generate Checklist</>
            )}
          </button>
        </div>
      </div>

      <div>
        <AnimatePresence mode="wait">
          {!result && !isGenerating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[400px] glass-panel flex flex-col items-center justify-center text-muted p-8 text-center border-dashed">
              <Bot className="w-16 h-16 mb-4 opacity-50" />
              <p>Waiting for input. The AI will generate official requirements here.</p>
            </motion.div>
          )}

          {isGenerating && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full min-h-[400px] glass-panel flex flex-col items-center justify-center p-8 text-center">
              <div className="relative w-24 h-24 mb-6">
                <div className="absolute inset-0 border-4 border-secondary/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                <Bot className="w-8 h-8 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <h3 className="font-semibold text-lg">Cross-referencing Official Portals...</h3>
              <p className="text-sm text-muted mt-2">Extracting latest document rules.</p>
            </motion.div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full blur-2xl"></div>
              
              <div className="flex items-start justify-between mb-8">
                <div>
                  <span className="text-xs font-semibold px-2 py-1 bg-secondary/20 text-secondary rounded uppercase tracking-wider mb-2 block w-fit">AI Generated</span>
                  <h2 className="text-2xl font-bold">{result.title} Requirements</h2>
                </div>
                <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors tooltip relative group" aria-label="Download PDF">
                  <Download className="w-5 h-5 text-muted group-hover:text-white" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-[#09090B]/50 rounded-xl border border-white/5">
                  <p className="text-xs text-muted mb-1">Est. Processing Time</p>
                  <p className="font-semibold text-lg">{result.time}</p>
                </div>
                <div className="p-4 bg-[#09090B]/50 rounded-xl border border-white/5">
                  <p className="text-xs text-muted mb-1">Govt. Fees</p>
                  <p className="font-semibold text-lg">{result.fee}</p>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-4 border-b border-white/10 pb-2">Mandatory Documents</h3>
                <ul className="flex flex-col gap-3">
                  {result.required.map((doc, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 border-b border-white/10 pb-2">Application Procedure</h3>
                <ol className="flex flex-col gap-4 list-decimal list-inside text-sm text-white/80">
                  {result.steps.map((step, i) => (
                    <li key={i} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DocumentAssistant;
