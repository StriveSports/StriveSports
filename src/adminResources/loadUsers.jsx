import getUsers from './getUsers.jsx';

export default async function loadUsers() {
    const data = await getUsers();
    let table = document.getElementById('usersTable');
    table.innerHTML = '';

    //for title
    let li = document.createElement('li');
    let row = document.createElement('ul');

    let name = document.createElement('li');
    let surname = document.createElement('li');
    let email = document.createElement('li');
    let role = document.createElement('li');

    name.innerText = 'Name';
    surname.innerText = 'Surname';
    email.innerText = 'Email';
    role.innerText = 'Role';

    row.appendChild(name);
    row.appendChild(surname);
    row.appendChild(email);
    row.appendChild(role);
    row.className = 'tableRow';

    li.appendChild(row);
    table.appendChild(li);

    // for the actual users

    let i=0;

    data.forEach(element=>{
        let li = document.createElement('li');
        let row = document.createElement('ul');

        let name = document.createElement('li');
        let surname = document.createElement('li');
        let email = document.createElement('li');
        let role = document.createElement('li');

        surname.className = 'surname';
        email.className = 'email';
        role.className = 'role';

        const userId = element.id;

        name.innerText = element.firstName;
        surname.innerText = element.lastName;
        email.innerText = element.emailAddresses[0].emailAddress;
    
        if (!element.publicMetadata.role){
            role.innerText = "none";
            
        }
        else{
            role.innerText = element.publicMetadata.role;
        }

        row.appendChild(name);
        row.appendChild(surname);
        row.appendChild(email);
        row.appendChild(role);

        row.className = 'tableRow';
        if (i%2){
            row.style.backgroundColor = 'white';
        }
        else{
            row.style.backgroundColor = 'lightgray';
        }

        row.addEventListener('click',()=>{
               localStorage.setItem('userId', userId);
                const configMenu = document.getElementById('configMenu');
                configMenu.style.left = '40%';
        });
        li.appendChild(row);

        table.appendChild(li);
        i++;
    })
}