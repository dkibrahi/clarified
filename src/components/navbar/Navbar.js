// react imports
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
        <ul>
            <li className={styles.title}><Link to='/home'>Clarified</Link></li>
            <li>
              <Link to='/home'>
              <HomeIcon color="primary"/>
              </Link>
            </li>
            <li>
              <Link to='/create'>
              <AddIcon color="primary"/>
              </Link>
            </li>
{/* 
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/signup'>Signup</Link></li> */}
        </ul>
    </nav>
  )
}
