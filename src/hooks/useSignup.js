import { useState, useEffect } from 'react';
import { projAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const[ isCancelled, setIsCancelled ] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            // signup user
           const res = await projAuth.createUserWithEmailAndPassword(email, password);

           if (!res){
                throw new Error('Could not complete the signup');
           }

           //update display name
            await res.user.updateProfile({ displayName });

            //dispatch user login
            dispatch({ type: 'LOGIN', payload: res.user});

            //update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }           
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    return ( { signup, error, isPending } );
}