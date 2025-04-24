import loadUsers from './loadUsers.jsx';
import updateRole from './updateRole.jsx';
import removeConfigMenu from './removeConfigMenu.jsx';
import './AdminDashboard.css';
import { UserButton } from '@clerk/clerk-react';
import getBookings from './getBookings.jsx';
import updateStatus from './updateStatus.jsx';

export default function AdminDashboard() {
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

        <section id='bookings' className='bookings'></section>
        </main>
    )
}