// other
import { useHistory } from 'react-router-dom';

// components


// images
import defaultProfileMale from '../../images/default-profile-male.png';
import PostTemplate from '../post-template/PostTemplate';

// styles
import styles from './PostIntro.module.css';

export default function PostIntro() {
  const history = useHistory();

  const handleClick = () => {
    history.push('/create');
  }

  return (
      <PostTemplate>
        <span className={styles.spanPost}>
          <img src={defaultProfileMale} alt='default male profile'/>
              <input 
                  type='text'
                  placeholder="Create a post"
                  onClick={handleClick}
              />
        </span>
      </PostTemplate>
  )
}
