const updateStatus= async(id,statusN)=>{
    const link = 'https://strivesports2-eeb2gxguhnfwcte6.southafricanorth-01.azurewebsites.net/bookings/'+id;

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