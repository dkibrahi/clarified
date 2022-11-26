// react imports
import { useState } from 'react';

// components
import Form from '../../components/Form/Form';

// functions/hooks
import { useLogin } from '../../hooks/useLogin';

// icons
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [displayAlert, setDisplayAlert] = useState(false);
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const { login, error, isPending } = useLogin();
    
    
    const handleSubmit = () => {
        login(email, password);
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
            <Paper
                className="input-bar"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </Paper>

            {error && <p>{error}</p>}
        </Form>
    )
}
