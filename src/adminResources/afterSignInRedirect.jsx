import { useAuth } from '@clerk/clerk-react';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import getUserById from './getUserById';

export default function AfterSignInRedirect() {
    const {userId}  = useAuth();
    const response  = getUserById(userId);
    
    const navigate = useNavigate();


    useEffect(() => {
        response.then((user) => {
            // Check if the user is an admin based on their userId
        if (user.publicMetadata.role) {
            if(user.publicMetadata.role === 'resident') {
                navigate('/residentDashboard');
        
            }
            else if (user.publicMetadata.role === 'admin') {
                navigate('/adminDashboard');
        
            }
        }
        else{
            navigate('/residentDashboard');
        }
        })
        
    }, [navigate, userId]);

    return null;
}