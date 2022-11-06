// react imports
import { Card, CardContent, Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';

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
                {console.log(post.content.substring(0, 100))}
              </CardContent>
              <Link to={`/posts/${post.id}`}>
                <Fab variant="extended">
                  <NavigationIcon sx={{ mr: 1 }} />
                  Full Post
                </Fab>
              </Link>
            </Card>
        ))}
    </div>
  )
}
