import React, { useState, useEffect } from 'react';
import AdaptiveMobilityDashboard from './AdaptiveMobilityDashboard';

export default function TemplateSelector() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [teamName, setTeamName] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (selectedTemplate) {
    return <AdaptiveMobilityDashboard />;
  }

  const templates = [
    {
      id: 'advanced',
      name: 'Advanced Pro',
      subtitle: 'Enterprise Grade',
      description: 'Full-featured dashboard with sensors, LIDAR, advanced metrics for maximum control',
      icon: '⚡',
      features: ['LIDAR visualization', 'IMU data', 'Real-time metrics', 'Advanced controls', 'Sensor fusion'],
      color: 'from-cyan-600 via-blue-600 to-indigo-600',
      accentColor: 'cyan',
      badge: 'Most Popular'
    },
    {
      id: 'medical',
      name: 'Medical Focus',
      subtitle: 'Healthcare',
      description: 'Specialized for hospital and medical facility navigation with patient safety protocols',
      icon: '🏥',
      features: ['Patient safety', 'Sterile protocols', 'Emergency routes', 'Zone management', 'Compliance'],
      color: 'from-blue-600 via-indigo-600 to-purple-600',
      accentColor: 'blue',
      badge: 'For Hospitals'
    },
    {
      id: 'industrial',
      name: 'Industrial Mode',
      subtitle: 'Manufacturing',
      description: 'Heavy-duty for factory and industrial environments with hazard detection',
      icon: '🏭',
      features: ['Hazard detection', 'Equipment tracking', 'Safety zones', 'Alert system', 'Compliance'],
      color: 'from-red-600 via-orange-600 to-yellow-600',
      accentColor: 'red',
      badge: 'For Factories'
    },
    {
      id: 'retail',
      name: 'Retail Assistant',
      subtitle: 'Commerce',
      description: 'Customer assistance in supermarkets and retail stores with crowd detection',
      icon: '🛒',
      features: ['Product location', 'Aisle navigation', 'Crowd detection', 'Shopping assist', 'Analytics'],
      color: 'from-orange-600 via-yellow-600 to-amber-600',
      accentColor: 'orange',
      badge: 'For Stores'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      subtitle: 'Lightweight',
      description: 'Simple, lightweight interface for basic navigation on any platform',
      icon: '✨',
      features: ['Essential controls', 'Fast rendering', 'Mobile-friendly', 'Minimal UI', 'Optimal performance'],
      color: 'from-green-600 via-emerald-600 to-teal-600',
      accentColor: 'green',
      badge: 'Fastest'
    },
    {
      id: 'home',
      name: 'Home Helper',
      subtitle: 'Residential',
      description: 'Personal assistance in home environments with comfort-focused features',
      icon: '🏠',
      features: ['Room navigation', 'Task assistance', 'Comfort mode', 'Personal routes', 'Voice control'],
      color: 'from-emerald-600 via-green-600 to-teal-600',
      accentColor: 'emerald',
      badge: 'For Homes'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        
        {/* Animated Blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-4000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        {/* Cursor Glow Effect */}
        <div
          className="fixed w-96 h-96 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mix-blend-screen filter blur-3xl opacity-0 pointer-events-none"
          style={{
            left: mousePos.x - 192,
            top: mousePos.y - 192,
            transition: 'opacity 0.3s ease',
            opacity: hoveredTemplate ? 0.1 : 0
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center pt-20 pb-32 px-4">
          {/* Animated Title */}
          <div className="mb-8 space-y-4">
            <div className="inline-block">
              <div className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-pulse">
                🤖
              </div>
            </div>
            <h1 className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300">
              Adaptive Mobility AI
            </h1>
            <p className="text-2xl text-gray-300 font-light tracking-widest">
              SELECT YOUR DASHBOARD EXPERIENCE
            </p>
          </div>

          {/* Subtitle with animated line */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-0.5 w-12 bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <p className="text-gray-400 text-lg">Choose the perfect interface for your team</p>
            <div className="h-0.5 w-12 bg-gradient-to-l from-purple-500 to-transparent"></div>
          </div>
        </div>

        {/* Team Input */}
        <div className="max-w-3xl mx-auto px-4 mb-20">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative bg-slate-900 rounded-xl p-8 border border-slate-800">
              <label className="block text-sm font-bold mb-3 text-cyan-400 tracking-widest">
                👥 YOUR TEAM NAME
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter team name..."
                className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none transition text-lg font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="max-w-7xl mx-auto px-4 mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <button
                key={template.id}
                onMouseEnter={() => setHoveredTemplate(template.id)}
                onMouseLeave={() => setHoveredTemplate(null)}
                onClick={() => setSelectedTemplate(template.id)}
                className="group relative h-96 text-left transition-all duration-300 transform hover:scale-105"
              >
                {/* Glowing Border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${template.color} rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500`}></div>

                {/* Card Content */}
                <div className="relative bg-slate-900 rounded-2xl p-8 h-full border border-slate-800 overflow-hidden flex flex-col">
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition"></div>

                  {/* Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${template.color}`}>
                    {template.badge}
                  </div>

                  {/* Icon */}
                  <div className="text-6xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition duration-300">
                    {template.icon}
                  </div>

                  {/* Title Section */}
                  <div className="mb-auto">
                    <h2 className={`text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r ${template.color} mb-1`}>
                      {template.name}
                    </h2>
                    <p className="text-sm text-gray-400 font-semibold tracking-widest">
                      {template.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="mt-6 space-y-2">
                      {template.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-gray-300 group-hover:text-white transition">
                          <span className={`w-1.5 h-1.5 bg-${template.accentColor}-400 rounded-full`}></span>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <div className={`w-full mt-6 py-3 rounded-lg font-bold text-white bg-gradient-to-r ${template.color} group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition duration-300 text-center`}>
                    Launch {template.name}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Teams Active', value: '2.5K+', icon: '👥' },
              { label: 'Environments', value: '6', icon: '🌍' },
              { label: 'AI Accuracy', value: '98.5%', icon: '🎯' },
              { label: 'Response Time', value: '<50ms', icon: '⚡' }
            ].map((stat, i) => (
              <div key={i} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative bg-slate-900 rounded-lg p-6 border border-slate-800 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-2 font-semibold">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 py-12 px-4 text-center">
          <p className="text-gray-400 mb-2">🚀 Smart India Hackathon 2026</p>
          <p className="text-sm text-gray-500">Adaptive Mobility AI | Problem Statement 26215</p>
          <p className="text-xs text-gray-600 mt-4">Enterprise-Grade Autonomous Navigation System</p>
        </div>
      </div>
    </div>
  );
}