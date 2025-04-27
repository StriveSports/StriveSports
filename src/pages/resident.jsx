import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton
} from "@clerk/clerk-react";
import { useTypewriter, Cursor } from 'react-simple-typewriter';
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
import axios from 'axios';
import { ToastContainer, toast,Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from '@clerk/clerk-react';




export default function Res() {
  const { user } = useUser();
  const [text] = useTypewriter({
    words: ['Striving.', 'Thriving.', 'Living.'],
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

  //user variable for auth() and test is for storing user information.
  //  const{userId} = useAuth();
  //  const test = localStorage.getItem(userId);

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8;
    const ampm = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${displayHour}:00 ${ampm}`;
  });

  const [selectedFacility, setSelectedFacility] = useState('');
  const [description, setDescription] = useState('');

  const handleFacilityChange = (e) => {
    setSelectedFacility(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFacility || !description) {
      alert("Please insert all fields accurately.");
      toast.warn("Please insert all fields accurately.");
      return;
    }

    const reportData = {
      facility: selectedFacility,
      issue: description,
      residentInfo: user?.id || "Unknown" //clerk suppose to handle this.
    };

    try {
      const response = await fetch("https://strivesports2-eeb2gxguhnfwcte6.southafricanorth-01.azurewebsites.net/reports", { //https://localhost:8080/reports
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Reporting successful!");
        toast.success("Reporting successful!");
        setSelectedFacility('');
        setDescription('');
      } else {
        alert("Reporting failed: " + result.message);
        toast.error("Reporting failed: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error while reporting.");
      toast.warn("Server error while reporting.");
    }
  };

  useEffect(() => {
    const circle = document.querySelector('.circle p');
    circle.innerHTML = circle.innerText
      .split("")
      .map(
        (char, i) =>
          `<section style="transform:rotate(${i * 10}deg)">${char}</section>`
      )
      .join("");
  }, []);

  return (
    <>
      <SignedIn>
        <section className="app-cont">
          <section className='userButton'>
            <UserButton />
          </section>

          <section className='cont'>
            <section className="designer-container">
              <h1 className="designer-title">Resident,</h1>
              <h1 className="designer-subtitle">
                {text}
                <Cursor cursorStyle="|" />
              </h1>
            </section>

            <section className="Bookings">
              <section className="book-head">
                <h1 className="head2">Book</h1>
                <h1 className="head2">Venue.</h1>
              </section>

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
                        <option key={idx} value={slot}>{slot}</option>
                      ))}
                    </select>

                    {selectedDate && selectedTime && (
                      <p style={{ marginTop: "1rem" }}>
                        Booking for <strong>{selectedSport}</strong> on{" "}
                        <strong>{selectedDate.toDateString()}</strong> at{" "}
                        <strong>{selectedTime}</strong>
                      </p>
                    )}

                    <button
                      className="book-button"
                      onClick={async () => {
                        if (!selectedDate || !selectedTime) {
                          toast.warn("Please select a date and time before booking.");
                          return;
                        }

                        const bookingData = {
                          sport: selectedSport,
                          date: selectedDate.toLocaleDateString('en-CA'),
                          time: selectedTime,
                          residentInfo:user?.id || "Unknown" // possibly add Clerk user ID here
                        };

                        try {
                          const response = await fetch(
                            "https://strivesports2-eeb2gxguhnfwcte6.southafricanorth-01.azurewebsites.net/bookings",
                            {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json"
                              },
                              body: JSON.stringify(bookingData),
                            }
                          );

                          const result = await response.json();
                          if (response.ok) {
                            toast.success("Booking successful!");
                          } else {
                            toast.error("Booking failed: " + result.message);
                          }
                        } catch (err) {
                          console.error(err);
                          toast.error("Server error while booking.");
                        }

                        setSelectedDate(null);
                        setSelectedTime("");
                      }}
                    >
                      Book
                    </button>
                   
                  </section>
                </section>
              )}
            </section>

            <section className="marquee-section">
              <Marquee play>
                {Array(8).fill(<section className="text_wrap">Upcoming Events •</section>)}
              </Marquee>
            </section>

            <section className="calendar-section">
              <section className="calendar-heading">
                <h2>Event</h2>
                <h2 className="cal">Calendar.</h2>
              </section>
              <FullCalendar
                plugins={[dayGridPlugin]} // Register the dayGrid plugin
                initialView="dayGridMonth" // Default view
              />
            </section>

            <section className="reports">
              <section className="report-head">
                <h2>Report</h2>
                <h2 className="hed2">Faults</h2>
              </section>

              <form className="report-form" onSubmit={handleReportSubmit}>
        <label htmlFor="facility">Facility</label>
        <select id="facility" value={selectedFacility} onChange={handleFacilityChange}>
          <option value="">Select Facility</option>
          <option value="Tennis Court">Tennis Court</option>
          <option value="Swimming Pool">Swimming Pool</option>
          <option value="Soccer Field">Soccer Field</option>
          <option value="Basketball Court">Basketball Court</option>
          <option value="Netball Court">Netball Court</option>
          <option value="Gym">Gym</option>
        </select>

                <label htmlFor="description">What's the issue?</label>
                <textarea
                  id="description"
                  rows="4"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="e.g. Net is torn, lights not working..."
                />

                <button type="submit" className="log-button">Log Report</button>
              </form>

              <section className="caution">
                <section className="circle">
                  <p>Caution • Report • Caution • Fault • </p>
                </section>
              </section>
            </section>
          </section>
        </section>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn redirectUrl="/Components/Signup/signup" />
      </SignedOut>
      <ToastContainer
                              position="top-center"
                              autoClose={3000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick={false}
                              rtl={false}
                              pauseOnFocusLoss
                              draggable
                              pauseOnHover
                              theme="light"
                              transition={Bounce}
                        />
    </>
    
  );
}