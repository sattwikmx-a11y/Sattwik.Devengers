import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import { AppProvider } from './context/AppContext';
import AIAssistant from './pages/AIAssistant';
import ReportIssue from './pages/ReportIssue';
import ComplaintTracker from './pages/ComplaintTracker';
import Services from './pages/Services';
import Dashboard from './pages/Dashboard';
import IssueMap from './pages/IssueMap';
import DocumentAssistant from './pages/DocumentAssistant';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="assistant" element={<AIAssistant />} />
            <Route path="services" element={<Services />} />
            <Route path="report" element={<ReportIssue />} />
            <Route path="tracker" element={<ComplaintTracker />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="map" element={<IssueMap />} />
            <Route path="documents" element={<DocumentAssistant />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
