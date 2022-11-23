// react imports
import { projFirestore } from '../../firebase/config';

// components and functions
import Particle from '../../components/Particle/Particle';
import Form from '../../components/Form/Form';
import { validUniqname } from '../../functions/uniqname';

export default function AddStudent() {
    const handleSubmit = async (uniqname) => {
        if (!uniqname || !validUniqname(uniqname)) {
            return false;
        }
        
        try {
            uniqname = uniqname.toLowerCase();
            
            await projFirestore.collection('users').doc(uniqname).set({
                isAdmin: false
            });

            return true;
        } catch(err) {
            console.log(err);
            return false;
        }
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
