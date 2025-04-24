export default function loadBookings(bookings) {
    const menu = document.getElementById('bookings');
    alert('Loading bookings...');

    for (let booking of bookings) {
        const bookingRow = document.createElement('ul');

        const sport = document.createElement('li');
        const time = document.createElement('li');
        const date = document.createElement('li');

        bookingRow.className = 'bookingRow';
        bookingRow.appendChild(sport);
        bookingRow.appendChild(time);
        bookingRow.appendChild(date);
        menu.appendChild(bookingRow);
    }

}