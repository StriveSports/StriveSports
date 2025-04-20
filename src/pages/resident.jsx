import{ SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";
import {useTypewriter,Cursor} from 'react-simple-typewriter';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Hockey from '../assets/images/Hockey.jpg';
import Basketball from '../assets/images/Basketball.jpg';
import Netball from '../assets/images/Netball.jpg';
import Rugby from '../assets/images/Rugby.jpg';
import Swimming from '../assets/images/Swimming.jpg';
import Tennis from '../assets/images/Tennis.jpg';
import Track from '../assets/images/Track.jpg';
import Soccer from '../assets/images/NewSoccer.jpg';
import Marquee from 'react-fast-marquee';
import "@fullcalendar/common/main.css";
import './resident.css';
export default function Res(){
    const [text] = useTypewriter({
        words: ['Striving.', 'Thriving.','Living.'],
        loop: true,
        typeSpeed: 70,
        deleteSpeed: 70,
        delaySpeed: 1500
    });
    const sportImages = {
        Tennis,
        Swimming,
        Basketball,
        Netball,
        Soccer,
        Hockey,
        Track,
        Rugby,
      };
    const [selectedSport, setSelectedSport] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState("");
    const [hoveredSport, setHoveredSport] = useState(null);
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
                <h1>Book Venue.</h1>
                <section className="booking-body">
                <section className="Sports"> 
                 {["Tennis", "Swimming", "Basketball", "Netball", "Soccer", "Hockey", "Track", "Rugby"].map((sport) => (
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
            <section className="marquee-section">
                <Marquee play>
                    <section className="text_wrap">
                    🏀 Upcoming Events •
                    </section>
                    <section className="text_wrap">
                    🎾 Upcoming Events •
                    </section>
                    <section className="text_wrap">
                    ⚽ Upcoming Events •
                    </section>
                    <section className="text_wrap">
                    🏊 Upcoming Events •
                    </section>
                    <section className="text_wrap">
                    🏉 Upcoming Events •
                    </section>
                    <section className="text_wrap">
                    🏑 Upcoming Events •
                    </section>
                    <section className="text_wrap">
                    🏐 Upcoming Events •
                    </section>
                    <section className="text_wrap">
                    🏃 Upcoming Events • 
                    </section>

                </Marquee>
            </section>
            <section className="calendar-section">
                <h2>Event Calendar.</h2>
                <FullCalendar
                  plugins={[dayGridPlugin]} // Register the dayGrid plugin
                  initialView="dayGridMonth" // Default view
                />
            </section>
        </section>
        </section>
        </SignedIn>
        <SignedOut>
            <RedirectToSignIn redirectUrl="/Components/Signup/signup"/>
        </SignedOut>
        </>
    );
}