// react imports
import { projFirestore } from '../../firebase/config';

// components
import Particle from '../../components/Particle/Particle';
import Form from '../../components/Form/Form';

// styles
import styles from './AddStudent.module.css';

export default function AddStudent() {
    const handleSubmit = async (uniqname) => {
        if (!uniqname || !validInput(uniqname)) {
            return false;
        }
        
        try {
            await projFirestore.collection('users').doc(uniqname).set({
                isAdmin: false
            });

            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
    }

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
                buttonText="Add"
                handleSubmit={handleSubmit}
                successMessage="Student was added succesfully"
                failMessage="Student could not be added. Invalid uniqname"
            />
        </>
  )
}
