// react imports
import { useState } from 'react';

// mui
import { Button, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

// styles
import styles from './Form.module.css';

export default function Form({ title, label, buttonText, handleSubmit}) {
    const [input, setInput] = useState('');

    const handleInput = () => {
        handleSubmit(input);
    }

    return (
        <form className={styles["login-form"]}>
            <h2>{title}</h2>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <span>@umich.edu</span>
            </Paper>
            <TextField 
                id="outlined-basic" 
                label={label}
                variant="outlined" 
                onChange={(e) => setInput(e.target.value) }
            />
            <Button variant="outlined" onClick={handleInput}>{buttonText}</Button>
        </form>
    )
}
