const updateStatus= async(id,statusN)=>{
    const link = `${import.meta.env.VITE_API_URL}/bookings/`+id;

    const response = await fetch(link,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: statusN
        })
    });
    const data = await response.json();
}

export default updateStatus;