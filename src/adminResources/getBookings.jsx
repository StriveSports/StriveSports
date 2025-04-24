const getBookings= async()=>{
    const response = await fetch('http://localhost:3000/bookings',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data
}

export default getBookings;