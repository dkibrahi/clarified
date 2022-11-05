// react imports
import { Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { projFirestore } from '../../firebase/config';

// styles 
import styles from './UserPosts.module.css';

// component that takes ALL user posts and outputs them
export default function UserPosts( { posts } ) {
  if (posts.length === 0) {
    return <div className='error'>No posts found....</div>
  }


  return (
    <div className={styles["posts-list"]}>
        {posts.map((post) => (
            <Card variant="outlined" key={post.id} className={styles.card}>
              <h3>{post.title}</h3>
              <p>{post.time}</p>
              <CardContent>
                <div>{post.content.substring(0, 100)}...</div>
              </CardContent>
              <Link to={`/posts/${post.id}`}>View full post</Link>
            </Card>
        ))}
    </div>
  )
}
