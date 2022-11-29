// react imports
import { projFirestore } from '../../firebase/config';

// icons
import { Card, CardContent, Fab } from '@mui/material';

// components and functions
import MoreOptions from '../more-options/MoreOptions';

export default function SingleReply({ reply, postID }) {
  const fireBaseTime = new Date(
      reply.date.seconds * 1000 + reply.date.nanoseconds / 1000000,
  );
    
  const replyDate = fireBaseTime.toDateString();

  const handleDelete = async () => {
    await projFirestore.collection('replies').doc(postID).collection('reply').doc(reply.id).delete();
    window.location.reload();
  }


  return (
    <Card variant="outlined" >
        <p>{reply.author}</p>
        <p>{replyDate}</p>
        <CardContent>
          <div>{reply.content.substring(0, 100)}</div>
        </CardContent>
    </Card>
  )
}