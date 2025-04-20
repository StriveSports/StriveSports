import{ SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";
import {useTypewriter,Cursor} from 'react-simple-typewriter';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './resident.css';
export default function Res(){
    const [text] = useTypewriter({
        words: ['Striving.', 'Thriving.','Living.'],
        loop: true,
        typeSpeed: 70,
        deleteSpeed: 70,
        delaySpeed: 1500
    });
    
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const timeSlots = Array.from({ length: 12 }, (_, i) => {
        const hour = i + 8;
        const ampm = hour < 12 ? "AM" : "PM";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${displayHour}:00 ${ampm}`;
      });
    return (
        <>
        <SignedIn>
        <section className="app-cont">
         <section className='userButton'><UserButton/></section>
            <section className='cont'>
            <section className="designer-container">
                <h1 className="designer-title">Resident,</h1>
                <h1 className="designer-subtitle">{text}
                <Cursor cursorStyle="|" /></h1>
            </section>
            <section className="Bookings">
                <h1>Book Venue</h1>
                 <section className="Sports"> 
                    <h1 onClick={() => setSelectedSport("Tennis")}>Tennis</h1>
                    <h1 onClick={() => setSelectedSport("Swimming")}>Swimming</h1>
                    <h1 onClick={() => setSelectedSport("Baketball")}>Basketball</h1>
                    <h1 onClick={() => setSelectedSport("Netball")}>Netball</h1>
                    <h1 onClick={() => setSelectedSport("Soccer")}>Soccer</h1>
                    <h1 onClick={() => setSelectedSport("Hockey")}>Hockey</h1>
                    <h1 onClick={() => setSelectedSport("Track")}>Track</h1>
                    <h1 onClick={() => setSelectedSport("Rugby")}>Rugby</h1>
                </section>
            </section>
            {selectedSport && (
            <section className="popup-overlay" onClick={() => setSelectedSport(null)}>
            <section className="popup" onClick={(e) => e.stopPropagation()}>
              <h2>{selectedSport}</h2>
        
              <label htmlFor="date" style={{ display: "block", marginTop: "1rem" }}>
                Pick a date:
              </label>
              <DatePicker
                id="date"
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a date"
                className="date-picker"
              />
        
              <label htmlFor="timeSlot" style={{ display: "block", marginTop: "1rem" }}>
                Pick a time:
              </label>
              <select
                id="timeSlot"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="time-dropdown"
              >
                <option value="">-- Select a time --</option>
                {timeSlots.map((slot, idx) => (
                  <option key={idx} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
        
              {selectedDate && selectedTime && (
                <p style={{ marginTop: "1rem" }}>
                  Booking for <strong>{selectedSport}</strong> on{" "}
                  <strong>{selectedDate.toDateString()}</strong> at{" "}
                  <strong>{selectedTime}</strong>
                </p>
              )}        
                <button className="book-button" onClick={() => setSelectedSport(null)}>Book</button>
             </section>
            </section>
            )}
            </section>
        </section>
        </SignedIn>
        <SignedOut>
            <RedirectToSignIn redirectUrl="/Components/Signup/signup"/>
        </SignedOut>
        </>
    );
}