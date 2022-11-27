// react imports
import { useState } from 'react';

// components
import Form from '../../components/Form/Form';

// functions/hooks
import { useLogin } from '../../hooks/useLogin';

// icons
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

// styles
import styles from '../../components/Form/Form.module.css';


export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [displayAlert, setDisplayAlert] = useState(false);
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const { login, error, isPending } = useLogin();
    
    
    const handleSubmit = () => {
        login(email, password, alertUser);
    }

    const alertUser = (status, title, desc) => {
        setFeedbackType(status);
        setFeedbackTitle(title);
        setFeedbackDesc(desc);
        setDisplayAlert(true);
    }

    return (
        <Form 
            title='Log in'
            emailError={error}
            isPending={isPending}
            displayAlert={displayAlert}
            feedbackType={feedbackType}
            feedbackTitle={feedbackTitle}
            feedbackDesc={feedbackDesc}
            setInput={setEmail}
            handleSubmit={handleSubmit}
            setDisplayAlert={setDisplayAlert}
            >
            <Paper
                className={styles[error ? 'error-bar' : 'input-bar']}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    type="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </Paper>
        </Form>
    )
}
