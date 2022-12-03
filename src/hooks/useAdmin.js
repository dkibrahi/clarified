// react imports
import { useState, useEffect } from 'react';
import { projFirestore } from '../firebase/config';

// functions/hooks
import { useAuthContext } from './useAuthContext';

export const useAdmin = (uniqname) => {
    const { user } = useAuthContext();
    const [isAdmin, setIsAdmin] = useState(null);


    useEffect(() => {
        if (!user || !user.displayName) {
            return;
        }

        try {
            projFirestore.collection('users').doc(user.displayName).onSnapshot(snapshot => {
                const data = {...snapshot.data()};
                setIsAdmin(data.isAdmin);
            });
        } catch(err) {
            console.log(err);
        }
    }, [isAdmin, user])

    useEffect(() => {
        return () => setIsAdmin(null);
    }, []);

    return { isAdmin };
    
}