const getUsers= async()=>{
    const response = await fetch('https://back-end-strive-sports.vercel.app/users',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const data = await response.json();
    return data
}

export default getUsers;