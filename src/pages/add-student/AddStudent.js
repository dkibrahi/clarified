// react imports
import { useRef, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { projFirestore } from '../../firebase/config';

// components
import Particle from '../../components/Particle/Particle';

// styles
import styles from './AddStudent.module.css';

export default function AddStudent() {
    const uniqname = useRef('');
    // const showAlert = useRef(true);
    const [showAlert, setShowAlert] = useState(true);
    const isAdmin = useRef(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await projFirestore.collection('users').doc(uniqname.current).set({
                isAdmin: isAdmin.current
            })
        } catch(err) {
            console.log(err);
        }
    }

    const handleChange = (event) => {
        isAdmin.current = event.target.checked;
    };

    return (
        <>
            <Particle/>
            <form className={styles["login-form"]}>
                <h2>Add Student</h2>
                <TextField 
                    id="outlined-basic" 
                    label="UMICH uniqname here" 
                    variant="outlined" 
                    onChange={(e) => uniqname.current = e.target.value }
                    />

                <FormGroup>
                    <FormControlLabel control= {
                    <Checkbox 
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    } label="Admin Privileges" />
                </FormGroup>
                <Button variant="outlined" onClick={handleSubmit}>Add</Button>
            </form>
            { showAlert && 
                <Alert severtiy="success" onClose={() => {setShowAlert(false)}}>
                    <AlertTitle>Success</AlertTitle>
                    This is a success alert — check it out!
                </Alert>
            }
        </>
  )
}
