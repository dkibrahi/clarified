// react import
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// styles
import styles from './AlertUser.module.css';

export default function AlertUser({ display, severity, title, description }) {
    const [showAlert, setShowAlert] = useState(display);

    return (
        <>
            { showAlert && 
                    <Alert 
                        severity={severity}
                        className={styles.alert}
                        onClose={() => {setShowAlert(false)}}>
                        <AlertTitle>{title}</AlertTitle>
                        {description}
                    </Alert>
            }
        </>
    )
}
