// react imports
import { projFirestore } from '../../firebase/config';
import { Link, useHistory } from 'react-router-dom';

// icons
import { Card, CardContent, Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// components
import MoreOptions from '../more-options/MoreOptions';

// styles 
import styles from './PostSample.module.css';



export default function PostSample({ post }) {
  const history = useHistory();
  const linkTitle = post.title.replace(/\ /g,'-');
  const postDate = post.date.toDate().toDateString(); 

  const handleDelete = async () => {
    let titleInDB = post.title.replace(/[^a-zA-Z-]/g, "");
    titleInDB = titleInDB.toLowerCase();

    await projFirestore.collection('posts').doc(post.id).delete();
    await projFirestore.collection('titles').doc(titleInDB).delete();

    window.location.reload();
  }

  const handleEdit = () => {
    history.push({
      pathname: `/posts/${linkTitle}`,
      state: {edit: true}
    }); 
  }

  return (
    <Card variant="outlined" className={styles.card}>
        <MoreOptions 
          size="small" 
          postID={post.id}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          displayEdit={true}
          displayDelete={true}
          displayFlag={false}
        />
        <h3>{post.title}</h3>
        <p>{postDate}</p>
        <CardContent>
          <div>{post.content.substring(0, 100)}</div>
        </CardContent>
        <Link to={{
            pathname: `/posts/${linkTitle}`,
            state: {edit: false}
          }}>
        <Fab variant="extended" size="small">
            <VisibilityIcon sx={{ mr: 1 }} />
            Full Post
        </Fab>
        </Link>
    </Card>
  )
}
