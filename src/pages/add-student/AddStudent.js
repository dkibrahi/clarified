// react imports
import { useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { projFirestore } from '../../firebase/config';

// components
import Particle from '../../components/Particle/Particle';

// styles
import styles from './AddStudent.module.css';

export default function AddStudent() {
    const uniqname = useRef('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const doc = { isAdmin: false };

        try {
            await projFirestore.collection('recipes').add(doc);
        } catch(err) {
        console.log(err);

        }
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
                <Button variant="outlined" onClick={handleSubmit}>Add</Button>
            </form>
        </>
  )
}
