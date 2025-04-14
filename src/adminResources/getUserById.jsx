export default async function getUserById(userId) {//returns 0 when user not found
    const user = await fetch('https://back-end-strive-sports.vercel.app/user/byId',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "id" : userId })
    })
    const data = await user.json();
    return data;
}