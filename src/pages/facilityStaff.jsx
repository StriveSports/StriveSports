import './facilityStaff.css';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import removeConfigMenu from '../adminResources/removeConfigMenu';
import getUsers from '../adminResources/getUsers';
import { UserButton } from '@clerk/clerk-react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { formatDate } from '@fullcalendar/core';


export default function FacilityStaff() {

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

    //Calender on click event
    const [currentEvent, setCurrentEvent] = useState([]);

    const handleEventClick = (clickInfo) => {
        if (window.confirm(`event details...`)) {
        }
    }

    //Menu update functionality


    return(
        <main className='facilityStaff'>
        <h1 className='adminDashboard'>Facility Staff</h1>
        
        <section className='configMenu' id='configMenu'>
            <button onClick={()=>updateRole('Facility staff')} className='updateRole'>Not started</button>
            <button onClick={()=>updateRole('resident')} className='updateRole'>In Progress</button>
            <button onClick={()=>updateRole('admin')} className='updateRole'>Done</button>
            <button onClick={()=>updateRole('none')} className='updateRole'>Can not be fixed</button>
            <button onClick={removeConfigMenu} className='updateRole'>Cancel</button>
        </section>

        <section>
            <section className='userButton'>
                <UserButton></UserButton>
            </section>
        </section>

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
                            sx = {{ backgroundColor: 'aqua', padding: 2, margin: 1, borderRadius: 2 }}

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
                                  {" | "}
                                  {formatDate(event.start, { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })} - {formatDate(event.end, 
                                  { hour: '2-digit', minute: '2-digit' })}
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
                    eventClick={handleEventClick}
                    eventsSet={(events) => setCurrentEvent(events)}
                    initialEvents={[
                        { id: '1', title: 'Meeting', start: '2025-05-02T09:00:00', end: '2025-05-02T10:00:00' },
                    ]} // alternatively, use a more local state
                ></FullCalendar>
            </Box>
            
        </section>
        </main>
    )
}