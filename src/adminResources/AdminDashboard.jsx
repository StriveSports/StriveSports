import loadUsers from './loadUsers.jsx';
import updateRole from './updateRole.jsx';
import removeConfigMenu from './removeConfigMenu.jsx';
import './AdminDashboard.css';
import { UserButton } from '@clerk/clerk-react';
import getBookings from './getBookings.jsx';

export default function AdminDashboard() {
    let bookings;
    getBookings().then((data) => {
        bookings = data;
        loadBookings(bookings);
    })

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

    return(
        <main className='adminDashBoardBody'>
        <h1 className='adminDashboard'>Admin Dashboard</h1>
        <button onClick={loadUsers} className='loadUsers'>Load users</button>
        
        <section className='configMenu' id='configMenu'>
            <button onClick={()=>updateRole('Facility staff')} className='updateRole'>Facility staff</button>
            <button onClick={()=>updateRole('resident')} className='updateRole'>resident</button>
            <button onClick={()=>updateRole('admin')} className='updateRole'>admin</button>
            <button onClick={()=>updateRole('none')} className='updateRole'>none</button>
            <button onClick={()=>updateRole('removed')} className='updateRole'>removed</button>
            <button onClick={removeConfigMenu} className='updateRole'>complete</button>
        </section>

        <ul id='usersTable' className='usersTable' ></ul>
        <section className='userButton'>
            <UserButton></UserButton>
        </section>
        <button onClick={loadBookings} className='bookingsMenuButt'>Booking</button>

        <section id='bookings' className='bookings'>
        </section>
        </main>
    )
}