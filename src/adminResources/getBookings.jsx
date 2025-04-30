const getBookings= async()=>{
    const response = await fetch('https://strivesports2-eeb2gxguhnfwcte6.southafricanorth-01.azurewebsites.net/bookings',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    console.log(data);
    alert('Bookings fetched successfully!');
    return data
}

export default getBookings;