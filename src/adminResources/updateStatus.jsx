const updateStatus= async(id,statusN)=>{
    const link = 'http://localhost:3000/bookings/'+id;

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