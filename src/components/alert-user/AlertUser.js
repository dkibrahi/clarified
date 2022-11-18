// react import
import { useState } from 'react';

//icons
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Snackbar } from '@mui/material';

// styles
import styles from './AlertUser.module.css';

export default function AlertUser({ display, severity, title, description }) {
    const [showAlert, setShowAlert] = useState(display);

    console.log(display, showAlert, severity, title, description);

    return (
        <Snackbar 
            open={showAlert} 
            onClose={() => setShowAlert(false)}>
                <Alert 
                    severity={severity}
                    className={styles.alert}
                    onClose={() => {setShowAlert(false)}}>
                    <AlertTitle>{title}</AlertTitle>
                    {description}
                </Alert>
        </Snackbar>
    )
}
