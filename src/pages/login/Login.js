// react imports
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

// components
import Particle from '../../components/Particle/Particle';

// styles
import styles from './Login.module.css';

export default function Login() {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }

    return (
        <div>
            <Particle/>
            <form onSubmit={handleSubmit} className={styles["login-form"]}>
                <h2>Login</h2>
                <TextField 
                    id="outlined-basic" 
                    label="Email here" 
                    variant="outlined" 
                    onChange={(e) =>setEmail(e.target.value)}/>
                <Button variant="outlined">Log in</Button>
            </form>
        </div>
  )
}
