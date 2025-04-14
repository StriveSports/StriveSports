const getUsers= async()=>{
    const response = await fetch('https://back-end-strive-sports.vercel.app/users');
    const data = await response.json();
    return data
}

export default getUsers;