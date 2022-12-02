// components
import PostSample from '../post-sample/PostSample';

// icons
import Chip from '@mui/material/Chip';

// styles 
import styles from './UserPosts.module.css';

// component that takes ALL user posts and outputs them
export default function UserPosts( { posts } ) {
  if (posts.length === 0) {
    return <div className='error'>No posts found....</div>
  }


  return (
    <div className={styles["posts-list"]}>
      <Chip 
        label="Latest Posts" 
        variant="filled" 
        className={styles.chip}/>
      {posts.map((post) => (
          <PostSample key={post.id} post={post} />
      ))}
    </div>
  )
}
