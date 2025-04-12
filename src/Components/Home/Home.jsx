import React from 'react';
import './Home.css';
import ShowUp from '../../showup';
import ball1 from '../../assets/images/ball1.png';
import ball2 from '../../assets/images/ball2.png';
import ball3 from '../../assets/images/ball3.png';
import ball4 from '../../assets/images/ball4.png';

const Home = () => {
    return (
      <section style={{ paddingTop: "12vh", paddingBottom: "12vh" }}>
      <section className="strive">
        <ShowUp />
        <section className="ball" id="ball-1">
          <img src={ball1} alt="ball 1" />
        </section>
        <section className="ball" id="ball-2">
          <img src={ball2} alt="ball 2" />
        </section>
        <section className="ball" id="ball-3">
          <img src={ball3} alt="ball 3" />
        </section>
        <section className="ball" id="ball-4">
          <img src={ball4} alt="ball 4" />
        </section>
      </section>
      </section>
    );
  };
  
  export default Home;