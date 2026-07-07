import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Pre-populate some mock complaints for demonstration
  const [complaints, setComplaints] = useState([
    {
      id: 'C-2023-8891',
      category: 'Pothole',
      description: 'Massive pothole on Main Street causing traffic slowdowns and potential vehicle damage.',
      location: '12.9716° N, 77.5946° E',
      status: 'In Progress',
      date: new Date(Date.now() - 86400000).toLocaleDateString(),
      aiAnalysis: 'High Priority. Potential hazard for 2-wheelers. Forwarded to Road Maintenance Dept.'
    }
  ]);

  const addComplaint = (newComplaint) => {
    const aiAnalysis = newComplaint.category === 'Pothole' 
      ? 'High Priority. Routed to Road & Highways Dept.' 
      : 'Moderate Priority. Logged for verification.';
      
    setComplaints(prev => [{
      id: `C-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Submitted',
      date: new Date().toLocaleDateString(),
      aiAnalysis,
      ...newComplaint
    }, ...prev]);
  };

  return (
    <AppContext.Provider value={{ complaints, addComplaint }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
