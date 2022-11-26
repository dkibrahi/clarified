// react imports
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// components
import Form from '../../components/Form/Form';

// icons
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

// styles
import styles from './Signup.module.css';

export default function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const [displayAlert, setDisplayAlert] = useState(false);
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const { signup, error, isPending } = useSignup();
    
    const studentStatus = (isStudent) => {
        setDisplayAlert(true);

        if (!isStudent) {
            setFeedbackType('error');
            setFeedbackTitle('Roster Error');
            setFeedbackDesc('You are not on the list of students for this class. Please contact the professor');
        }

        else {
            setFeedbackType('success');
            setFeedbackTitle('Post Created');
            setFeedbackDesc('Post saved! Do NOT refresh. Users will be able to reply in just a moment...');
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, username, studentStatus);
    }

    return (
        <Form 
            title='Create Account'
            setInput={setEmail}>
            <Paper
                component="form"
                className={styles["input-bar"]}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </Paper>

            <Paper
                component="form"
                className={styles["input-bar"]}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </Paper>

            {
                !isPending && 
                <Button 
                    variant="outlined" 
                    onClick={(e) => handleSubmit(e)}>
                    Sign Up
                </Button>
            }

            {
                isPending && 
                <Button 
                    variant="outlined">
                    Loading...
                </Button>
            }

            {
                displayAlert && 
                <Snackbar 
                    open={displayAlert} 
                    onClose={() => setDisplayAlert(false)}>
                        <Alert 
                            severity={feedbackType}
                            className={styles.alert}
                            onClose={() => setDisplayAlert(false)}>
                            <AlertTitle>{feedbackTitle}</AlertTitle>
                            {feedbackDesc}
                        </Alert>
                </Snackbar>
            }

            {error && <p>{error}</p>}
        </Form>
    )
}
