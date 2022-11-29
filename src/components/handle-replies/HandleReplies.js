// react import
import { useState } from 'react';

// components
import ViewReplies from '../../components/view-replies/ViewReplies';
import CreatePost from '../create-post/CreatePost';

export default function HandleReplies({ postID }) {
    const [newContent, setNewContent] = useState('');

    const post = {content: ''};

    const handleSave = () => {
        console.log("REACHED SAVE IN REPLY");
    }
    

    return (
        <>
            <CreatePost
                post={post}
                displayCancel={false}
                setNewContent={setNewContent}
                handleSave={handleSave} />
            <ViewReplies postID={postID}/>
        </>
    )
}
