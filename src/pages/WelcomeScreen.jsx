import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";
import soccer from '../assets/images/soccerland.jpg'
import runners from '../assets/images/runners.jpg'
import fields from '../assets/images/fields.jpg'
import { useNavigate } from "react-router-dom";
import './WelcomeScreen.css';
export default function ShowUp(){
    const navigate = useNavigate();
    const handleNext = () => {
        navigate('/pages/onboard3');
      };
    return (
        <>
            <SignedIn>
                <section className='app-container'>
                <section className='showup conatainer'>
                <section className='pictures'>
                <section className="card" id="card-1">
                    <img src={soccer} />
                </section>
                <section className="card" id="card-2">
                    <img src={fields} />
                </section>
                <section className="card" id="card-3">
                    <img src={runners} />
                </section>
                </section>
                </section>
                <section className="content-wrapper">
                <section className="text-section">
                    <h1>Welcome to the StriveSports Community</h1>
                    <p>Receive tournament notice, book venues and compete with your neighbors in events.</p>
                </section>
                <section className='button'>
                <button onClick={handleNext} className="next-button">Next</button>
                </section>
                </section>
                <section className='userButton'>
                    <UserButton/>
                    </section>
                </section>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn redirectUrl="/Components/Signup/signup"/>
            </SignedOut>
        </>
    );
}