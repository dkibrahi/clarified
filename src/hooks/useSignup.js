// react imports
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { projFirestore, projAuth } from '../firebase/config';

// hooks/functions
import { validUniqname } from '../functions/uniqname';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const[ isCancelled, setIsCancelled ] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const history = useHistory();

    const signup = async (uniqname, password, displayName, setDisplayAlert, setFeedbackType, setFeedbackTitle, setFeedbackDesc) => {
        setError(null);
        setIsPending(true);

        if (!validUniqname(uniqname)) {
            setFeedbackType('error');
            setFeedbackTitle('Uniqname error');
            setFeedbackDesc('The uniqname is invalid. Please make you entered a valid uniqname with only english letters');
            setDisplayAlert(true);

            setIsPending(false);
            return;
        }

        try {
            await projFirestore.collection('users').doc(uniqname).get().then(data => {
                if (!data.exists) {
                    setFeedbackType('error');
                    setFeedbackTitle('Roster Error');
                    setFeedbackDesc('You are not on the list of students for this class. Please contact the professor');
                    setDisplayAlert(true);
                    setIsPending(false);
                }

                else {
                    console.log("reached");
                    const email = uniqname + '@umich.edu';
                    createAccount(email, password, displayName, setFeedbackType, setFeedbackTitle, setFeedbackDesc, setDisplayAlert);
                }
            });
        } catch(err) {
            setError(err.message);
            setIsPending(false);
        }
    }

    const createAccount = async (email, password, displayName, setFeedbackType, setFeedbackTitle, setFeedbackDesc, setDisplayAlert) => {
        try {
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
            
            setFeedbackType('success');
            setFeedbackTitle('Account Created!');
            setFeedbackDesc('You created your account! Do NOT refresh. Taking you to the home page...');
            setDisplayAlert(true);

            setTimeout(() => history.push('/'), 2500);
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message);
            }
        }

        setIsPending(false);
    }

    return ( { signup, error, isPending } );
}