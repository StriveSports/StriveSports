import removeConfigMenu from "./removeConfigMenu";

export default async function updateRole(newRole) {
    const userId = localStorage.getItem('userId');

    try{
        const response = await fetch('https://strivesports2-eeb2gxguhnfwcte6.southafricanorth-01.azurewebsites.net/users/roleUpdate',{
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