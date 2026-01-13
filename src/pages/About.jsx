// src/pages/About.jsx
import React, { useEffect, useRef } from 'react';
import './About.css';
import img from '/ABOUT/GROUP.jpeg'

function About() {
  const teamMembers = [
  
   {
     id: 1,
    name: 'Tibertius Kiran Kumar',
    role: 'Director - Sales & Finance',
    image: './ABOUT/SI.png',
    bio: '',
    
    
    },
     {
     id: 2,
    name: 'Nisha Seeriack',
    role: 'Director - Operation',
    image: './ABOUT/MAM.jpeg',
    bio: '',
   
    
    },
      
    {
      id: 3,
    name: 'Surendhar Kasinathan',
    role: 'Lead - Product Development and Application',
    image: ' ./ABOUT/SS.png',
    bio: '',
    
    },
    {
      id: 4,
    name: 'Mohammed Syed Jaffer',
    role: 'Lead - Research,Development and Innovation',
    image: './ABOUT/J.png',
    bio: '',
    },
    
    {
    id: 5,
    name: 'MarudhuPandian',
    role: 'Lead - Production and Service',
    image: './ABOUT/MARUDHU.png',
    bio: '',
  
  },
   
    
  ];

  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero" ref={addToRefs}>
        <div className="container">
          <h1 className="slide-up">About Kinya Medical Systems</h1>
          <p className="slide-up delay-1">Your trusted partner in healthcare solutions for over 10 years</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission" ref={addToRefs}>
        <div className="container">
          <div className="mission-content">
            <div className="mission-text fade-in-left">
              <h2>Our Mission</h2>
              <p>Kinya Medical Systems is committed to Develop and Manufacture Advanced Vitrectomy and Phaco Emulsification systems that deliver simple, cost-effective solutions for complex surgical challenges. 
We partner closely with surgeons to drive innovation, prioritize continuous improvement, and respond swiftly to customer needs and concerns.
 Our goal is to become the global leader in ophthalmic devices, known for quality, affordability, and reliability.</p>
              <p>We strive to build a workplace where the brightest engineers are inspired to innovate, fostering a culture of creativity, collaboration, and excellence that propels us toward a future where advanced eye care is within everyone’s reach.</p>
            </div>
            <div className="mission-image fade-in-right">
              <img src={img} alt="Medical team" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values" ref={addToRefs}>
        <div className="container">
          <h2 className="fade-in">Our Values</h2>
          <div className="values-grid">
            {[
              { icon: 'fas fa-hand-holding-heart', title: 'Compassion', text: 'We care deeply about the patients who ultimately benefit from our products and services.' },
              { icon: 'fas fa-award', title: 'Excellence', text: 'We strive for the highest standards in everything we do, from product selection to customer service.' },
              { icon: 'fas fa-shield-alt', title: 'Integrity', text: 'We conduct our business with honesty, transparency, and ethical practices.' },
              { icon: 'fas fa-users', title: 'Partnership', text: 'We view our clients as partners and work collaboratively to achieve their healthcare goals.' }
            ].map((value, index) => (
              <div key={index} className="value-card fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="value-icon">
                  <i className={value.icon}></i>
                </div>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="offices" ref={addToRefs}>
        <div className="container">
          <h2 className="fade-in">Our Offices</h2>
          <div className="offices-grid">
            {[
              { 
                title: 'OFFICE & MANUFACTURING', 
                address: 'No 46 Ranga Rice Mill, Rani Anna Nagar, Somanathapuram, Guduvancheri, Tamil Nadu, India',
                contact: 'Mrs Nisha Kiran',
                phone: '+91 9789041308',
                alternatePhone: ' +91 8056805718',
                email: 'sales@kinya.in'
              },
              { 
                title: 'DELHI OFFICE', 
                address: 'Innotech Genesis pvt ltd House no 5 sec 12 vasundhara ghaziabad up -201012',
                contact: 'Mr.S.R. Mohapatra',
                phone: '+91 9911502377',
                alternatePhone: '+91 7982411457',
                email: 'sales@innotechgenesis.com'
              },
              { 
                title: 'BANGALORE OFFICE', 
                address: 'SRI KANI #724, SRI KANISHKA,11TH BLOCK, BSK 6TH STAGE,BDA LAYOUT, BEHIND ARVIND TATA MOTORS,KENGERI POST,BENGALURU - 560060.KARNATAKA',
                contact: 'Mr Ashokan',
                phone: '+91 9880264118',
                alternatePhone: '+91 7795255782',
                email: ' srikaniblr@gmail.com'
              },
              { 
                title: 'MUMBAI OFFICE', 
                address: 'Mumbai, India',
                contact: 'Mr. Sakthivel',
                phone: '+91 9500617481',
                alternatePhone: '+91 8675244091',
                email: 'sales@kinya.in'
              },
               
            ].map((office, index) => (
              <div key={index} className="office-card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3>{office.title}</h3>
                <p>{office.address}</p>
                <div className="contact-info">
                  <strong style={{color:'green'}}>Contact : {office.contact}</strong>
                  <strong>PhoneNo : <span>{office.phone}</span></strong>
                  <strong>Alter No : <span>{office.alternatePhone}</span></strong>
                  <strong style={{color:'deepskyblue'}}>Email : <span>{office.email}</span></strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team" ref={addToRefs}>
        <div className="container">
          <h2 className="fade-in">Our Leadership Team</h2>
          <p className="team-subtitle fade-in delay-1">Meet the dedicated professionals who drive our mission forward</p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={member.id} className="team-card fade-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                 </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta" ref={addToRefs}>
        <div className="container">
          <h2 className="slide-up">Ready to Partner With Us?</h2>
          <p className="slide-up delay-1">Join hundreds of healthcare providers across Kenya who trust Kinya Medical for their equipment and pharmaceutical needs.</p>
          <a href="#contact" className="btn btn-light slide-up delay-2">Contact Us Today</a>
        </div>
      </section>
    </div>
  );
}

export default About;