import React from 'react';
import { BrowserRouter as Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Products from './pages/Product/Products';
import ProductDetail from './pages/Product/ProductDetail';
import Certification from './pages/Certification';
import Video from './pages/Video';
import About from './pages/About';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/certification" element={<Certification />} />
          <Route path="/video" element={<Video />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;