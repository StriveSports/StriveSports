export default function deleteBooking(id){
    const link = `${import.meta.env.VITE_API_URL}/bookings/`+id
    fetch(link, {	
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}