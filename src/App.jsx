import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Signup from './Components/Signup/signup';
import './App.css';

gsap.registerPlugin(ScrollTrigger);


function App() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const moveUp = scrollY * -0.2;

      for (let i = 1; i <= 4; i++) {
        const el = document.getElementById(`ball-${i}`);
        if (el) el.style.transform = `translateY(${moveUp}px)`;
      }

      const aboutSection = document.querySelector('.about-section');
      if (aboutSection) {
        const moveAbout = Math.min(scrollY * 0.08, 10);
        const scale = Math.max(1 - scrollY / 4000, 0.96);
        aboutSection.style.transform = `translateY(-${moveAbout}px) scale(${scale})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="container">
      <nav className="nav">
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#about"  onClick={(e) => {
          e.preventDefault();
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }}>About</a></li>
          <li><a href="#">Contacts</a></li>
          <li><a href="#signup">Sign up</a></li>
        </ul>
      </nav>
      <Home />
      <section id="about" style={{ scrollMarginTop: '120px' }}>
      <About />
      </section>
      <section id="signup" style={({scrollMarginTop: '120px'})}> 
        <Signup />
      </section>
    </section>
  );
}

export default App;