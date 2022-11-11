// react imports
import { useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { projFirestore } from '../../firebase/config';

// components
import Particle from '../../components/Particle/Particle';
import AlertUser from '../../components/alert-user/AlertUser';

// styles
import styles from './AddStudent.module.css';

export default function AddStudent() {
    const uniqname = useRef('');
    const isAdmin = useRef(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!uniqname.current || !validInput(uniqname.current)) {
            // put error message
            alert("Not a valid uniqname"); // placeholder for error
            return;
        }
        
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

    const cleanInput = (umichName) => {
        umichName = umichName.toLowerCase();
        umichName.trim();

        return umichName;
    }

    const validInput = (umichName) => {
        umichName = cleanInput(umichName);

        const length = umichName.length;

        if (length < 3 || length > 8) {
            return false;
        }

        const onlyLowercase = /^[a-z]+$/.test(umichName);
        
        return onlyLowercase;
    }

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
            <AlertUser />
        </>
  )
}
