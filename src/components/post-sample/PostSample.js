// react imports
import { projFirestore } from '../../firebase/config';
import { Link } from 'react-router-dom';

// icons
import { Card, CardContent, Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// components
import MoreOptions from '../more-options/MoreOptions';

// styles 
import styles from './PostSample.module.css';



export default function PostSample({ post }) {
  const handleDelete = () => {
    projFirestore.collection('posts').doc(post.id).delete();
  }

  return (
    <Card variant="outlined" className={styles.card}>
        <MoreOptions 
          size="small" 
          postID={post.id}
          handleDelete={handleDelete}
          displayEdit={true}
          displayDelete={true}
          displayFlag={false}
        />
        <h3>{post.title}</h3>
        <p>{post.time}</p>
        <CardContent>
          <div>{post.content.substring(0, 100)}...</div>
        </CardContent>
        <Link to={{
            pathname: `/posts/${post.id}`,
            state: { post: post}
          }}>
        <Fab variant="extended" size="small">
            <VisibilityIcon sx={{ mr: 1 }} />
            Full Post
        </Fab>
        </Link>
    </Card>
  )
}
