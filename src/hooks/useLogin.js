// react import 
import { useState, useEffect } from 'react';
import { projAuth } from '../firebase/config';
import { useHistory } from 'react-router-dom';

// functions/hooks
import { useAuthContext } from './useAuthContext';


export const useLogin = () => {
    const[ isCancelled, setIsCancelled ] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const history = useHistory();

    const login = async (uniqname, password) => {
        setError(null);
        setIsPending(true);

        //sign the user in
        try {
            const email = uniqname + '@umich.edu';
            const res = await projAuth.signInWithEmailAndPassword(email, password);

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user });

            //update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }

            // user is logged in, take to home page
            history.push('/');
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    }

    useEffect(() => {
        return () => {
            setIsCancelled(true);
        }
    }, [])

    return { login, error, isPending };
}