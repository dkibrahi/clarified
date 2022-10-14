// styles
import styles from './PostTemplate.module.css';

export default function PostTemplate(props) {
  return (
      <div className={styles['post-template']} >
        {props.children}
      </div>
  )
}
