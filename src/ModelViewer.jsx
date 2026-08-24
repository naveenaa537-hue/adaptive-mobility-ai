import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useState } from "react";

const MODEL_PATH = "/models/sample_2026-08-17T142655.151.glb";

const COMPONENTS = {
  battery: {
    name: "LiFePO4 Power System",
    desc: "24V 20Ah LiFePO4 battery with smart BMS",
    image: "/component-references/01_battery.jpg",
  },
  motor_driver: {
    name: "Motor Driver (Cytron MDD20A)",
    desc: "Dual motor controller 20A per motor",
    image: "/component-references/02_motor_driver.jpg",
  },
  orange_pi: {
    name: "Orange Pi 5 (AI Brain)",
    desc: "Main processor - 8GB RAM, 128GB SSD",
    image: "/component-references/03_orange_pi.jpg",
  },
  stm32: {
    name: "STM32H743Z12 (Real-Time)",
    desc: "Real-time controller for PWM & encoders",
    image: "/component-references/04_stm32.jpg",
  },
  lidar: {
    name: "RPLiDAR A1M8",
    desc: "360° laser scanner for obstacle detection",
    image: "/component-references/05_lidar.jpg",
  },
  camera: {
    name: "USB Camera (1080p)",
    desc: "Vision-based navigation system",
    image: "/component-references/06_camera.jpg",
  },
  motor: {
    name: "DC Motors + Encoders",
    desc: "2x Rhino iG52 motors (24V, 100W)",
    image: "/component-references/07_motor.jpg",
  },
  imu: {
    name: "6-DOF IMU Sensor",
    desc: "Tilt and acceleration detection",
    image: "/component-references/08_imu.jpg",
  },
  actuator: {
    name: "Linear Actuator",
    desc: "100mm stroke for tire-swap",
    image: "/component-references/09_actuator.jpg",
  },
  safety: {
    name: "Safety Controls",
    desc: "Emergency stop & circuit breaker",
    image: "/component-references/10_safety.jpg",
  },
};

function Robot({ onComponentClick }) {
  const { scene } = useGLTF(MODEL_PATH);

  const handleClick = (e) => {
    e.stopPropagation();
    const meshName = e.object.name.toLowerCase();
    console.log("CLICKED:", meshName);

    for (let key in COMPONENTS) {
      if (meshName.includes(key)) {
        onComponentClick(key);
        return;
      }
    }
  };

  return (
    <group onClick={handleClick}>
      <primitive object={scene} scale={[2, 2, 2]} rotation={[0, Math.PI, 0]} />
    </group>
  );
}

export default function ModelViewer() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ width: "100%", height: "100vh", background: "#0a0e27" }}>
      <Canvas camera={{ position: [0, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Robot onComponentClick={setSelected} />

        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      </Canvas>

      {/* Instruction Overlay */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "#071522dd",
          padding: "12px 16px",
          borderRadius: "8px",
          fontSize: "12px",
          border: "1px solid #38bdf8",
          color: "#7dd3fc",
        }}
      >
        🖱️ Drag to rotate • 📜 Scroll to zoom • 👆 Click parts
      </div>

      {/* Info Panel */}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#0f1729",
            border: "2px solid #38bdf8",
            borderRadius: "12px",
            padding: "20px",
            maxWidth: "400px",
            color: "white",
            zIndex: 100,
          }}
        >
          {/* Image */}
          <img
            src={COMPONENTS[selected].image}
            alt={COMPONENTS[selected].name}
            style={{
              width: "100%",
              height: "220px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "12px",
              border: "2px solid #38bdf8",
            }}
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='220'%3E%3Crect fill='%23333' width='300' height='220'/%3E%3Ctext x='50%25' y='50%25' fill='%23999' text-anchor='middle' dy='.3em'%3ELoading...%3C/text%3E%3C/svg%3E";
            }}
          />

          {/* Title */}
          <h2 style={{ margin: "0 0 8px", color: "#38bdf8", fontSize: "18px" }}>
            {COMPONENTS[selected].name}
          </h2>

          {/* Description */}
          <p style={{ fontSize: "13px", color: "#c7dbea", margin: "0 0 12px" }}>
            {COMPONENTS[selected].desc}
          </p>

          {/* Close Button */}
          <button
            onClick={() => setSelected(null)}
            style={{
              width: "100%",
              padding: "10px",
              background: "#38bdf8",
              color: "#00111c",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}