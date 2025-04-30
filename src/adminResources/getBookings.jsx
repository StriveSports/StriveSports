const getBookings= async()=>{
    const response = await fetch(`${import.meta.env.VITE_API_URL}/bookings`, {	
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data
}

export default getBookings;