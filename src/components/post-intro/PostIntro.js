// other
import { useHistory } from 'react-router-dom';

// images
import defaultProfileMale from '../../images/default-profile-male.png';

// styles
import styles from './PostIntro.module.css';

export default function PostIntro() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/create');
  }

  return (
    <div>
      <form className={styles["post-intro"]}>
            <label className={styles["main-input"]}>
                <img src={defaultProfileMale} alt='default male profile'/>
                <input 
                    type='text'
                    placeholder="Create a post"
                    onClick={handleClick}
                />
            </label>
        </form>
    </div>
  )
}
