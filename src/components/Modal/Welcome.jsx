import { useEffect, useState } from "react";
import "./Welcome.css";
import logo from "../kinya.png"; // adjust path if needed

function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("visited");
    if (!visited) {
      setShow(true);
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
        type="button"
        class="fa-solid fa-xmark fa-2xl wm-close"
        onClick={closeModal}
      ></button>

      <h1 className="wm-title">Welcome!</h1>

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
            <li><strong>K</strong> – Key</li>
            <li><strong>I</strong> – Innovation</li>
            <li><strong>N</strong> – In</li>
            <li><strong>Y</strong> – Your</li>
            <li><strong>A</strong> – Access</li>
          </ul>

          <div className="info">
            <h6><b>Contact :</b> +91 9789041308</h6>
            <h6><b>Email Us:</b> sales@kinya.in</h6>
          </div>

        </div>

      </div>
    </div>
  </div>
);

}

export default WelcomeModal;
