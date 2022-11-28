// react imports
import { useState } from 'react';

// mui
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// styles
import styles from './Form.module.css';

export default function Form(props) {
    const handleSubmit = (e) => {
        e.preventDefault();

        if ('key' in e && e.key !== 'Enter') {
            return;
        }

        props.handleSubmit(); // let parent handle submit
    }

    return (
        <>
            <form className={styles["login-form"]} onKeyUp={(e) => handleSubmit(e)}>
                <h2>{props.title}</h2>
                <Paper
                    className={styles[props.emailError ? 'error-bar' : 'input-bar']}
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="uniqname"
                        onChange={(e) => props.setInput(e.target.value)}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <span>@umich.edu</span>
                </Paper>

                {props.children}

                {
                    !props.isPending && 
                    <Button 
                        variant="outlined" 
                        onClick={(e) => handleSubmit(e)}>
                        Submit
                    </Button>
                }

                {
                    props.isPending && 
                    <Button 
                        variant="outlined">
                        Loading...
                    </Button>
                }

                {
                    props.displayAlert && 
                    <Snackbar 
                        open={props.displayAlert} 
                        onClose={() => props.setDisplayAlert(false)}>
                            <Alert 
                                severity={props.feedbackType}
                                className={styles.alert}
                                onClose={() => props.setDisplayAlert(false)}>
                                <AlertTitle>{props.feedbackTitle}</AlertTitle>
                                {props.feedbackDesc}
                            </Alert>
                    </Snackbar>
                }
            </form>
        </>
    )
}
