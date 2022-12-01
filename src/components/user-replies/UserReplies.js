// components
import SingleReply from '../single-reply/SingleReply';


// icons
import Divider from '@mui/material/Divider';

// component that takes ALL user posts and outputs them
export default function UserReplies( { replies, postID, alertUser } ) {
  if (replies.length === 0) {
    return <div className='error'>No replies found....</div>
  }


  return (
    <div>
        {replies.map((reply) => (
            <SingleReply 
              key={reply.id}
              reply={reply}
              postID={postID}
              alertUser={alertUser}/>
        ))}

       
    </div>
  )
}
