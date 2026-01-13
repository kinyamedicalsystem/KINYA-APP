// src/pages/Contact.jsx
import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    prefix: 'Mr.',
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    // Page load animation only
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.classList.add('submitting');
    setFormStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const templateParams = {
        prefix: formData.prefix,
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        to_email: 'ganeshsudha1224@gmail.com'
      };

      await emailjs.send(
        'service_k9zgeyx',
        'template_94fgcvh',
        templateParams,
        'Fq6cAmOPDVoQzsnx5'
      );

      setFormStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully.' 
      });
      
      setFormData({
        prefix: 'Mr.',
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setFormStatus({ type: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again or contact us directly.' 
      });
    } finally {
      submitBtn.classList.remove('submitting');
    }
  };

  // Contact actions
  const openLocation = () => {
    const address = "No 46 Ranga Rice Mill Building, Big Street, Nandhivaram, Guduvancheri, Tamil Nadu, India";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };
  

  const makeCall = () => {
    window.open('tel:+919789041308');
  };

  const sendEmail = () => {
    window.open('mailto:sales@kinya.in');
  };

  // Contact Card Component
  const ContactCard = ({ icon, title, details, onClick, actionIcon, actionText }) => (
    <div 
      className={`contact-card ${onClick ? 'clickable' : ''}`} 
      onClick={onClick}
    >
      <div className="card-icon">
        <i className={icon}></i>
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        {details.map((detail, index) => (
          <p key={index}>{detail}</p>
        ))}
      </div>
      {onClick && (
        <div className="card-action">
          <i className={actionIcon}></i>
          {actionText}
        </div>
      )}
    </div>
  );

  // Status Message Component
  const StatusMessage = () => {
    if (!formStatus.message) return null;

    return (
      <div className={`status-message ${formStatus.type}`}>
        <div className="status-icon">
          {formStatus.type === 'success' && <i className="fas fa-check-circle"></i>}
          {formStatus.type === 'error' && <i className="fas fa-exclamation-circle"></i>}
          {formStatus.type === 'loading' && <i className="fas fa-spinner fa-spin"></i>}
        </div>
        <div className="status-text">
          {formStatus.message}
        </div>
        <button 
          className="status-close" 
          onClick={() => setFormStatus({ type: '', message: '' })}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    );
  };

  return (
    <div className={`contact-page ${isVisible ? 'page-loaded' : ''}`}>
      <div className="container">
        {/* Header Section */}
        <div className={`contact-header ${isVisible ? 'visible' : ''}`}>
          <div className="header-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <h1>Contact Us</h1>
          <p>Get in touch with our team for any inquiries or support</p>
        </div>
        
        <div className="contact-content">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-header">
              <h2>Get in Touch</h2>
              <p>We're here to help you with any questions about our medical products and services</p>
            </div>
            
            <div className="contact-cards">
              <ContactCard 
                icon="fas fa-map-marker-alt"
                title="Visit Our Location"
                details={["No 46 Ranga Rice Mill Building, Big Street", "Nandhivaram, Guduvancheri", "Tamil Nadu, India"]}
                onClick={openLocation}
                actionIcon="fas fa-external-link-alt"
                actionText="Open in Maps"
              />
              
              <ContactCard 
                icon="fas fa-phone"
                title="Call Us"
                details={["+91 9789041308", "24/7 Emergency Support Available"]}
                onClick={makeCall}
                actionIcon="fas fa-phone"
                actionText="Call Now"
              />
              
              <ContactCard 
                icon="fas fa-envelope"
                title="Email Us"
                details={["sales@kinya.in", "kinyamedicalsystems@gmail.com", "Quick response guaranteed"]}
                onClick={sendEmail}
                actionIcon="fas fa-paper-plane"
                actionText="Send Email"
              />
              
              <ContactCard 
                icon="fas fa-clock"
                title="Working Hours"
                details={["Monday - Friday: 8:00 AM - 8:00 PM", "Saturday: 9:00 AM - 6:00 PM", "Sunday: Emergency Only"]}
              />
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="contact-form-section">
            <div className="form-header">
              <h2>Send us a Message</h2>
              <p>Fill out the form below and we'll get back to you within 24 hours</p>
            </div>
            
            <StatusMessage />
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* Prefix and Name Row */}
                <div className="form-group prefix-group">
                  <label htmlFor="prefix">
                    <i className="fas fa-user-tag"></i> Title *
                  </label>
                  <select
                    id="prefix"
                    name="prefix"
                    value={formData.prefix}
                    onChange={handleChange}
                    required
                    className="prefix-select"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>
                
                <div className="form-group name-group">
                  <label htmlFor="name">
                    <i className="fas fa-user"></i> Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fas fa-envelope"></i> Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">
                    <i className="fas fa-phone"></i> Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 1234567890"
                  />
                </div>
                
                <div className="form-group full-width">
                  <label htmlFor="subject">
                    <i className="fas fa-tag"></i> Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
              </div>
              
              <div className="form-group full-width">
                <label htmlFor="message">
                  <i className="fas fa-comment"></i> Message
                  <span className="optional-label">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your inquiry in detail..."
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                <span className="btn-text">
                  <i className="fas fa-paper-plane"></i> Send Message
                </span>
                <span className="btn-loading">
                  <i className="fas fa-spinner fa-spin"></i> Sending...
                </span>
              </button>
            </form>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="map-section">
          <div className="map-header">
            <h2>Find Us</h2>
            <p>Visit our location for personalized service and support</p>
          </div>
          <div className="map-container" onClick={openLocation}>
            <div className="map-placeholder">
              <i className="fas fa-map-marker-alt"></i>
              <h3>Kinya Medical Systems and Solutions</h3>
              <p>Click to open location in Google Maps</p>
              <button className="map-btn">
                <i className="fas fa-directions"></i>
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;