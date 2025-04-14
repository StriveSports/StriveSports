import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Landing from "./Landing"
//import SignUp from "./Components/Signup/signup";
import ShowUp from "./pages/WelcomeScreen";

function App(){
  const { isSignedIn, isLoaded } = useUser();
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      if (isLoaded && isSignedIn && location.pathname === "/") {
        navigate("/pages/WelcomeScreen");
      }
  
    }, [isLoaded, isSignedIn, location, navigate]);

return(

  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/pages/WelcomeScreen" element={<ShowUp />} />
  </Routes>

);    

}

export default App;