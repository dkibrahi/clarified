// react imports
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
// icons
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ContactsIcon from '@mui/icons-material/Contacts';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
  const { logout } = useLogout();

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
             <li>
              <Link to='/addstudent'>
              <ContactsIcon color="primary"/>
              </Link>
            </li>
              <li> 
                <button className="btn" onClick={logout}>Logout</button>
              </li>
        </ul>
    </nav>
  )
}
