import removeConfigMenu from "./removeConfigMenu";

export default async function updateRole(newRole) {
    const userId = localStorage.getItem('userId');

    try{
        const response = await fetch('https://back-end-strive-sports.vercel.app/users/roleUpdate',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id:userId,
                role:newRole
            })
        });
    }
    catch(error){
        console.error('Error:', error);
    }
    localStorage.setItem('userId',null);
    removeConfigMenu();
    
}