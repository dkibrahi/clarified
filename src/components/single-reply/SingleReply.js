// react imports
import { projFirestore } from '../../firebase/config';
import { useState } from 'react';

// components
import MoreOptions from '../more-options/MoreOptions';
import CreatePost from '../create-post/CreatePost';

// icons
import { Card, CardContent } from '@mui/material';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

// styles
import styles from './SingleReply.module.css';


export default function SingleReply({ reply, postID }) {
  const [isEditing, setIsEditing] = useState(false);

  const [newContent, setNewContent] = useState('');

  const author = reply.isAnonymous ? 'anonymous' : reply.author;
  const initial = author[0];

  const post = {content: ''};  

  const fireBaseTime = new Date(
      reply.date.seconds * 1000 + reply.date.nanoseconds / 1000000,
  );
    
  const replyDate = fireBaseTime.toDateString();

  const handleDelete = async () => {
    await projFirestore.collection('replies').doc(postID).collection('reply').doc(reply.id).delete();
    window.location.reload();
  }

  const handleEdit = async () => {
    setIsEditing(true);
  }

  const handleSave = async () => {
    console.log('reached save');
  }


  return (
    <Card className={styles["reply-card"]}>
      <MoreOptions 
        size="small" 
        postID={reply.id}
        author={reply.author}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        displayEdit={true}
        displayDelete={true}/>

      <div className={styles["reply-info"]}>
        <Avatar>{initial}</Avatar>
        <p>{author}</p>
      </div>
      <p>{replyDate}</p>

      {!isEditing && 
        <CardContent>
          <div>{reply.content}</div>
        </CardContent>
      }

      {isEditing && 
        <div className={styles["reply-edit"]}> 
          <CreatePost
            post={post}
            setView={setIsEditing}
            setNewContent={setNewContent}
            handleSave={handleSave}/>
        </div>
      }

      <Divider />
    </Card>
  )
}