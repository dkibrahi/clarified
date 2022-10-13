// react imports
import { useState } from 'react';

// components
import Particle from '../../components/Particle/Particle';

// styles
import styles from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
    }

    return (
        <div>
            <Particle/>
            <form onSubmit={handleSubmit} className={styles["login-form"]}>
                <h2>Login</h2>
                <label>
                    <span>Email:</span>
                    <input 
                        type='text'
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </label>
                <label>
                    <span>Password:</span>
                    <input 
                        type='password'
                        onChange={(e) => {setPassword(e.target.value)}}
                        value={password}
                    />
                </label>
                <button className='btn'>Login</button>
            </form>
        </div>
  )
}
