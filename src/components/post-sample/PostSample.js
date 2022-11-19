// react imports
import { projFirestore } from '../../firebase/config';
import { useHistory } from 'react-router-dom';

// icons
import { Card, CardContent, Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// components
import MoreOptions from '../more-options/MoreOptions';

// styles 
import styles from './PostSample.module.css';

export default function PostSample({ post }) {
  const history = useHistory();

  let linkTitle = post.title.replace(/\s\s+/g, ' ');
  linkTitle = linkTitle.replace(/ /g, "-");
  linkTitle = linkTitle.replace(/[^a-zA-Z-]/g, "");
  linkTitle = linkTitle.toLowerCase();

  const fireBaseTime = new Date(
      post.date.seconds * 1000 + post.date.nanoseconds / 1000000,
  );
    
  const postDate = fireBaseTime.toDateString();

  const handleDelete = async () => {
    await projFirestore.collection('posts').doc(post.id).delete();
    await projFirestore.collection('titles').doc(linkTitle).delete();

    window.location.reload();
  }

  const sendToEdit = (editStatus=true) => {
    history.push({
      pathname: `/posts/${linkTitle}`,
      state: {edit: editStatus}
    }); 
  }

  return (
    <Card variant="outlined" className={styles.card}>
        <MoreOptions 
          size="small" 
          postID={post.id}
          handleDelete={handleDelete}
          handleEdit={sendToEdit}
          displayEdit={true}
          displayDelete={true}
          displayFlag={false}
        />
        <h3>{post.title}</h3>
        <p>{postDate}</p>
        <CardContent>
          <div>{post.content.substring(0, 100)}</div>
        </CardContent>
        <Fab variant="extended" size="small" onClick={() => sendToEdit(false)}>
            <VisibilityIcon sx={{ mr: 1 }} />
            Full Post
        </Fab>
    </Card>
  )
}
