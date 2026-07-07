import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col gap-24">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel w-fit border-primary/30">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-sm font-medium text-white/90">Sattwik AI v2.0 is now live</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Your Personal <br />
              <span className="text-gradient">AI Civic Companion</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted max-w-xl leading-relaxed">
              Report civic issues, discover government services, understand official procedures, and stay informed—all through one intelligent AI assistant.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link to="/assistant" className="glow-button-primary flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Start Chat
              </Link>
              <Link to="/services" className="glow-button-secondary flex items-center gap-2">
                Explore Services
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Content - AI Orb */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] flex items-center justify-center"
          >
            {/* The Orb */}
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Outer glow rings */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary/20 border-t-primary/60 border-l-secondary/60"
              ></motion.div>
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-secondary/20 border-b-accent/60 border-r-primary/60"
              ></motion.div>
              
              {/* Core */}
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-8 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-xl"
              ></motion.div>
              
              <div className="absolute inset-12 rounded-full glass-panel border-white/20 flex items-center justify-center backdrop-blur-2xl overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.3)]">
                {/* Simulated AI activity */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full bg-primary/30 blur-2xl"
                ></motion.div>
                <motion.div 
                  animate={{ 
                    x: [0, 15, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute w-20 h-20 rounded-full bg-accent/30 blur-xl"
                ></motion.div>
                
                <Shield className="w-16 h-16 text-white/90 relative z-10" />
              </div>
            </div>
            
            {/* Floating Particles/Elements */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 glass-panel px-4 py-2 rounded-xl flex items-center gap-3 border-primary/30"
            >
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-xs font-medium">System Online</span>
            </motion.div>
            
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-20 left-0 glass-panel px-4 py-3 rounded-xl flex items-center gap-3 border-secondary/30"
            >
              <MessageSquare className="w-4 h-4 text-secondary" />
              <span className="text-xs font-medium text-white/80">"How do I apply for a PAN Card?"</span>
            </motion.div>
          </motion.div>

        </div>
      </section>
      
      {/* Quick Stats or Features could go here */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Smart Services', desc: 'Find and apply for government schemes instantly with AI guidance.' },
          { title: 'Civic Reporting', desc: 'Snap a picture and let AI categorize and route your civic issues.' },
          { title: 'Multilingual Support', desc: 'Interact seamlessly in 10+ Indian languages with auto-translation.' }
        ].map((feature, idx) => (
          <div key={idx} className="glass-card p-6 flex flex-col gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mb-2">
              {idx + 1}
            </div>
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
