import { useState } from "react";
import ApplicationPage from "./ApplicationPage";

const applications = [
  {
    icon: "🏥",
    name: "Hospital",
    color: "hospital",
    description:
      "Safe indoor mobility assistance for hospitals, corridors, rooms and emergency areas.",
    features: [
      "Indoor navigation",
      "Voice assistance",
      "Obstacle detection",
      "Safety monitoring",
    ],
  },

  {
    icon: "🛒",
    name: "Supermarket",
    color: "supermarket",
    description:
      "Adaptive movement through aisles with destination guidance and obstacle awareness.",
    features: [
      "Aisle navigation",
      "Destination guidance",
      "Obstacle detection",
      "Adaptive speed",
    ],
  },

  {
    icon: "🏭",
    name: "Industry",
    color: "industry",
    description:
      "Safety-focused mobility assistance for industrial environments and restricted zones.",
    features: [
      "Hazard awareness",
      "Industrial navigation",
      "Obstacle detection",
      "Safety monitoring",
    ],
  },

  {
    icon: "🏠",
    name: "Home",
    color: "home",
    description:
      "Personalized indoor assistance for movement between rooms and frequently used locations.",
    features: [
      "Room navigation",
      "Voice commands",
      "Personalized assistance",
      "Emergency support",
    ],
  },
];

function App() {
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [hoveredApplication, setHoveredApplication] = useState(null);

  // Application page
  if (selectedApplication) {
    return (
      <ApplicationPage
        application={selectedApplication}
        onBack={() => setSelectedApplication(null)}
      />
    );
  }

  return (
    <div className="app">

      {/* HERO */}
      <header className="hero">

        <div className="logo">
          E-MINDS
        </div>

        <div className="subtitle">
          SMART ADAPTIVE RETROFIT SYSTEM
        </div>

        <h1>
          Smart Adaptive Retrofit AMR
        </h1>

        <p className="tagline">
          Universal Fleet Automation
        </p>

        <p className="intro">
          One intelligent platform.
          <br />
          Multiple environments.
          <br />
          Adaptive assistance.
        </p>

      </header>


      {/* APPLICATION SECTION */}
      <main>

        <div className="section-heading">

          <span className="section-label">
            SELECT ENVIRONMENT
          </span>

          <h2>
            Where will FleetFit operate?
          </h2>

          <p>
            Select an environment to explore its adaptive configuration.
          </p>

        </div>


        {/* APPLICATION CARDS */}
        <div className="application-grid">

          {applications.map((application) => (

            <div
              key={application.name}
              className={`application-card ${application.color} ${
                hoveredApplication === application.name
                  ? "active"
                  : ""
              }`}

              onMouseEnter={() =>
                setHoveredApplication(application.name)
              }

              onMouseLeave={() =>
                setHoveredApplication(null)
              }

              onClick={() =>
                setSelectedApplication(application)
              }
            >

              {/* ICON */}
              <div className="application-icon">
                {application.icon}
              </div>


              {/* NAME */}
              <h3>
                {application.name}
              </h3>


              {/* DESCRIPTION */}
              <p>
                {application.description}
              </p>


              {/* FEATURES */}
              <div className="feature-preview">

                {application.features.map((feature) => (

                  <span key={feature}>
                    ✓ {feature}
                  </span>

                ))}

              </div>


              {/* EXPLORE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedApplication(application);
                }}
              >
                Explore Configuration →
              </button>

            </div>

          ))}

        </div>


        {/* BOTTOM INFORMATION */}
        <section className="system-info">

          <div>
            <span>01</span>
            <h3>Adaptive</h3>
            <p>
              Movement behaviour changes according to the selected environment.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Interactive</h3>
            <p>
              Explore the system and understand individual hardware components.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Human Override</h3>
            <p>
              The user always remains in control of the system.
            </p>
          </div>

        </section>


        {/* PROJECT STATEMENT */}
        <section className="project-statement">

          <p>
            FleetFit is designed as a
            <strong> smart adaptive retrofit AMR </strong>
            capable of modifying its assistance, navigation and movement
            behaviour according to different environments.
          </p>

        </section>

      </main>

    </div>
  );
}

export default App;