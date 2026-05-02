import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MirrorDashboard from './pages/MirrorDashboard';

const Placeholder = ({ name }: { name: string }) => (
  <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-center">
    <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
    <p className="text-slate-400 max-w-md mx-auto">The traffic mirroring engine is currently synchronizing global packet streams and IDS detection signatures. This module will be available shortly.</p>
  </div>
);

function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<MirrorDashboard />} />
          <Route path="/streams" element={<Placeholder name="Real-Time Traffic Streams" />} />
          <Route path="/alerts" element={<Placeholder name="IDS Threat Alert Hub" />} />
          <Route path="/analysis" element={<Placeholder name="Forensic Packet Analysis" />} />
          <Route path="/policies" element={<Placeholder name="Mirroring Policy Governance" />} />
          <Route path="/forensics" element={<Placeholder name="Historical Network Forensics" />} />
          <Route path="/metrics" element={<Placeholder name="IDS Node Performance Metrics" />} />
          <Route path="/settings" element={<Placeholder name="Engine Configuration" />} />
        </Routes>
      </DashboardLayout>
    </Router>
  );
}

export default App;
