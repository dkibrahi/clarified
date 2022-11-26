import { useState, useEffect } from 'react';
import { projFirestore, projAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const[ isCancelled, setIsCancelled ] = useState(false);
    const [error, setError] = useState(null);
    const [student, setStudent] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (uniqname, password, displayName, studentStatus) => {
        setError(null);
        setIsPending(true);

        try {
            await projFirestore.collection('users').doc(uniqname).get().then(data => {
                if (!data.exists) {
                    studentStatus(false);
                }

                else {
                    setStudent(true);
                }

            });
        } catch(err) {
            setError(err.message);
            setIsPending(false);
        }

        setIsPending(false);

        if (!student) {
            return;
        }


        console.log("reaching sign up feature line 39");

        try {
            const res = await projAuth.createUserWithEmailAndPassword(uniqname, password);

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