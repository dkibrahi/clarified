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
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const history = useHistory();

    const signup = async (uniqname, password, alertUser) => {
        setError(null);
        setIsPending(true);

        if (!validUniqname(uniqname)) {
            alertUser('error', 'Uniqname error', 'The uniqname is invalid. Please make you entered a valid uniqname with only english letters');

            setIsPending(false);
            return;
        }

        if (!validPassword(password)) {
            alertUser('error', 'Password error', 'Invalid password. See form for more details');

            setIsPending(false);
            return;
        }

        try {
            await projFirestore.collection('users').doc(uniqname).get().then(data => {
                if (!data.exists) {
                    alertUser('error', 'Roster Error', 'You are not on the list of students for this class. Please contact the professor');

                    setIsPending(false);
                }

                else {
                    const email = uniqname + '@umich.edu';
                    createAccount(email, password, alertUser);
                }
            });
        } catch(err) {
            alertUser('error', 'Something went wrong', err.message);

            setIsPending(false);
        }
    }

    const createAccount = async (email, password, alertUser) => {
        try {
            const res = await projAuth.createUserWithEmailAndPassword(email, password);

            if (!res){
                throw new Error('Could not complete the signup');
            }

            //dispatch user login
            dispatch({ type: 'LOGIN', payload: res.user});

            //update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }   
            
            alertUser('success', 'Account Created!', 'You created your account! Do NOT refresh. Taking you to the home page...');

            setTimeout(() => history.push('/'), 2500);
        }
        catch (err) {
            if (!isCancelled) {
                alertUser('error', 'Something went wrong', err.message);
                
                setError(err.message);
            }
        }

        setIsPending(false);
    }

    return ( { signup, isPending } );
}