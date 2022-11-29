// components
import ReplySample from '../reply-sample/ReplySample';

// styles 
import styles from './UserPosts.module.css';

// component that takes ALL user posts and outputs them
export default function UserReply( { replies } ) {
  if (replies.length === 0) {
    return <div className='error'>No replies found....</div>
  }


  return (
    <div className={styles["replies-list"]}>
        {replies.map((reply) => (
            <ReplySample key={replies.id} replies={replies} />
        ))}
    </div>
  )
}