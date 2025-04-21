import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";
import { useState } from 'react';
import STEP1 from '../assets/images/STEP1.jpg';
import STEP2 from '../assets/images/STEP2.jpg';
import STEP3 from '../assets/images/STEP3.jpg';
import STEP4 from '../assets/images/STEP4.jpg';
import STEP5 from '../assets/images/STEP5.jpg';
import STEP6 from '../assets/images/STEP6.jpg';
import STEP7 from '../assets/images/STEP7.jpg';
const Onboard = () => {
    const [hoveredSport, setHoveredSport] = useState(null);
const [selectedSport, setSelectedSport] = useState(null);
    const sportImages = {
        STEP1,
        STEP2,
        STEP3,
        STEP4,
        STEP5,
        STEP6,
        STEP7
      };
    return(
        <>
            <SignedIn>
            <section className="Bookings">
              <section className="book-head">
                <h1 className="head2">Resident User guide</h1>
                </section>
                <section className="booking-body">
                <section className="Sports"> 
                 {["STEP1", "STEP2", "STEP3", "STEP4", "STEP5", "STEP6", "STEP7"].map((sport) => (
                    <h1
                        key={sport}
                        onClick={() => setSelectedSport(sport)}
                        onMouseEnter={() => setHoveredSport(sport)}
                        onMouseLeave={() => setHoveredSport(null)}
                        >
                        {sport}
                    </h1>
                ))}
                </section>
                <section className="hover-image-container">
                 {hoveredSport && (
                     <img
                        src={sportImages[hoveredSport]}
                        alt={hoveredSport}
                        className="hover-preview-image"
                    />
                )}
                </section>
                 
            </section>
            </section>
            <section className='userButton'>
                    <UserButton/>
                    </section>
            </SignedIn>
            <SignedOut>
                <RedirectToSignIn redirectUrl="/Components/Signup/signup"/>
            </SignedOut>
        </>
    )
};

export default Onboard;   