// react imports


// components
import Particle from '../../components/Particle/Particle';
import Form from '../../components/form/Form';

// styles
import styles from './Login.module.css';

export default function Login() {
    const handleSubmit = (email) => {
        alert(email);
    }

    return (
        <>
            <Particle/>
            <Form 
                title="Log in"
                label="Email here"
                buttonText="Log in"
                handleSubmit={handleSubmit}
            />
        </>
  )
}
