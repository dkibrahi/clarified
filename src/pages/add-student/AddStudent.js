// react imports
import { useRef } from 'react';
import { projFirestore } from '../../firebase/config';

// components
import Particle from '../../components/Particle/Particle';
import Form from '../../components/form/Form';
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
            <Form
                title="Add Student"
                label="uniqname"
                buttonText="Add"
                handleSubmit={handleSubmit}
            />
            {/* <AlertUser /> */}
        </>
  )
}

{/* <FormGroup>
                    <FormControlLabel control= {
                    <Checkbox 
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                    } label="Admin Privileges" />
                </FormGroup> */}