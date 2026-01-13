// src/pages/Video.jsx
import React, { useState, useEffect } from 'react';
import './Video.css';
import V1 from '/THUMB/MACHINE.mp4';
import V2 from '/THUMB/HOPE.mp4';
import V3 from '/THUMB/TESTO.mp4';



function Video() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [playingVideo, setPlayingVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const videoItems = [
    {
      id: 1,
      title: 'Hope 10000 and its Features',
      description: 'Advanced Cutting Technology Supports DORC / MIDLAB / DUAL PNEUMATIC Cutters,Venturi Pump with 2 Suction Lines for Extrusion and Cutter Aspiration,50,000 HRS LED Life and Enables with 23G / 25G / 27G Surgeries,Automated Infusion Control with Infusion Compansation Algorithm,23G Phaco Fragmantation,Multi Functional Foot Pedal',
      thumbnail: './THUMB/THUMBM.png',
      duration: '1:12',
      videoUrl: V1,
      youtubeId: '',
      type: 'local'
    },
    {
      id: 2,
      title: 'Dr.Srinivas Joshi - Table Top TRD on HOPE 10000 Vitrectomy using 25G DORC cutter',
      description: 'Dr. Srinivas Joshi performs a Table Top Tractional Retinal Detachment (TRD) procedure using the advanced HOPE 10000 vitrectomy system and a 25G DORC cutter. This detailed walkthrough showcases the precision, control, and efficiency of modern vitreoretinal surgery techniques.',
      thumbnail: './THUMB/THUMB1.png',
      duration: '15.07',
      videoUrl: 'https://drive.google.com/file/d/16XxJxnxzkxxLo9F_CBtZ545XrvWY8DoO/preview',
      youtubeId: '',
      type: 'drive'
    },
    {
      id: 3,
      title: 'TRD Surgery on HOPE Vitrectomy system by Dr. Sriramgopal',
      description: 'Dr. Sriramgopal as he performs a Tractional Retinal Detachment (TRD) surgery using the advanced HOPE Vitrectomy System. This video demonstrates key surgical techniques, precision handling, and the superior performance of the HOPE system in managing complex retinal conditions. ',
      thumbnail: './THUMB/TUMB2.png',
      duration: '11:13',
      videoUrl: 'https://www.youtube.com/embed/FaBGlpKs5E0?si=DwGyz8N8_elEaA8F',
      youtubeId: 'FaBGlpKs5E0',
      type: 'youtube'
    },
    {
      id: 4,
      title: 'Customer Testimonial ',
      description: 'Hear from our customers using HOPE Posterier Vitrectomy System.',
      thumbnail: './THUMB/THUMB7.png',
      duration: '3:15',
      videoUrl: V3,
      youtubeId: '',
      type: 'local'
    },
    {
      id: 5,
      title: 'Dr.Ruchir Tiwari- Diabetic surgery using Constellation Cutter on HOPE vitrectomy',
      description: 'Dr. Ruchir Tiwari perform a diabetic vitrectomy surgery using the Constellation Cutter on the HOPE Vitrectomy System. This video highlights the precision, stability, and advanced control offered by the HOPE platform in managing diabetic retinal complications.',
      thumbnail: './THUMB/THUMB6.png',
      duration: '11:09',
      videoUrl: 'https://www.youtube.com/embed/0WHkJ60rDFc?si=-2FSOIytWbToq1JU',
      youtubeId: '0WHkJ60rDFc',
      type: 'youtube'
    },
  
    
    {
      id: 6,
      title: 'Dr.Siddarth Sane,Managing an Aphakic Retinal Detachment with Pars Plana Vitrectomy (PPV + EL + SOI).',
      description: 'This surgical video demonstrates the management of an aphakic retinal detachment using Pars Plana Vitrectomy (PPV) combined with Endolaser (EL) and Silicone Oil Injection (SOI). ',
      thumbnail: './THUMB/THUMB4.png',
      duration: '9:32',
      videoUrl: 'https://www.youtube.com/embed/xpXXRgzLYxc?si=AH6LTCA04kFEiTx6', // Youtube video
      youtubeId: 'AH6LTCA04kFEiTx6',
      type: 'drive'
    },
    {
      id: 7,
      title: 'Managing Hard Catract using HOPE combined Posterior Vitrectomy System',
      description: 'To Managing Hard Cataract cases using the HOPE (High Output Phacoemulsification Efficiency) system. Hard cataracts can pose significant surgical challenges, and the HOPE system offers a reliable and efficient solution for safe lens fragmentation and removal. ',
      thumbnail: './THUMB/THUMB5.png',
      duration: '1:51',
      videoUrl: V2, // Google Drive video
      youtubeId: '',
      type: 'local'
    },
     {
      id: 8,
      title: 'Managing Hard Catract using PHACO EMULSIFICATION System',
      description: 'Management of Hard Cataract using Smart-pulse mode in HOPE Phaco Emulsification system by Dr.Manjunath , Manjunatha Nethralaya Eye Hospital , Bangalore ',
      thumbnail: './THUMB/HARD.png',
      duration: '2:36',
      videoUrl: 'https://www.youtube.com/embed/B50CshVZmMU?si=hMGnYhMcq7L3GmF9', // Youtube video
      youtubeId: 'hMGnYhMcq7L3GmF9',
      type: 'local'
    }
  ];

  const featuredVideo = {
    id: 0,
    title: 'Introduction to Kinya Medical',
    description: 'Learn about our company mission, values, and the range of products and services that we offer.',
    thumbnail: './THUMB/LO.png',
    duration: '10:35',
    videoUrl: 'https://youtube.com/shorts/CmIO4lfsKds?si=7k6o0uHab3ngzhkI', // Local video
    youtubeId: 'CmIO4lfsKds',
    type: 'youtube'
  };

  // Detect theme changes from navbar
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.body.classList.contains('dark');
      setCurrentTheme(isDark ? 'dark' : 'light');
    };

    // Initial check
    checkTheme();

    // Observe theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const openVideoModal = (video) => {
    // Immediately scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Small delay to ensure scroll completes before modal opens
    setTimeout(() => {
      setPlayingVideo(video);
      setIsModalOpen(true);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    }, 300);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setPlayingVideo(null);
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.keyCode === 27) {
        closeVideoModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  const VideoPlayer = ({ video }) => {
    if (video.type === 'youtube' && video.youtubeId) {
      return (
        <div className="video-player-container">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    } else if (video.type === 'drive') {
      // Google Drive video
      return (
        <div className="video-player-container">
          <div className="video-wrapper">
            <iframe
              width="100%"
              height="100%"
              src={video.videoUrl}
              title={video.title}
              frameBorder="0"
              allow="autoplay"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      );
    } else {
      // Local video or direct URL
      return (
        <div className="video-player-container">
          <div className="video-wrapper">
            <iframe
             width="100%"
              height="100%"
            src={video.videoUrl} 
            type="video/mp4"
              frameBorder="0"
              allow="autoplay"
              allowFullScreen>
               </iframe>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={`video-page ${currentTheme}`}>
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Videos</h1>
          <p className="page-subtitle">
            Watch product demonstrations, training tutorials, and customer testimonials
          </p>
        </div>
        
        {/* Featured Video Section */}
        <div className="featured-video-section">
          <div className="featured-video">
            <div className="video-container">
              <div 
                className="video-placeholder featured"
                onClick={() => openVideoModal(featuredVideo)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && openVideoModal(featuredVideo)}
              >
                <img src={featuredVideo.thumbnail} alt={featuredVideo.title} />
                <div className="play-overlay">
                  <i className="fas fa-play-circle"></i>
                  <p>Watch Featured Video</p>
                </div>
                <div className="video-duration">{featuredVideo.duration}</div>
              </div>
            </div>
            <div className="video-details">
              <h2>{featuredVideo.title}</h2>
              <p>{featuredVideo.description}</p>
              <div className="video-meta">
                <span><i className="fas fa-clock"></i> {featuredVideo.duration}</span>
                <span><i className="fas fa-calendar-alt"></i> March 15, 2023</span>
                <span><i className="fas fa-eye"></i> 1,245 views</span>
              </div>
              <button 
                className="watch-btn primary"
                onClick={() => openVideoModal(featuredVideo)}
              >
                <i className="fas fa-play"></i> Watch Now
              </button>
            </div>
          </div>
        </div>
        
        {/* Video Library */}
        <div className="video-library">
          <div className="section-header">
            <h2>Video Library</h2>
            <p>Browse our complete collection of educational and promotional videos</p>
          </div>
          <div className="video-grid">
            {videoItems.map(video => (
              <div key={video.id} className="video-card">
                <div 
                  className="video-thumbnail"
                  onClick={() => openVideoModal(video)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && openVideoModal(video)}
                >
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="play-overlay">
                    <i className="fas fa-play"></i>
                  </div>
                  <div className="video-duration">{video.duration}</div>
                </div>
                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <div className="video-actions">
                    <button 
                      className="watch-btn secondary"
                      onClick={() => openVideoModal(video)}
                    >
                      <i className="fas fa-play"></i> Watch Video
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal - Always positioned at top */}
      {isModalOpen && playingVideo && (
        <div className="video-modal">
          <div className="modal-overlay" onClick={closeVideoModal}></div>
          <div className="modal-content">
            <div className="modal-header1">
              <h3>{playingVideo.title}</h3>
              <button 
                className="close-btn" 
                onClick={closeVideoModal}
                aria-label="Close video"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <VideoPlayer video={playingVideo} />
            <div className="modal-footer">
              <p>{playingVideo.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Video;