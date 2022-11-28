// react imports
import { projFirestore } from '../../firebase/config';
import { useHistory } from 'react-router-dom';

// icons
import { Card, CardContent, Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// components and functions
import MoreOptions from '../more-options/MoreOptions';
import { cleanTitle } from '../../functions/title';

// styles 
import styles from './ReplySample.module.css';

export default function UserReplies({ replies }) {
  const history = useHistory();

  let linkTitle = cleanTitle(replies.title);

  const fireBaseTime = new Date(
      replies.date.seconds * 1000 + replies.date.nanoseconds / 1000000,
  );
    
  const repliesDate = fireBaseTime.toDateString();

  const handleDelete = async () => {
    await projFirestore.collection('replies').doc(replies.id).delete();
    window.location.reload();
  }

  const sendToEdit = (editStatus=true) => {
    linkTitle = linkTitle + '-' + replies.id;

    history.push({
      pathname: `/replies/${linkTitle}`,
      state: {edit: editStatus}
    }); 
  }

  return (
    <Card variant="outlined" className={styles.card}>
        <MoreOptions 
          size="small" 
          repliesID={replies.id}
          handleDelete={handleDelete}
          handleEdit={sendToEdit}
          displayEdit={true}
          displayDelete={true}
          displayFlag={false}
        />
        <h3>{replies.title}</h3>
        <p>{repliesDate}</p>
        <CardContent>
          <div>{replies.content.substring(0, 100)}</div>
        </CardContent>
        <Fab variant="extended" size="small" onClick={() => sendToEdit(false)}>
            <VisibilityIcon sx={{ mr: 1 }} />
            Full replies
        </Fab>
    </Card>
  )
}