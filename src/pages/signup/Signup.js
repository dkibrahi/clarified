// react imports
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import Particle from '../../components/Particle/Particle';

// styles
import styles from './Signup.module.css';
import { getDisplayName } from '@mui/utils';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const { Signup, error, isPending } = useSignup();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(email, password, displayName);
    }

    return (
        <>
            <Particle />
            <form onSubmit={handleSubmit} className={styles["signup-form"]}>
                <h2>Signup</h2>
                <label>
                    <span>Email:</span>
                    <input 
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input 
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </label>
                <label>
                    <span>Username:</span>
                    <input 
                        type='text'
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                    />
                </label>

                {!isPending && <button className='btn'>Signup</button>}
                {isPending && <button className='btn' disabled>loading</button>}
                {error && <p>{error}</p>}
            </form>
        </>
    )
}
