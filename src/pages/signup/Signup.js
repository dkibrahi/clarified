// react imports
import { useRef } from 'react';
import Particle from '../../components/Particle/Particle';

// context 
import { useUserContext } from '../../context/userContext';

// styles
import styles from './Signup.module.css';

export default function Signup() {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const usernameRef = useRef('');
    const { registerUser } = useUserContext();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const username = usernameRef.current.value;

        // validate email, password, username before allowing to sign up

        registerUser(email, password, username)
    }
    

    return (
        <>
            <form onSubmit={handleSubmit} className={styles["signup-form"]}>
                <h2>Signup</h2>
                <label>
                    <span>Email:</span>
                    <input 
                        type='text'
                        ref={emailRef}
                        value={emailRef.current.value}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input 
                        type='password'
                        ref={passwordRef}
                        value={passwordRef.current.value}
                    />
                </label>
                <label>
                    <span>Username:</span>
                    <input 
                        type='text'
                        ref={usernameRef}
                        value={usernameRef.current.value}
                    />
                </label>

                <button className='btn'>Sign up</button>
            </form>
        </>
    )
}
