// react imports
import { useState } from 'react';

// styles
import styles from './Signup.module.css';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(email, password, username);
    }

    return (
        <form onSubmit={handleSubmit} className={styles["signup-form"]}>
            <h2>Signup</h2>
            <label>
                <span>email:</span>
                <input 
                    type='text'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </label>
            <label>
                <span>password:</span>
                <input 
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </label>
            <label>
                <span>username:</span>
                <input 
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </label>

            <button className='btn'>Sign up</button>
        </form>
    )
}
