import loadUsers from './loadUsers.jsx';
import updateRole from './updateRole.jsx';
import removeConfigMenu from './removeConfigMenu.jsx';
import './AdminDashboard.css';
import { UserButton } from '@clerk/clerk-react';
import getBookings from './getBookings.jsx';
import updateStatus from './updateStatus.jsx';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import getUsers from './getUsers.jsx';
import { useState, useEffect } from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { formatDate } from '@fullcalendar/core/index.js';

export default function AdminDashboard() {

    //Loading the bookings
    
    let bookings;
    
    getBookings().then((data) => {
        //DOM Manipulation

        let menu = document.getElementById('bookings');
        for (let booking of data) {
            const bookingRow = document.createElement('ul');

            

            const sport = document.createElement('li');
            const time = document.createElement('li');
            const date = document.createElement('li');
            const status = document.createElement('li');

            sport.innerText = booking.sport;
            time.innerText = booking.time;
            date.innerText = booking.date;
            status.innerText = booking.status;
            

            bookingRow.className = 'bookingRow';
            status.className = 'bookingStatus';


            bookingRow.addEventListener('click', () => {//onclick Functionality for each row
                if (status.innerText === 'pending') {
                    status.innerText = 'approved';
                    updateStatus(booking._id, 'approved');
                    status.style.backgroundColor = 'lime';

                } else if (status.innerText === 'approved') {
                    status.innerText = 'rejected';
                    updateStatus(booking._id, 'rejected');
                    status.style.backgroundColor = 'red';

                } else if (status.innerText === 'rejected') {

                    status.innerText = 'pending';
                    updateStatus(booking._id, 'pending');
                    status.style.backgroundColor = 'aquamarine';
                }
                else{
                    alert('Unexpected status');
                }
            })

            bookingRow.appendChild(sport);
            bookingRow.appendChild(time);
            bookingRow.appendChild(date);
            bookingRow.appendChild(status);
            menu.appendChild(bookingRow);
        }
        
    })


    //Loading the bookings
    function loadBookings(){
        
        const bookingMenu = document.getElementById('bookings');
        const button = document.querySelector('.bookingsMenuButt');
        if (bookingMenu.style.left === '0px'){
            bookingMenu.style.left = '-25vw';
            button.style.right = '1%';
        }
        else{
            bookingMenu.style.left = 0;
            button.style.right = '65vw';
        }
    }

    //creating the user table 
    const [rows, setRows] = useState([]);

    useEffect(() => {
        getUsers().then((data) => {
            const processedRows = data.map(element => ({
                id: element.id,
                name: element.firstName,
                lastName: element.lastName,
                email: element.emailAddresses[0].emailAddress,
                role: element.publicMetadata.role || "none",
            }));

            setRows(processedRows); //Updates state, triggering re-render
        });
    }, []);

    //Role update functionality
    const roleChange = (row) => {
        localStorage.setItem('userId', row.id);
        const configMenu = document.getElementById('configMenu');
        configMenu.style.left = '40%';
    }

    //Calender

    const Calender = () => {

    }
    const [currentEvent, setCurrentEvent] = useState([]);

    const handleDateClick = (date) => {
        const title = prompt('Please enter a new title for your event');

        const calendarApi = date.view.calendar;
        calendarApi.unselect(); // clear date selection
        if (title) {
            calendarApi.addEvent({
                title,
                start: date.startStr,
                end: date.endStr,
                allDay: date.allDay,
            });
        }
        else{
            alert('Please enter a title for the event');
        }
    }

    const handleEventClick = (clickInfo) => {
        if (window.confirm(`Are you sure you want to delete this event?`)) {
            clickInfo.event.remove();
        }
    }


    return(
        <main className='adminDashBoardBody'>
        <h1 className='adminDashboard'>Admin Dashboard</h1>
        
        <section className='configMenu' id='configMenu'>
            <button onClick={()=>updateRole('Facility staff')} className='updateRole'>Facility staff</button>
            <button onClick={()=>updateRole('resident')} className='updateRole'>resident</button>
            <button onClick={()=>updateRole('admin')} className='updateRole'>admin</button>
            <button onClick={()=>updateRole('none')} className='updateRole'>none</button>
            <button onClick={()=>updateRole('removed')} className='updateRole'>removed</button>
            <button onClick={removeConfigMenu} className='updateRole'>complete</button>
        </section>

        <section>
            <section className='userButton'>
                <UserButton></UserButton>
            </section>
            <button onClick={loadBookings} className='bookingsMenuButt'>Booking</button>
        </section>
        
        <section id='bookings' className='bookings'></section>

        <section className='usersTable'>
        <Box>
            <DataGrid
                rows={rows}
                columns={[
                    { field: 'name', headerName: 'Name', flex: 1 },
                    { field: 'lastName', headerName: 'Last Name', flex: 1 },
                    { field: 'email', headerName: 'Email', flex: 2 },
                    { field: 'role', headerName: 'Role', flex: 1,

                        renderCell: (params) => (
                            <button onClick={() => roleChange(params.row)}>
                                {params.value}
                            </button>
                        ),
            
                     },
                ]}
                pageSize={5}
                rowsPerPageOptions={[5]}
                sx={{
                    "& .MuiDataGrid-root": { fontFamily: "Arial, sans-serif" },
                    "& .MuiDataGrid-cell": { fontSize:"large" },
                }}
            
                
            />
        </Box>
        </section>

        
        <section className='calenderAndBookings'>
            <Box className='bookingsBox'>
                <header title='Calendar' className='header'></header>
                <Box flex="1 1 20%">
                    <Typography variant="h4">Events</Typography>
                    <List>
                        {currentEvent.map((event) => (
                            <ListItem
                            key = {event.id}
                            sx = {{ backgroundColor: event.color, padding: 2, margin: 1, borderRadius: 2 }}

                            >

                        <ListItemText
                            primary={event.title}
                            secondary={
                                <Typography>
                                    {formatDate(event.start, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </Typography>
                            }
                        ></ListItemText>
                        </ListItem>
                        )
                        )}
                    </List>
                </Box>
            </Box>

            <Box className='calenderBox'>
                <FullCalendar
                    height='75vh'
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay',
                    }}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    select={handleDateClick}
                    eventClick={handleEventClick}
                    eventsSet={(events) => setCurrentEvent(events)}
                    initialEvents={[
                        { id: '1', title: 'All-day event', date: '2025-04-30' },
                        { id: '2', title: 'Timed event', date: '2025-05-02' },
                    ]} // alternatively, use a more local state
                ></FullCalendar>
            </Box>
        </section>
        </main>
    )
}