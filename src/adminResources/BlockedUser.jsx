import { UserButton } from "@clerk/clerk-react"
import './AdminDashboard.css'

export default function BlockedUser(){
    return(
        <main className="adminDashBoardBody">
            <section>
                <h1>Access to this website has been denied</h1>
            </section>
            <section className='userButton'>
                <UserButton/>
            </section>
        </main>
    )
}