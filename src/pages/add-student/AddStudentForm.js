// react imports
import { useState } from 'react';
import { projFirestore } from '../../firebase/config';

// components
import Form from '../../components/Form/Form';

// functions/hooks
import { validUniqname } from '../../functions/uniqname';

// icons
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';

export default function AddStudentForm() {
    const [uniqname, setUniqname] = useState('');
    const [admin, setAdmin] = useState(false);

    const [isPending, setIsPending] = useState(false);

    const [emailError, setEmailError] = useState(false);

    const [displayAlert, setDisplayAlert] = useState(false);
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const handleSubmit = async () => {
        setIsPending(true);

        if (!uniqname || !validUniqname(uniqname)) {
            alertUser('error', 'Uniqname error', 'The uniqname is invalid. Please make you entered a valid uniqname with only english letters');
            setEmailError(true);

            setIsPending(false);
            return;
        }
        
        try {
            setUniqname(uniqname.toLowerCase());
            
            const unsub = projFirestore.collection('users').doc(uniqname).set({
                isAdmin: admin
            });

            const adminRights = admin ? 'WITH' : 'WITHOUT';

            alertUser('success', 'Student Added/Updated', 'The student was added/updated ' + adminRights + ' admin privelages!');

            setIsPending(false);

            return () => unsub();

        } catch(err) {
            console.log(err);
            setIsPending(false);
        }
    }

    const alertUser = (status, title, desc) => {
        setFeedbackType(status);
        setFeedbackTitle(title);
        setFeedbackDesc(desc);
        setDisplayAlert(true);
    }

    return (
        <>
            <Form
                title="Add Student"
                emailError={emailError}
                isPending={isPending}
                displayAlert={displayAlert}
                feedbackType={feedbackType}
                feedbackTitle={feedbackTitle}
                feedbackDesc={feedbackDesc}
                setInput={setUniqname}
                handleSubmit={handleSubmit}
                setDisplayAlert={setDisplayAlert}>
                    <FormControlLabel
                        label="Make admin"
                        control = {
                            <Checkbox 
                                checked={admin}
                                onClick={() => setAdmin(!admin)}
                            />
                        }
                    />
            </Form>

        </>
  )
}
