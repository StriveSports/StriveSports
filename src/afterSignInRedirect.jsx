import { useAuth } from '@clerk/clerk-react';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import getUserById from './adminResources/getUserById';

export default function AfterSignInRedirect() {
    const {userId}  = useAuth();
    const response  = getUserById(userId);
    
    const navigate = useNavigate();


    useEffect(() => {
        response.then((user) => {
            // Check if the user is an admin based on their userId
        if (user.publicMetadata.role) {
            if(user.publicMetadata.role === 'resident') {
                navigate('/pages/WelcomeScreen');

            }
            else if (user.publicMetadata.role === 'admin') {
                navigate('/adminResources/adminDashboard');

            }
            else if(user.publicMetadata.role == 'removed'){
                navigate('/adminResources/BlockedUser');
            }
        }
        else{
            navigate('/pages/WelcomeScreen');
        }
        })
        
    }, [navigate, userId]);

    return null;
}