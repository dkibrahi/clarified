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

  const handleFlag = async (flagDescription) => {
    const doc = { postID: post.id, reportedBy: "dkibrahi", flagDescription };

    try {
      await projFirestore.collection('reports').add(doc);
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Card variant="outlined" className={styles.card}>
        <MoreOptions 
          size="small" 
          postID={post.id}
          handleDelete={handleDelete}
          handleFlag={handleFlag}
          displayEdit={true}
          displayDelete={true}
          displayFlag={true}
        />
        <h3>{post.title}</h3>
        <p>{post.time}</p>
        <CardContent>
        <div>{post.content.substring(0, 100)}...</div>
        </CardContent>
        <Link to={`/posts/${post.id}`}>
        <Fab variant="extended" size="small">
            <VisibilityIcon sx={{ mr: 1 }} />
            Full Post
        </Fab>
        </Link>
    </Card>
  )
}
