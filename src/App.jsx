import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser,ClerkProvider } from "@clerk/clerk-react";
import Landing from "./Landing"
//import SignUp from "./Components/Signup/signup";

import AfterSignInRedirect from "./afterSignInRedirect";
import ShowUp from "./pages/WelcomeScreen";
import AdminDashboard from "./adminResources/AdminDashboard";
import Res from "./pages/resident"
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