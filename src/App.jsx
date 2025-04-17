import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Landing from "./Landing"
//import SignUp from "./Components/Signup/signup";

import AfterSignInRedirect from "./afterSignInRedirect";
import ShowUp from "./pages/WelcomeScreen";
import AdminDashboard from "./adminResources/AdminDashboard";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function App(){
  const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (isSignedIn && location.pathname === "/") {
        navigate("/pages/WelcomeScreen");
      }
  
    }, [isSignedIn, location, navigate]);

return(
  <header>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pages/WelcomeScreen" element={<ShowUp />} />
        <Route path="/adminResources/adminDashboard" element={<AdminDashboard/>} />
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