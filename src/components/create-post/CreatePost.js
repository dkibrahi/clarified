// react imports
import { useState } from 'react';

// images
import defaultProfileMale from '../../images/default-profile-male.png';

// styles
import styles from './CreatePost.module.css';

export default function CreatePost() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <form className={styles["create-post"]}>
            <label className={styles["main-input"]}>
                <img src={defaultProfileMale} alt='default male profile'/>
                <input 
                    type='text'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your thoughts..."
                />
            </label>
            <button className='btn'>Post</button>
        </form>
  )
}
