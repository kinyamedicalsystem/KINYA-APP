// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WelcomeModal from './components/Modal/Welcome';
import Home from './pages/Home';
import ProductDetail from './pages/Product/ProductDetail';
import Certification from './pages/Certification';
import Products from './pages/Product/Products';
import Video from './pages/Video';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
   return(
 <Router>
      <div className="App">
        <WelcomeModal/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/video" element={<Video />} />
           <Route path="/certification" element={<Certification />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
    
      </div>
    </Router>

  );
 
 
}

export default App;
