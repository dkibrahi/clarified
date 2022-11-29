// components
import SingleReply from '../single-reply/SingleReply';


// component that takes ALL user posts and outputs them
export default function UserReplies( { replies, postID } ) {
  if (replies.length === 0) {
    return <div className='error'>No replies found....</div>
  }


  return (
    <div>
        {replies.map((reply) => (
            <SingleReply 
              key={reply.id}
              reply={reply}
              postID={postID}/>
        ))}
    </div>
  )
}
