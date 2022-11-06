// react imports
import { Card, CardContent, Fab } from '@mui/material';
import NavigationIcon from '@mui/icons-material/Navigation';
import { Link } from 'react-router-dom';

// styles 
import styles from './PostSample.module.css';

// components
import MoreOptions from '../more-options/MoreOptions';


export default function PostSample({ post }) {
  return (
    <Card variant="outlined" className={styles.card}>
        <MoreOptions size="small" postID={post.id}/>
        <h3>{post.title}</h3>
        <p>{post.time}</p>
        <CardContent>
        <div>{post.content.substring(0, 100)}...</div>
        </CardContent>
        <Link to={`/posts/${post.id}`}>
        <Fab variant="extended" size="small">
            <NavigationIcon sx={{ mr: 1 }} />
            Full Post
        </Fab>
        </Link>
    </Card>
  )
}
