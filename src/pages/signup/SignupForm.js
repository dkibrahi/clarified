// react imports
import { useState } from 'react';

// components
import Form from '../../components/Form/Form';

// functions/hooks
import { useSignup } from '../../hooks/useSignup';

// icons
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';

// styles
import styles from '../../components/Form/Form.module.css';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [label, setLabel] = useState('');

    const [displayAlert, setDisplayAlert] = useState(false);
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const { signup, isPending } = useSignup();
    
    
    const handleSubmit = () => {
        signup(email, password, alertUser);
    }

    const alertUser = (status, title, desc) => {
        setLabel('error');
        setFeedbackType(status);
        setFeedbackTitle(title);
        setFeedbackDesc(desc);
        setDisplayAlert(true);
    }

    return (
        <Form 
            title='Create Account'
            isPending={isPending}
            displayAlert={displayAlert}
            feedbackType={feedbackType}
            feedbackTitle={feedbackTitle}
            feedbackDesc={feedbackDesc}
            setInput={setEmail}
            handleSubmit={handleSubmit}
            setDisplayAlert={setDisplayAlert}>
            
                <TextField
                className={styles["input-bar"]}
          error={true}
          id="outlined-error-helper-text"
          label="Error"
          defaultValue="Hello World"
          helperText="Incorrect entry."
        />

        </Form>
    )
}
