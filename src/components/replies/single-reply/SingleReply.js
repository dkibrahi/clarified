// react imports
import { projFirestore } from '../../../firebase/config';
import { useState, useEffect } from 'react';

// components
import MoreOptions from '../../more-options/MoreOptions';
import CreateReply from '../create-reply/CreateReply';
import HandleReplies from '../handle-replies/HandleReplies';

// icons
import { Card, CardContent } from '@mui/material';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';

// styles
import styles from './SingleReply.module.css';


export default function SingleReply({ alertUser, reply, postID, path }) {
  const [isEditing, setIsEditing] = useState(false);
  const [view, setView] = useState(false);

  const [newContent, setNewContent] = useState('');

  const newPath = path.doc(reply.id).collection('replies');


  const author = reply.isAnonymous ? 'anonymous' : reply.author;
  const initial = author[0];

  const post = {content: reply.content};  

  const fireBaseTime = new Date(
      reply.date.seconds * 1000 + reply.date.nanoseconds / 1000000,
  );
    
  const replyDate = fireBaseTime.toDateString();

  const handleDelete = async () => {
    await path.doc(reply.id).delete();
    window.location.reload();
  }

  const handleEdit = async () => {
    setIsEditing(true);
  }

  const handleReply = async (isAnonymous, newContent) => {
    await path.doc(reply.id).update({    
        content: newContent,
        isAnonymous: isAnonymous
    }).then(res => {
      setIsEditing(false);

      const canSee = isAnonymous ? 'CANNOT' : 'CAN';

      alertUser('success', 'Reply Updated!', 'Your reply updated and people ' + canSee + ' see your name');
    });

  }


  return (
    <div className={styles["reply-card"]}>
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

      {isEditing && 
        <div className={styles["reply-edit"]}> 
          <CreateReply 
            alertUser={alertUser}
            displayName={reply.author}
            post={post}
            setView={setIsEditing}
            handleReply={handleReply}/>
        </div>
      }

      {!isEditing && 
      <>
        <CardContent>
          <div>{reply.content}</div>
        </CardContent>

        <Divider />

        <Button 
            size="small" 
            variant="contained"
            className={styles["reply-button"]}
            onClick={() => setView(true)}>
              <ReplyIcon/>
              <span>Reply</span>
        </Button>    
      </>
      } 

      {reply && path && 
       <HandleReplies 
            path={newPath}
            postID={postID}
            view={view}
            setView={setView}/> 
       }

    </div>
  )
}