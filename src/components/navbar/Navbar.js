// react imports
import { Link } from 'react-router-dom';

// functions/hooks
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useAdmin } from '../../hooks/useAdmin';

// icons
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import ContactsIcon from '@mui/icons-material/Contacts';
import LogoutIcon from '@mui/icons-material/Logout';

// styles
import styles from './Navbar.module.css';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const { isAdmin } = useAdmin();  

  return (
    <nav className={styles.navbar}>
        <ul>
          <li className={styles.title}><Link to='/'>Clarafied</Link></li>
          
          {!user && (
          <>
            <li><Link to ="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
          )}

          {user && isAdmin && 
            <>
              <li>
                <Link to='/'>
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
            </>
          }

          {user && (
            <>
              <li> 
                <a onClick={logout}>
                  <LogoutIcon color="primary"/>
                </a>
              </li>
            </>
          )}

        </ul>
    </nav>
  )
}
