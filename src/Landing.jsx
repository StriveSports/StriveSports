import { useRef, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from "./components/Home/Home";
import About from "./components/About/About";
import SignUp from "./components/SignUp/signup";
import './App.css';

gsap.registerPlugin(ScrollTrigger);


function Landing() {
  useEffect(() => {
    let requestId = null;
  
    const handleScroll = () => {
      if (requestId) return;
      requestId = requestAnimationFrame(() => {
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
  
        requestId = null;
      });
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
          <li><a href="#signup">Sign in</a></li>
        </ul>
      </nav>
      <Home />
      <section id="about" style={{ scrollMarginTop: '120px' }}>
      <About />
      </section>
      <section id="signup" style={{scrollMarginTop: '120px',minHeight: '100vh'}}> 
        <SignUp />
      </section>
    </section>
    
    
  );
}

export default Landing;