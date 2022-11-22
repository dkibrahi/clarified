import { useState } from 'react';
import { projAuth } from '../firebase/config';

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            // signup user
           const res = await projAuth.createUserWithEmailAndPassword(email, password);
           console.log(res.user)

           if (!res){
                throw new Error('Could not complete the signup');
           }

           //update display name
            await res.user.updateProfile({ displayName });

            setIsPending(false);
            setError(null);
            
        }
        catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }


    return ( { error, isPending, signup } );
}
}