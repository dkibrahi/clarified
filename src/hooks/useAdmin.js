// react imports
import { useState, useEffect } from 'react';
import { projFirestore } from '../firebase/config';

// functions/hooks
import { useAuthContext } from './useAuthContext';

export const useAdmin = (uniqname) => {
    const { user } = useAuthContext();
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        if (!user || !user.displayName) {
            return;
        }

        try {
            const unsub = projFirestore.collection('users').doc(user.displayName).onSnapshot(snapshot => {
                const data = {...snapshot.data()};
                setIsAdmin(data.isAdmin);

                return () => unsub();
            });
        } catch(err) {
            console.log(err);
        }
    }, [isAdmin, user])

    return { isAdmin };
    
}
