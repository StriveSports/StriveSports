import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

export default function SignRedirect(user) {
    const navigate = useNavigate();
    useEffect(() => {

        // Check if the user is an admin based on their userId
        if (user.publicMetadata.role) {
            if(user.publicMetadata.role === 'resident') {
                console.log("success");
                navigate('/residentDashboard');
        
            }
            else if (user.publicMetadata.role === 'admin') {
                navigate('/adminDashboard');
        
            }
        }
        else{
            navigate('/residentDashboard');
        }
        
    }, [navigate, user.publicMetadata.role]);
    return null;
}