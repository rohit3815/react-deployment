import { useState, useEffect } from "react";
import "./App.css";

const SERVICES = [
  { name: "EC2", icon: "🖥️", desc: "Virtual servers in the cloud. This website runs on one." },
  { name: "S3", icon: "🪣", desc: "Object storage for files, images and backups." },
  { name: "VPC", icon: "🌐", desc: "Your own private network inside AWS." },
  { name: "IAM", icon: "🔑", desc: "Controls who can access what in your account." },
  { name: "CloudWatch", icon: "📈", desc: "Logs and metrics to monitor your servers." },
  { name: "Route 53", icon: "🧭", desc: "DNS service that connects your domain to your server." },
];

const STEPS = [
  "Launch an EC2 instance (Ubuntu)",
  "Open ports 22 and 80 (or 5173) in the Security Group",
  "Connect with SSH",
  "Install Node.js and Git",
  "Clone the project and run npm install",
  "Run npm run build",
  "Serve the build with Nginx",
  "Open the public IP in your browser",
];

export default function App() {
  const [done, setDone] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleStep = (index) => {
    setDone((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const progress = Math.round((done.length / STEPS.length) * 100);

  return (
    <div className="app">
      <nav className="nav">
        <span className="logo">☁️ AWS Demo</span>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#steps">Deploy steps</a>
          <a href="#status">Status</a>
        </div>
      </nav>

      <header className="hero">
        <h1>My first website on AWS EC2</h1>
        <p>
          A simple React app built while learning DevOps. If you can see this
          page, your deployment worked.
        </p>
        <a className="btn" href="#steps">
          See deploy steps
        </a>
      </header>

      <section id="services" className="section">
        <h2>AWS services I'm learning</h2>
        <div className="grid">
          {SERVICES.map((s) => (
            <div className="card" key={s.name}>
              <div className="icon">{s.icon}</div>
              <h3>{s.name}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="steps" className="section">
        <h2>Deployment checklist</h2>
        <p className="muted">Tick each step as you finish it on your server.</p>

        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
        </div>
        <p className="progress-text">{progress}% complete</p>

        <ul className="steps">
          {STEPS.map((step, i) => (
            <li key={step}>
              <label className={done.includes(i) ? "step done" : "step"}>
                <input
                  type="checkbox"
                  checked={done.includes(i)}
                  onChange={() => toggleStep(i)}
                />
                <span>{step}</span>
              </label>
            </li>
          ))}
        </ul>

        {progress === 100 && (
          <p className="success">🎉 Deployment complete. Nice work!</p>
        )}
      </section>

      <section id="status" className="section">
        <h2>Live status</h2>
        <div className="status-box">
          <div>
            <span className="label">Server address</span>
            <strong>{window.location.hostname}</strong>
          </div>
          <div>
            <span className="label">Page loaded over</span>
            <strong>{window.location.protocol.replace(":", "").toUpperCase()}</strong>
          </div>
          <div>
            <span className="label">Your local time</span>
            <strong>{time.toLocaleTimeString()}</strong>
          </div>
        </div>
      </section>

      <footer className="footer">Built with React and hosted on AWS EC2</footer>
    </div>
  );
}