import './signup.css';
import card1 from '../../assets/images/card1.jpg';
import card2 from '../../assets/images/card2.jpg';
import card3 from '../../assets/images/card3.jpg';
import card4 from '../../assets/images/card4.jpg';
import card5 from '../../assets/images/card5.jpg';
const signup= () => {
return(
    <section className="signup-section">
        <section className="text">
            <h1>Sign up</h1>
        </section>
        <section className="card" id="card-1">
          <img src={card1} alt="card 1" />
        </section>
        <section className="card" id="card-3">
          <img src={card3} alt="card 3" />
        </section>
        <section className="card" id="card-4">
          <img src={card4} alt="card 4" />
        </section>
        
    <section className="buttons">
        <button>Admin</button>
        <button>Staff</button>
        <button>Resident</button>
    </section>
    </section>
);
  

};
export default signup;