import { useEffect, useState } from "react";
import "./Welcome.css";
import logo from "../kinya.png";

function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
      setTimeout(() => setShow(true), 500); // smooth delay
    }
  }, []);

  const closeModal = () => {
    localStorage.setItem("visited", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="wm-overlay">
      <div className="wm-modal-box">

        <button
          className="wm-close fa-solid fa-xmark"
          onClick={closeModal}
        ></button>

        <h1 className="wm-title">Welcome</h1>

        <div className="wm-modal-body">

          <img src={logo} alt="Kinya Logo" className="wm-logo" />

          <h2 className="wm-subtitle">
            Kinya Medical Systems & Solutions
          </h2>

          <p className="wm-desc">
            Delivering trusted medical systems, innovative healthcare solutions,
            and reliable support for better patient care.
          </p>

          <div className="kinya">
            <ul className="wm-list">
              <li><span>K</span> - Key</li>
              <li><span>I</span> - Innovation</li>
              <li><span>N</span> -  Network</li>
              <li><span>Y</span> - Your</li>
              <li><span>A</span> - Access</li>
            </ul>

            <div className="info">
              <p>📞 +91 9789041308</p>
              <p>📧 sales@kinya.in</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;