// react imports
import { useRef } from 'react';
import { Button, TextField } from '@mui/material';

// components
import Particle from '../../components/Particle/Particle';

// styles
import styles from './Login.module.css';

export default function Form() {
  return (
    <form className={styles["login-form"]}>
        <h2>Login</h2>
        <TextField 
            id="outlined-basic" 
            label="Email here" 
            variant="outlined" 
            onChange={(e) => email.current = e.target.value }
            />
    </form>
  )
}
