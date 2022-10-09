// other
import { useHistory } from 'react-router-dom';

// images
import cookieError from '../../images/cookie_error.png';

// styles
import styles from './Error.module.css';

export default function Error() {
    const history = useHistory();

    const handleClick = () => {
        history.push('/'); // send user to homepage
    }
 

    return (
        <div className={styles["error-page"]}>
            <h1>SORRY...</h1>
            <img src={cookieError} alt="cookie monster"/>
            <p>We couldn't find that page</p>
            <p>Click <span onClick={handleClick}>here</span> to go back to the homepage</p>
        </div>
    )
}
