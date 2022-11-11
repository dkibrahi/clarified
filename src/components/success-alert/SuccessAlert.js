// react import
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// styles
import styles from './SuccessAlert.module.css';

export default function SuccessAlert() {
    const [showAlert, setShowAlert] = useState(true);

    return (
        <>
            { showAlert && 
                    <Alert 
                        severtiy="success" 
                        className={styles.successAlert}
                        onClose={() => {setShowAlert(false)}}>
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — check it out!
                    </Alert>
            }
        </>
    )
}
