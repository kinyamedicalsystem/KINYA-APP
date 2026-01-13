import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import DemoModal from './DemoModal'; // We'll create this separate component
import './ProductDetail.css';

// Country data with phone codes (moved outside component to prevent recreation)
const countries = [
  { code: 'US', name: 'United States', phoneCode: '+1' },
  { code: 'IN', name: 'India', phoneCode: '+91' },
  { code: 'GB', name: 'United Kingdom', phoneCode: '+44' },
  { code: 'DE', name: 'Germany', phoneCode: '+49' },
  { code: 'FR', name: 'France', phoneCode: '+33' },
  { code: 'CA', name: 'Canada', phoneCode: '+1' },
  { code: 'AU', name: 'Australia', phoneCode: '+61' },
  { code: 'JP', name: 'Japan', phoneCode: '+81' },
  { code: 'CN', name: 'China', phoneCode: '+86' },
  { code: 'BR', name: 'Brazil', phoneCode: '+55' },
  { code: 'SG', name: 'Singapore', phoneCode: '+65' },
  { code: 'AE', name: 'United Arab Emirates', phoneCode: '+971' },
  { code: 'SA', name: 'Saudi Arabia', phoneCode: '+966' },
  { code: 'KR', name: 'South Korea', phoneCode: '+82' },
  { code: 'IT', name: 'Italy', phoneCode: '+39' },
  { code: 'ES', name: 'Spain', phoneCode: '+34' },
  { code: 'NL', name: 'Netherlands', phoneCode: '+31' },
  { code: 'SE', name: 'Sweden', phoneCode: '+46' },
  { code: 'CH', name: 'Switzerland', phoneCode: '+41' },
  { code: 'RU', name: 'Russia', phoneCode: '+7' }
];

// Sales contact information
const salesContact = {
  phone: '9789041308',
  email: 'sales@kinya.in'
};

// Product details data
const productDetails = {
  'posterior': {
    title: 'POSTERIOR VITRECTOMY SYSTEM',
    image: '/images/POSTERIOR.png',
    brochure: '/BROCHURES/VHOPE.pdf',
    description: 'Advanced ophthalmic surgical system designed for precision vitreoretinal procedures with cutting-edge technology.',
    features: [
      'Advanced Cutting Technology ,Supports DORC / MIDLAB / DUAL PNEUMATIC Cutters',
      'Venturi Pump with 2 Suction Lines for Extrusion and Cutter Aspiration',
      '50,000 HRS LED Life and Enables with 23G / 25G / 27G Surgeries',
      'Automated Infusion Control with Infusion Compansation Algorithm',
      '23G Phaco Fragmantation',
      'Multi Functional Foot Pedal'
    ],
    specifications: [
      { name: 'Cutting Speed', value: ' 10,000 CPM / 20,000 CPM on Twin Blade Cutter' },
      { name: 'Illumination', value: '80W LED Light Source' },
      { name: 'Vacuum', value: '0 to 650mmHg Using Venturi Pump' },
      { name: 'Infusion', value: 'Automated 0 to 300mmHg' },
      { name: 'Diathermy', value: '1 MHZ ' },
      { name: 'Phaco', value: '40 KHZ ,4 Crystal Titanium Hand piece' },
      { name: 'Silicone oil Injection', value: '0 to 6.5 bar' },
      { name: 'Silicone oil Extraction', value: '0 to 650mmHg' },
      { name: 'GUI Display', value: '15 inches Touch Screen' }
    ],
    accessories: [
       { image: '/POST/cassette POSTERIER.png', name: 'Cassette' },
       { image: '/POST/aktive light pipe.png', name: 'Aktive Light Pipe' },
      { image: '/POST/diathermy eraser.png', name: 'Diathermy Eraser' },
      { image: '/ANT/diaTHERMY PROBE.png', name: 'Diathermy Probe' },
      { image: '/ANT/diathermy forcep.png', name: 'Diathermy  Forcep' },
      { image: '/ANT/ia tube.png', name: 'IA Tube ' },
      { image: '/ANT/MITLAB ADAPTER.png', name: 'Mitlab Adapter' },
       { image: '/ANT/phaco frag.png', name: 'Phaco Frag ' },
        { image: '/ANT/phaco tray.png', name: 'Phaco Tray' },
      { image: '/ANT/VGPC.png', name: 'VGPC' },
       { image: '/ANT/CUTTER.png', name: 'Vitrectomy Cutter-DORC' },
        { image: '/ANT/VITRECTOMY CUTTER-MIDLAB.png', name: 'Vitrectomy Cutter-Mitlab' },
    ]
  },
  'phaco': {
    title: 'PHACO VITRECTOMY SYSTEM',
    image: '/images/PHACO1.png',
    brochure: '/BROCHURES/PHACO.pdf',
    description: 'Advanced ophthalmic surgical system designed for precision vitreoretinal procedures with cutting-edge technology.',
    features: [
      'Advanced Fluidics System',
      'Effective Cutting in all grades of Catract',
      'Ergonomic design for surgeon comfort',
      'Compatible with 2.8mm and MICS Procedure',
      'Multi Functional Foot Pedal'
    ],
    specifications: [
        { name: 'Phaco', value: '40 KHZ ,4 Crystal Titanium Hand Piece' },
          { name: 'Phaco Modes', value: 'Continuos / Pulse / Burst / Smart Pulse' },
          { name: 'Irrigation ', value: 'Automated and Gravity' },
      { name: 'Pump System', value: 'In built vacuum pump ' },
        { name: 'Vitrectomy', value: '2,500 CPM' },
      { name: 'Display', value: '15 inches Touch Screen' },
     
    ],
    accessories: [
      { image: '/PHACO/cassette-phaco.png', name: 'Cassette' },
      { image: '/PHACO/diathermy eraser.png', name: 'Diathermy Eraser' },
      { image: '/PHACO/diaTHERMY PROBE.png', name: 'Diathermy Probe' },
      { image: '/PHACO/diathermy forcep.png', name: 'Diathermy  Forcep' },
      { image: '/PHACO/ia tube.png', name: 'IA Tube ' },
      { image: '/PHACO/MITLAB ADAPTER.png', name: 'Mitlab Adapter' },
       { image: '/PHACO/phaco frag.png', name: 'Phaco Tip ' },
        { image: '/PHACO/phaco tray.png', name: 'Phaco Tray' },
      { image: '/PHACO/VGPC.png', name: 'VGPC' },
       { image: '/PHACO/CUTTER.png', name: 'Vitrectomy Cutter-DORC' },
        { image: '/PHACO/VITRECTOMY CUTTER-MIDLAB.png', name: 'Vitrectomy Cutter-Mitlab' },]
  },
  'ant-vit': {
    title: 'ANT_VIT VITRECTOMY SYSTEM',
    image: '/images/ANTERIOR.png',
    brochure: '/BROCHURES/ANTERIOR.pdf',
    description: 'Advanced ophthalmic surgical system designed for precision vitreoretinal procedures with cutting-edge technology.',
    features: [
      'Advanced cutting technology for precise vitreous removal',
      'Ergonomic design for surgeon comfort',
      'Compatible with various Vitrectomy Cutters',
         'In Built Diathermy ',
      

    ],
    specifications: [
      { name: 'Vitrectomy', value: ' 5,000 CPM' },
      { name: 'Diathermy', value: '1 MHZ' },
      { name: 'Vacuum', value: 'Venturi Pump 0 to 650mmHg ' },

    ],
    accessories: [
       { image: '/ANT/cassette-anterior.png', name: 'Cassette' },
      { image: '/ANT/diathermy eraser.png', name: 'Diathermy Eraser' },
      { image: '/ANT/diaTHERMY PROBE.png', name: 'Diathermy Probe' },
      { image: '/ANT/diathermy forcep.png', name: 'Diathermy  Forcep' },
      { image: '/ANT/ia tube.png', name: 'IA Tube ' },
      { image: '/ANT/MITLAB ADAPTER.png', name: 'Mitlab Adapter' },
       { image: '/ANT/phaco frag.png', name: 'Phaco Frag ' },
        { image: '/ANT/phaco tray.png', name: 'Phaco Tray' },
      { image: '/ANT/VGPC.png', name: 'VGPC' },
       { image: '/ANT/CUTTER.png', name: 'Vitrectomy Cutter-DORC' },
        { image: '/ANT/VITRECTOMY CUTTER-MIDLAB.png', name: 'Vitrectomy Cutter-Mitlab' },
    ]
    
  },
  'air-injection': {
    title: 'AIR_INJECTION VITRECTOMY SYSTEM',
    image: '/images/AIR-INJ.png',
    brochure: '/BROCHURES/SILICON.pdf',
    description: 'Advanced ophthalmic surgical system designed for precision vitreoretinal procedures with cutting-edge technology.',
    features: [
      'Advanced cutting technology for precise vitreous removal',
      'Integrated fluid management system',
      'Ergonomic design for surgeon comfort',
      'Compatible with various surgical approaches',
      'High-resolution visualization system'
    ],
    specifications: [
      { name: 'Cutting Speed', value: 'Up to 10,000 cpm' },
      { name: 'Illumination', value: 'Xenon LED' },
      { name: 'Footprint', value: 'Compact mobile cart' }
    ],
    accessories: [
      { image: '/AIR INJ/silicon oil injection extraction kit.png', name: 'Silicon Oil Injection Extraction Kit' },
    
    ]
  },
  'light-source': {
    title: 'LIGHT SOURCE VITRECTOMY SYSTEM',
    image: '/images/LIGHTSOURCE.png',
    brochure: '/BROCHURES/LEDLIGHT.pdf',
    description: 'Advanced ophthalmic surgical system designed for precision vitreoretinal procedures with cutting-edge technology.',
    features: [
      'Advanced cutting technology for precise vitreous removal',
      'Integrated fluid management system',
      'Ergonomic design for surgeon comfort',
      'Compatible with various surgical approaches',
      'High-resolution visualization system'
    ],
    specifications: [
      { name: 'Cutting Speed', value: 'Up to 10,000 cpm' },
      { name: 'Illumination', value: 'Xenon LED' },
      { name: 'Footprint', value: 'Compact mobile cart' }
    ],
    accessories: [
      { image: '/LIGHTSOURCE/ALCON.png', name: 'Alcon Light Pipe' },
      { image: '/POST/aktive light pipe.png', name: 'Aktive Light Pipe' },
     
    ]
  },
  'abp-scan': {
    title: 'DIAGNOSTIC A/B/P SCAN SYSTEM',
    images: [
      '/images/A_SCAN.png',
      '/images/B_SCAN.png',
      '/images/P_SCAN.png'
    ],
    brochure: './BROCHURES/ABPSCAN.pdf',
    description: 'Comprehensive diagnostic ultrasound system for ophthalmic applications with A-scan, B-scan, and Pachymetry capabilities.',
    detailedDescription: 'The DIAGNOSTIC A/B/P SCAN SYSTEM is a state-of-the-art ophthalmic ultrasound diagnostic device that combines A-scan biometry, B-scan imaging, and Pachymetry in one compact unit.',
    features: [
      'Triple functionality: A-scan, B-scan, and Pachymetry',
      'High-frequency ultrasound probes (10MHz, 20MHz)',
      'Automatic and manual measurement modes',
      'High-resolution LCD display with image storage',
      'User-friendly interface with customizable settings',
      'Export capabilities for reports and images',
      'Portable design for clinic and operating room use'
    ],
    specifications: [
      { name: 'Scan Modes', value: 'A-scan, B-scan, Pachymetry' },
      { name: 'Frequency Range', value: '10MHz - 20MHz' },
      { name: 'Resolution', value: '0.01mm for A-scan' },
      { name: 'Display', value: '15.6" HD LCD Touchscreen' },
      { name: 'Storage Capacity', value: '1000+ patient records' },
      { name: 'Dimensions', value: '350mm × 280mm × 150mm' }
    ],
    accessories: [
      { image: '/ABP/ASCAN.png', name: 'A-Scan Biometry OA12-Probe' },
      { image: '/ABP/BSCAN.png', name: 'B-Scan Imaging OB12-Probe' },
      { image: '/ABP/PACH.png', name: 'Pachymetry OP20-Probe' },
      { image: '/ABP/case.png', name: 'Protective Carry Case' },
    ]
  },
  'autoclave': {
    title: 'AUTOCLAVE STERILIZER',
    image: '/images/AUTOCLAVE.png',
    brochure: '/BROCHURES/AUTOCLAVE1.pdf',
    description: 'Advanced ophthalmic surgical system designed for precision vitreoretinal procedures with cutting-edge technology.',
    features: [
      'Advanced cutting technology for precise vitreous removal',
      'Integrated fluid management system',
      'Ergonomic design for surgeon comfort',
      'Compatible with various surgical approaches',
      'High-resolution visualization system'
    ],
    specifications: [
      { name: 'Cutting Speed', value: 'Up to 10,000 cpm' },
      { name: 'Illumination', value: 'Xenon LED' },
      { name: 'Footprint', value: 'Compact mobile cart' }
    ],
    accessories: [
      { image: '/AUTOCLAVE/AUTOCLAVE HELIX-PCD TEST KIT.png', name: 'Autoclave HELIX-PCD Test Kit' },
      { image: '/AUTOCLAVE/AUTOCLAVE INDICATOR STRIP.png', name: 'Autoclave Indicator Strip' },
      { image: '/AUTOCLAVE/AUTOCLAVE INDICATOR TAPE.png', name: 'Autoclave Indicator Tape' },
      { image: '/AUTOCLAVE/AUTOCLAVE POUCH.png', name: 'Pouch' },

    ]
  },
  'plasma': {
    title: 'PLASMA STERILIZER',
    image: '/images/PLASMA.png',
    brochure: '/BROCHURES/PLASMA.pdf',
    description: 'Advanced ophthalmic surgical system designed for precision vitreoretinal procedures with cutting-edge technology.',
    features: [
      'Advanced cutting technology for precise vitreous removal',
      'Integrated fluid management system',
      'Ergonomic design for surgeon comfort',
      'Compatible with various surgical approaches',
      'High-resolution visualization system'
    ],
    specifications: [
      { name: 'Cutting Speed', value: 'Up to 10,000 cpm' },
      { name: 'Illumination', value: 'Xenon LED' },
      { name: 'Footprint', value: 'Compact mobile cart' }
    ],
    accessories: [
      { image: '/PLASMA/PLASMA BIOLOGICAL INDICATOR.png', name: 'Biological Indicator' },
      { image: '/PLASMA/PLASMA HELIX TEST KIT.png', name: 'Helix Test Kit' },
      { image: '/PLASMA/PLASMA INDICATOR STRIP CD 40.jpg', name: 'Indicator Strip CD 40' },
      { image: '/PLASMA/PLASMA INDICATOR TAPE.png', name: 'Indicator Tape' },
      { image: '/PLASMA/TIVEK ROLL.png', name: 'Tivek Roll' }
    ]
  },
  'eto': {
    title: 'ETO STERILIZER',
    image: '/images/ETO.png',
    brochure: '/BROCHURES/ETO.pdf',
    description: 'Advanced ophthalmic surgical system designed for precision vitreoretinal procedures with cutting-edge technology.',
    features: [
      'Advanced cutting technology for precise vitreous removal',
      'Integrated fluid management system',
      'Ergonomic design for surgeon comfort',
      'Compatible with various surgical approaches',
      'High-resolution visualization system'
    ],
    specifications: [
      { name: 'Cutting Speed', value: 'Up to 10,000 cpm' },
      { name: 'Illumination', value: 'Xenon LED' },
      { name: 'Footprint', value: 'Compact mobile cart' }
    ],
    accessories: [
      { image: '/ETO/ETO BIOLOGICAL INDICATOR.png', name: 'Biological Indicator' },
      { image: '/ETO/ETO HELIX-PCD TEST KIT.png', name: 'HELIX-PCD Test Kit ' },
      { image: '/ETO/ETO INDICATOR DOT.png', name: 'Indicator Dot' },
      { image: '/ETO/ETO POUCH.png', name: 'Pouch' },
    ]
  },
};

const ProductDetail = () => {
  const { productId } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [formData, setFormData] = useState({
    doctorName: '',
    hospitalName: '',
    requestType: 'Demonstration',
    product: '',
    email: '',
    country: '',
    phoneCode: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [productId]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showDemoModal) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
      setTimeout(() => {
        const modal = document.querySelector('.demo-modal-overlay');
        if (modal) {
          modal.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [showDemoModal]);

  const product = productDetails[productId] || productDetails['posterior'];

  const handleDownloadBrochure = () => {
    const link = document.createElement('a');
    link.href = product.brochure;
    link.download = `${product.title.replace(/\s+/g, '-').toLowerCase()}-brochure.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    const btn = document.querySelector('.brochure-download-btn');
    btn.classList.add('clicked');
    setTimeout(() => btn.classList.remove('clicked'), 300);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'country') {
      const selectedCountry = countries.find(country => country.name === value);
      if (selectedCountry) {
        setFormData(prev => ({
          ...prev,
          phoneCode: selectedCountry.phoneCode
        }));
      }
    }
  }, []);

  const handleDemoRequest = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    const serviceID = 'service_k9zgeyx';
    const templateID = 'template_j2jm87v';
    const userID = 'Fq6cAmOPDVoQzsnx5';

    const templateParams = {
      doctor_name: formData.doctorName,
      hospital_name: formData.hospitalName,
      request_type: formData.requestType,
      product: formData.product || product.title,
      email: formData.email,
      country: formData.country,
      phone: formData.phoneCode + formData.phoneNumber,
      message: `Demo request for ${formData.product || product.title}`
    };

    emailjs.send(serviceID, templateID, templateParams, userID)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSubmitStatus('success');
        setFormData({
          doctorName: '',
          hospitalName: '',
          requestType: 'Demonstration',
          product: '',
          email: '',
          country: '',
          phoneCode: '',
          phoneNumber: ''
        });
        setTimeout(() => {
          setShowDemoModal(false);
          setSubmitStatus('');
        }, 3000);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }, [formData, product.title]);
//Contact Sales
  const handleContactSales = () => {
    window.location.href = `tel:${salesContact.phone}`;
  };

  const ImageGallery = () => {
    if (product.images) {
      return (
        <div className="image-gallery">
          {product.images.map((image, index) => (
            <div key={index} className="gallery-item">
              <img 
                src={image} 
                alt={`${product.title} - View ${index + 1}`}
                onError={(e) => {
                  e.target.src = '/images/placeholder-product.png';
                }}
              />
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="image-container scale-in">
        <img 
          src={product.image} 
          alt={product.title} 
          className="main-product-image" 
          onError={(e) => {
            e.target.src = '/images/placeholder-product.png';
          }}
        />
      </div>
    );
  };

  return (
    <div className={`product-detail-page ${isVisible ? 'page-visible' : ''}`}>
      <div className="container">
        <Link to="/products" className="back-link slide-in-left">
          <span className="back-arrow">←</span> Back to Products
        </Link>
        
        <div className="product-detail">
          <div className="product-header">
            <h1 className="product-title fade-in-up">{product.title}</h1>
            <button 
              className="brochure-download-btn pulse-hover"
              onClick={handleDownloadBrochure}
            >
              <span className="download-icon"><i className="fa-solid fa-download"></i></span>
              Download Brochure
            </button>
          </div>
          
          {product.description && (
            <div className="product-description1 fade-in-up">
              <p>{product.description}</p>
              {product.detailedDescription && (
                <p className="detailed-description">{product.detailedDescription}</p>
              )}
            </div>
          )}
          
          <div className="product-main-content">
            <div className="product-visual-section">
              <ImageGallery />
              
              {product.specifications && (
                <div className="specifications-section fade-in-right">
                  <h3 className="section-subtitle">Technical Specifications</h3>
                  <div className="specifications-grid">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="spec-item">
                        <span className="spec-name">{spec.name}:</span>
                        <span className="spec-value">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="product-info-sidebar">
              <div className="features-section slide-in-right">
                <h2 className="section-title">Key Features</h2>
                <div className="features-container">
                  {product.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="feature-item stagger-animate"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <span className="feature-icon">✓</span>
                      <p className="feature-text">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="accessories-section fade-in-up">
            <h2 className="section-title">Available Accessories</h2>
            <div className="accessories-grid">
              {product.accessories.map((accessory, index) => (
                <div 
                  key={index} 
                  className="accessory-item stagger-animate"
                  style={{ animationDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <div className="accessory-image-container">
                    <img 
                      src={accessory.image} 
                      alt={accessory.name}
                      onError={(e) => {
                        e.target.src = '/images/placeholder-accessory.png';
                      }}
                    />
                  </div>
                  <h4 className="accessory-name">{accessory.name}</h4>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-section fade-in-up">
            <div className="cta-content">
              <h3>Ready to Learn More?</h3>
              <p>Contact our specialists for a personalized demonstration</p>
              <div className="cta-buttons">
                <button 
                  className="cta-btn primary"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, product: product.title }));
                    setShowDemoModal(true);
                  }}
                >
                  <i className="fas fa-calendar-alt"></i>
                  Request Demo
                </button>
                <button 
                  className="cta-btn secondary"
                  onClick={handleContactSales}
                >
                  <i className="fas fa-phone"></i>
                  Enquiry Now
                </button>
              </div>
              <div className="c contact-info">
                <p>Call Us : <strong>{salesContact.phone}</strong></p>
                <p>Email : <strong>{salesContact.email}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showDemoModal && (
        <DemoModal
          showDemoModal={showDemoModal}
          setShowDemoModal={setShowDemoModal}
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleDemoRequest={handleDemoRequest}
          isSubmitting={isSubmitting}
          submitStatus={submitStatus}
          countries={countries}
          productDetails={productDetails}
          product={product}
        />
      )}
    </div>
  );
};

export default ProductDetail;