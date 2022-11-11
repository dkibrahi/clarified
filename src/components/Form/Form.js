// react imports
import { useState } from 'react';

// components
import AlertUser from '../alert-user/AlertUser';

// mui
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

// styles
import styles from './Form.module.css';

export default function Form({ title, buttonText, handleSubmit, successMessage, failMessage }) {
    const [input, setInput] = useState('');
    const [shouldAlert, setShouldAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('') 
    const [alertTitle, setAlertTitle] = useState('');
    const [alertDescription, setAlertDescription] = useState('');

    const handleInput = async () => {
        setShouldAlert(false);
        const response = await handleSubmit(input);

        if (response) {
            setAlertSeverity('success');
            setAlertTitle('Success!');
            setAlertDescription(successMessage);
        }

        else {
            setAlertSeverity('error');
            setAlertTitle('Failed!');
            setAlertDescription(failMessage);
        }

        setShouldAlert(true);
    }

    return (
        <>
            <form className={styles["login-form"]}>
                <h2>{title}</h2>
                <Paper
                    component="form"
                    className={styles["input-bar"]}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="uniqname"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <span>@umich.edu</span>
                </Paper>
                <Button variant="outlined" onClick={handleInput}>{buttonText}</Button>
            </form>
            {shouldAlert && <AlertUser 
                display={shouldAlert}
                severity={alertSeverity}
                title={alertTitle}
                description={alertDescription}
            />}
        </>
    )
}
