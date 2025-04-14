import loadUsers from './loadUsers.jsx';
import updateRole from './updateRole.jsx';
import removeConfigMenu from './removeConfigMenu.jsx';
import './AdminDashboard.css';

export default function AdminDashboard() {
    return(
        <>
        <h1 className='adminDashboard'>Admin Dashboard</h1>
        <button onClick={loadUsers} className='loadUsers'>Load users</button>
        
        <section className='configMenu' id='configMenu'>
            <button onClick={()=>updateRole('member')} className='updateRole'>member</button>
            <button onClick={()=>updateRole('resident')} className='updateRole'>resident</button>
            <button onClick={()=>updateRole('admin')} className='updateRole'>admin</button>
            <button onClick={()=>updateRole('none')} className='updateRole'>none</button>
            <button onClick={removeConfigMenu} className='updateRole'>complete</button>

        </section>

        <ul id='usersTable' className='usersTable' ></ul>
        </>
    )
}