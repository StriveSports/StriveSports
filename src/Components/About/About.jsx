import React from 'react';
import './About.css';
import runningman from '../../assets/images/runningman.png';

const About = () => {
  return (
    <section className="about-section">
      <section className="about-text">
        <h2>About Us</h2>
        <p>
        Built for the residents and driven by the passion of our local sports admins, this space is where neighbors connect, compete, and grow together.
        Whether you're organizing events, joining your first community game, or cheering from the sidelines, StriveSports is your go-to hub for all things local and active. We're here to promote healthy living, foster teamwork, and celebrate every stride — big or small.

        Let’s move together. Let’s Strive.
        </p>
      </section>
      <section className="about-image">
        <img src={runningman} alt="Running Man" />
      </section>
      
    </section>
  );
};

export default About;