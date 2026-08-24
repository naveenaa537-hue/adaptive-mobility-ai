import ModelViewer from "./ModelViewer";
function ApplicationPage({ application, onBack }) {
  return (
    <div className="application-page">

      <button className="back-button" onClick={onBack}>
        ← Back to Applications
      </button>

      <div className="application-header">

        <div className="big-icon">
          {application.icon}
        </div>

        <div>
          <h1>{application.name}</h1>

          <p>
            {application.description}
          </p>
        </div>

      </div>

      <div className="details-section">

        <h2>
          {application.name} Configuration
        </h2>

        <p>
          FleetFit adapts its movement, navigation and
          assistance according to this environment.
        </p>

        <div className="feature-list">

          {application.features.map((feature) => (
            <div className="feature-box" key={feature}>
              ✓ {feature}
            </div>
          ))}

        </div>

      </div>

      <div className="model-placeholder">

        <h2>Interactive 3D Model</h2>

        <p>
          
        </p>

        <ModelViewer application={application} />

      </div>

    </div>
  );
}

export default ApplicationPage;