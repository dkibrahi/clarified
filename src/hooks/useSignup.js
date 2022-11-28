// react imports
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { projFirestore, projAuth } from '../firebase/config';
import { validPassword } from '../functions/password';

// hooks/functions
import { validUniqname } from '../functions/uniqname';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const[ isCancelled, setIsCancelled ] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [passError, setPassError] = useState(null);
    const [serverError, setServerError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const history = useHistory();

    const signup = async (uniqname, password, alertUser) => {
        setEmailError(null);
        setPassError(null);
        setServerError(null);

        setIsPending(true);

        if (!validUniqname(uniqname)) {
            alertUser('error', 'Uniqname error', 'The uniqname is invalid. Please make you entered a valid uniqname with only english letters');
            setEmailError(true);

            setIsPending(false);
            return;
        }

        const message = validPassword(password);

        if (message) {
            alertUser('error', 'Password error', message);
            setPassError(true);

            setIsPending(false);
            return;
        }

        try {
            const unsub = projFirestore.collection('users').doc(uniqname).get().then(data => {
                if (!data.exists) {
                    alertUser('error', 'Roster Error', 'You are not on the list of students for this class. Please contact the professor');

                    setIsPending(false);
                }

                else {
                    const email = uniqname + '@umich.edu';
                    createAccount(email, uniqname, password, alertUser);
                }
            });

            return () => unsub();
        } catch(err) {
            alertUser('error', 'Something went wrong', err.message);
            serverError(true);
            setEmailError(true);
            setPassError(true);

            setIsPending(false);
        }
    }

    const createAccount = async (email, uniqname, password, alertUser) => {
        try {
            const res = await projAuth.createUserWithEmailAndPassword(email, password);

            if (!res){
                throw new Error('Could not complete the signup');
            }

            await res.user.updateProfile({ displayName: uniqname });

            //dispatch user login
            dispatch({ type: 'LOGIN', payload: res.user});

            //update state
            if (!isCancelled) {
                setIsPending(false);
                setEmailError(null);
                setPassError(null);
                setServerError(null);
            }   
        }
        catch (err) {
            if (!isCancelled) {
                alertUser('error', 'Something went wrong', err.message);
                
                setServerError(true);
                setEmailError(true);
                setPassError(true);
            }
        }

        setIsPending(false);
    }

    return ( { signup, emailError, passError, isPending } );
}