import React, { useState, useRef, useEffect } from 'react';

export default function AdaptiveMobilityDashboard() {
  const [mode, setMode] = useState('hospital');
  const [isNavigating, setIsNavigating] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [destination, setDestination] = useState('Room 101');
  const [robotPos, setRobotPos] = useState({ x: 250, y: 150 });
  const [targetPos, setTargetPos] = useState({ x: 380, y: 220 });
  const [obstacles, setObstacles] = useState([
    { id: 1, x: 120, y: 80, type: 'person', threat: 'high' },
    { id: 2, x: 200, y: 150, type: 'obstacle', threat: 'medium' },
    { id: 3, x: 280, y: 100, type: 'door', threat: 'low' },
  ]);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [detections, setDetections] = useState([]);
  const [waveform, setWaveform] = useState(Array(40).fill(0));
  const [pathHistory, setPathHistory] = useState([]);
  const [particles, setParticles] = useState([]);
  const [heatmap, setHeatmap] = useState(Array(10).fill(0).map(() => Array(10).fill(0)));
  const [stats, setStats] = useState({
    yolo: 94.2,
    whisper: 98.5,
    distance: 45.2,
    safetyScore: 100,
    obstacleCount: 3,
    fps: 60,
    latency: 12.5,
    confidence: 0.92
  });
  const [sensorData, setSensorData] = useState({
    lidar: Array(12).fill(Math.random() * 100),
    camera: { resolution: '1920x1080', fps: 30 },
    imu: { accel: 2.3, gyro: 1.2 }
  });
  const [selectedObject, setSelectedObject] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);

  const modes = {
    hospital: {
      label: '🏥 Hospital',
      color: 'from-blue-500 to-blue-600',
      priorities: ['Safety', 'Sterile', 'Emergency'],
      speed: 0.3,
      maxSpeed: 1.0
    },
    supermarket: {
      label: '🛒 Supermarket',
      color: 'from-orange-500 to-orange-600',
      priorities: ['Navigation', 'Efficiency', 'Crowd'],
      speed: 0.7,
      maxSpeed: 2.0
    },
    industry: {
      label: '🏭 Industry',
      color: 'from-red-500 to-red-600',
      priorities: ['Hazard', 'Safety', 'Precision'],
      speed: 0.2,
      maxSpeed: 0.8
    },
    home: {
      label: '🏠 Home',
      color: 'from-green-500 to-green-600',
      priorities: ['Comfort', 'Assistance', 'Safety'],
      speed: 0.5,
      maxSpeed: 1.5
    }
  };

  // Animate waveform for voice
  useEffect(() => {
    if (!isListening) return;
    const interval = setInterval(() => {
      setWaveform(prev => [
        ...prev.slice(1),
        Math.random() * 100
      ]);
    }, 50);
    return () => clearInterval(interval);
  }, [isListening]);

  // Real-time stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        yolo: Math.min(99.9, prev.yolo + (Math.random() - 0.5) * 2),
        whisper: Math.min(99.9, prev.whisper + (Math.random() - 0.5) * 1),
        safetyScore: Math.max(50, Math.min(100, prev.safetyScore + (Math.random() - 0.5) * 3)),
        latency: Math.max(5, prev.latency + (Math.random() - 0.5) * 4)
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Robot navigation animation
  useEffect(() => {
    if (!isNavigating) return;

    const interval = setInterval(() => {
      setRobotPos(prev => {
        const dx = targetPos.x - prev.x;
        const dy = targetPos.y - prev.y;
        const distance = Math.hypot(dx, dy);
        
        if (distance < 5) {
          setIsNavigating(false);
          return prev;
        }

        const speed = modes[mode].speed;
        return {
          x: prev.x + (dx / distance) * speed,
          y: prev.y + (dy / distance) * speed
        };
      });

      setPathHistory(prev => [...prev, robotPos]);

      // Particle effect
      if (Math.random() > 0.7) {
        const newParticle = {
          id: Date.now(),
          x: robotPos.x + (Math.random() - 0.5) * 20,
          y: robotPos.y + (Math.random() - 0.5) * 20,
          life: 1.0
        };
        setParticles(prev => [...prev.slice(-20), newParticle]);
      }

      setStats(prev => ({
        ...prev,
        distance: Math.max(0, prev.distance - 0.2)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [isNavigating, robotPos, targetPos, mode]);

  // Object detection simulation
  useEffect(() => {
    if (!isNavigating) return;
    const interval = setInterval(() => {
      const randomObj = obstacles[Math.floor(Math.random() * obstacles.length)];
      const detection = {
        id: Date.now(),
        ...randomObj,
        confidence: (Math.random() * 0.15 + 0.85),
        distance: Math.hypot(randomObj.x - robotPos.x, randomObj.y - robotPos.y)
      };
      setDetections(prev => [...prev.slice(-5), detection]);

      // Update heatmap based on detection
      const gridX = Math.floor((randomObj.x / 520) * 10);
      const gridY = Math.floor((randomObj.y / 320) * 10);
      setHeatmap(prev => {
        const newMap = prev.map(row => [...row]);
        if (gridX < 10 && gridY < 10) {
          newMap[gridY][gridX] = Math.min(100, newMap[gridY][gridX] + 20);
        }
        return newMap;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isNavigating, robotPos, obstacles]);

  // Voice command handler
  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    if (isListening) {
      setTimeout(() => {
        const commands = [
          { text: 'Emergency room', dest: 'Emergency Room' },
          { text: 'Pharmacy', dest: 'Pharmacy' },
          { text: 'Exit route', dest: 'Exit' },
          { text: 'Entrance area', dest: 'Entrance' }
        ];
        const cmd = commands[Math.floor(Math.random() * commands.length)];
        setVoiceCommand(cmd.text);
        setDestination(cmd.dest);
        setIsListening(false);
      }, 2000);
    }
  };

  // Canvas click to set destination
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTargetPos({ x, y });
    setDestination(`Location (${x}, ${y})`);
    setIsNavigating(true);
    setPathHistory([robotPos]);
  };

  // Draw main canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Heatmap visualization
    const cellWidth = canvas.width / 10;
    const cellHeight = canvas.height / 10;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const intensity = heatmap[j][i] / 100;
        ctx.fillStyle = `rgba(255, ${Math.floor(100 - intensity * 100)}, 0, ${intensity * 0.1})`;
        ctx.fillRect(i * cellWidth, j * cellHeight, cellWidth, cellHeight);
      }
    }

    // Path history
    if (pathHistory.length > 1) {
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pathHistory[0].x, pathHistory[0].y);
      for (let i = 1; i < pathHistory.length; i++) {
        ctx.lineTo(pathHistory[i].x, pathHistory[i].y);
      }
      ctx.stroke();
    }

    // Target
    if (isNavigating) {
      ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
      ctx.beginPath();
      ctx.arc(targetPos.x, targetPos.y, 40, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Particles
    particles.forEach(p => {
      ctx.fillStyle = `rgba(96, 165, 250, ${p.life * 0.5})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
      ctx.fill();
    });

    // Obstacles
    obstacles.forEach((obj) => {
      const isSelected = selectedObject?.id === obj.id;
      const threatColor = obj.threat === 'high' ? '#ef4444' : obj.threat === 'medium' ? '#f97316' : '#22c55e';
      
      ctx.fillStyle = isSelected ? `${threatColor}aa` : threatColor;
      ctx.strokeStyle = isSelected ? '#fbbf24' : threatColor;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.fillRect(obj.x - 18, obj.y - 18, 36, 36);
      ctx.strokeRect(obj.x - 18, obj.y - 18, 36, 36);

      if (isSelected) {
        ctx.fillStyle = '#fbbf24';
        ctx.arc(obj.x, obj.y, 35, 0, 2 * Math.PI);
        ctx.stroke();
      }

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(obj.type.slice(0, 1).toUpperCase(), obj.x, obj.y - 2);
      ctx.font = '9px Arial';
      ctx.fillText(obj.threat.slice(0, 1), obj.x, obj.y + 7);
    });

    // Robot
    ctx.fillStyle = isNavigating ? 'rgba(59, 130, 246, 0.8)' : 'rgba(16, 185, 129, 0.8)';
    ctx.beginPath();
    ctx.arc(robotPos.x, robotPos.y, 18, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = isNavigating ? '#1e40af' : '#047857';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Robot sensors (LIDAR visualization)
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const range = sensorData.lidar[i] / 100 * 50;
      const endX = robotPos.x + Math.cos(angle) * range;
      const endY = robotPos.y + Math.sin(angle) * range;
      ctx.beginPath();
      ctx.moveTo(robotPos.x, robotPos.y);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // Direction indicator
    ctx.strokeStyle = isNavigating ? '#3b82f6' : '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(robotPos.x, robotPos.y);
    ctx.lineTo(robotPos.x + 25, robotPos.y);
    ctx.stroke();

  }, [robotPos, obstacles, pathHistory, isNavigating, targetPos, particles, heatmap, selectedObject, sensorData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white p-4">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-1">
              🤖 Adaptive Mobility AI
            </h1>
            <p className="text-gray-400 text-lg">Advanced Autonomous Navigation System</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">FPS: {stats.fps}</div>
            <div className="text-sm text-gray-400">Latency: {stats.latency.toFixed(1)}ms</div>
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="mt-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded font-bold"
            >
              ⚡ Advanced
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
          {/* Left Panel - Controls */}
          <div className="xl:col-span-1 space-y-4">
            {/* Mode */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700 shadow-lg">
              <h2 className="font-black mb-3 text-cyan-400">📍 MODE</h2>
              <div className="space-y-2">
                {Object.entries(modes).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => setMode(key)}
                    className={`w-full p-3 rounded-lg font-bold text-sm transition ${
                      mode === key
                        ? `bg-gradient-to-r ${config.color} shadow-lg scale-105`
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    {config.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Destination */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700 shadow-lg">
              <h3 className="font-black mb-2 text-cyan-400">🎯 DESTINATION</h3>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-3 text-center font-bold">
                {destination}
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleVoiceCommand}
                className={`p-3 rounded-lg font-bold text-sm transition ${
                  isListening
                    ? 'bg-red-600 animate-pulse shadow-lg shadow-red-500'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-500'
                }`}
              >
                🎤 {isListening ? 'ON' : 'VOICE'}
              </button>
              <button
                onClick={() => {
                  setIsNavigating(!isNavigating);
                  if (!isNavigating) {
                    setPathHistory([robotPos]);
                  }
                }}
                className={`p-3 rounded-lg font-bold text-sm transition ${
                  isNavigating
                    ? 'bg-green-600 shadow-lg shadow-green-500'
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-lg hover:shadow-purple-500'
                }`}
              >
                📍 {isNavigating ? 'MOVE' : 'NAV'}
              </button>
            </div>

            {/* Priorities */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700 shadow-lg">
              <h3 className="font-black mb-3 text-cyan-400">⚡ PRIORITIES</h3>
              <div className="space-y-2 text-sm">
                {modes[mode].priorities.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 bg-slate-700 rounded">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                    {p}
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Output */}
            {voiceCommand && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 border border-pink-500 shadow-lg shadow-pink-500/50">
                <div className="font-black mb-1 text-sm">🔊 RECOGNIZED</div>
                <div className="text-xs">"{voiceCommand}"</div>
              </div>
            )}
          </div>

          {/* Center Panel - Canvas */}
          <div className="xl:col-span-3 space-y-4">
            {/* Main Canvas */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700 shadow-lg">
              <h2 className="font-black mb-3 text-cyan-400">👁️ PERCEPTION</h2>
              <div className="bg-slate-950 rounded-lg overflow-hidden border-2 border-slate-700">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={380}
                  onClick={handleCanvasClick}
                  className="w-full cursor-crosshair"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Click to set destination | Objects: {obstacles.length}</p>
            </div>

            {/* Detections */}
            {detections.length > 0 && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-3 border border-yellow-700 shadow-lg shadow-yellow-500/20">
                <div className="font-black text-sm text-yellow-400 mb-2">🔍 ACTIVE DETECTIONS</div>
                <div className="grid grid-cols-3 gap-2">
                  {detections.map(d => (
                    <div key={d.id} className="bg-yellow-900/30 border border-yellow-700 rounded p-2 text-xs">
                      <div className="font-bold">{d.type}</div>
                      <div className="text-yellow-300">{(d.confidence * 100).toFixed(0)}%</div>
                      <div className="text-gray-300">{d.distance.toFixed(0)}m</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel - Metrics */}
          <div className="xl:col-span-1 space-y-4">
            {/* AI Metrics */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700 shadow-lg">
              <h3 className="font-black mb-4 text-cyan-400 text-sm">📊 AI METRICS</h3>
              
              <div className="space-y-3">
                {/* YOLO */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-green-400">YOLO11n</span>
                    <span>{stats.yolo.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full" style={{ width: `${stats.yolo}%` }}></div>
                  </div>
                </div>

                {/* Whisper */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-blue-400">Whisper</span>
                    <span>{stats.whisper.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full" style={{ width: `${stats.whisper}%` }}></div>
                  </div>
                </div>

                {/* Safety */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-red-400">Safety</span>
                    <span>{stats.safetyScore.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-red-500 to-pink-400 h-2 rounded-full" style={{ width: `${stats.safetyScore}%` }}></div>
                  </div>
                </div>

                {/* Confidence */}
                <div>
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-purple-400">Confidence</span>
                    <span>{(stats.confidence * 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-500 to-violet-400 h-2 rounded-full" style={{ width: `${stats.confidence * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Waveform */}
            {isListening && (
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-blue-700 shadow-lg">
                <h3 className="font-black mb-2 text-cyan-400 text-sm">🎙️ AUDIO</h3>
                <div className="flex items-end gap-1 h-20 justify-center">
                  {waveform.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-400 rounded-sm"
                      style={{ height: `${val}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            )}

            {/* Objects List */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-4 border border-slate-700 shadow-lg max-h-48 overflow-y-auto">
              <h3 className="font-black mb-2 text-cyan-400 text-sm">📦 OBJECTS</h3>
              <div className="space-y-1">
                {obstacles.map(obj => (
                  <button
                    key={obj.id}
                    onClick={() => setSelectedObject(obj)}
                    className={`w-full text-left p-2 rounded text-xs font-bold transition ${
                      selectedObject?.id === obj.id
                        ? 'bg-yellow-600 border border-yellow-400'
                        : 'bg-slate-700 hover:bg-slate-600'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{obj.type}</span>
                      <span className={obj.threat === 'high' ? 'text-red-400' : obj.threat === 'medium' ? 'text-yellow-400' : 'text-green-400'}>
                        {obj.threat}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Panel */}
        {showAdvanced && (
          <div className="mt-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 shadow-lg">
            <h2 className="font-black mb-4 text-cyan-400">⚡ ADVANCED SYSTEMS</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* LIDAR Sensors */}
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <h3 className="font-bold text-green-400 mb-3">📡 LIDAR SENSORS (12x)</h3>
                <div className="grid grid-cols-4 gap-2">
                  {sensorData.lidar.map((val, i) => (
                    <div key={i} className="text-center text-xs">
                      <div className="h-16 bg-slate-800 rounded flex items-end justify-center p-1 mb-1">
                        <div
                          className="w-full bg-gradient-to-t from-green-500 to-green-300 rounded-sm"
                          style={{ height: `${val}%` }}
                        ></div>
                      </div>
                      <div className="text-gray-400">{val.toFixed(0)}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Camera */}
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <h3 className="font-bold text-blue-400 mb-3">📷 CAMERA</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Resolution</span>
                    <span className="text-blue-300">{sensorData.camera.resolution}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FPS</span>
                    <span className="text-blue-300">{sensorData.camera.fps}</span>
                  </div>
                  <div className="mt-3 p-2 bg-blue-900/30 rounded border border-blue-700">
                    <div className="text-blue-300">◉ Recording</div>
                  </div>
                </div>
              </div>

              {/* IMU */}
              <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <h3 className="font-bold text-purple-400 mb-3">🧭 IMU SENSOR</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Acceleration</span>
                    <span className="text-purple-300">{sensorData.imu.accel.toFixed(1)} m/s²</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Gyroscope</span>
                    <span className="text-purple-300">{sensorData.imu.gyro.toFixed(1)} rad/s</span>
                  </div>
                  <div className="mt-3 h-12 bg-slate-800 rounded p-2">
                    <div className="text-xs text-gray-400">Pitch: 2.3° | Roll: -1.1° | Yaw: 45.2°</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 text-xs">
          <p>🚀 Smart India Hackathon 2026 | Adaptive Mobility AI | Problem Statement 26215</p>
          <p className="mt-1">Neural Pathfinding Engine v4.2 | Real-time Perception Stack</p>
        </div>
      </div>
    </div>
  );
}