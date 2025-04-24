import { Routes, Route, useLocation, Router } from "react-router-dom";
import Landing from "./Landing"
//import SignUp from "./Components/Signup/signup";

import AfterSignInRedirect from "./afterSignInRedirect";
import ShowUp from "./pages/WelcomeScreen";
import AdminDashboard from "./adminResources/AdminDashboard";
import Res from "./pages/resident"
import Onboard from "./pages/onboard3";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import BlockedUser from "./adminResources/BlockedUser";

function App(){
 

return(
  <header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pages/WelcomeScreen" element={<ShowUp />} />
        <Route path="/adminResources/AdminDashboard" element={<AdminDashboard/>} />
        <Route path='/pages/resident' element={<Res/>}/> 
        <Route path="/adminResources/BlockedUser" element={<BlockedUser/>}/>
        <Route path="/pages/onboard3" element={<Onboard />} />
      </Routes>
      <SignedOut>
      </SignedOut>
      <SignedIn className = 'signIn'>
        <AfterSignInRedirect />
      </SignedIn>
    </header>

);    

}

export default App;