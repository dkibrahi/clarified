// react import
import { useState } from 'react';
import { projFirestore } from '../../../firebase/config';

// components
import ViewReplies from '../view-replies/ViewReplies';
import CreateReply from '../create-reply/CreateReply';

// functions/hooks
import { useAuthContext } from '../../../hooks/useAuthContext';

// icons
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function HandleReplies({ postID, path, view, setView }) {
    const [showFeedback, setShowFeedback] = useState(false); // if user alert should be shown
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const post = {content: ''};

    const { user } = useAuthContext();

    const handleReply = async (isAnonymous, newContent) => {
        const doc  = {
            author: user.displayName,
            isAnonymous: isAnonymous,
            content: newContent,
            date: new Date()
        }

        post.content = newContent;

        try {
            await path.add(doc);
            alertUser('success', 'Reply Added!', 'The reply was added.'); 

            setView(false);

            return () => setView(false);
        } catch (err) {
            console.log(err);
        }
    }

    const alertUser = (status, title, desc) => {
        setFeedbackType(status);
        setFeedbackTitle(title);
        setFeedbackDesc(desc);
        setShowFeedback(true);
    }

    return (
        <>
            {view && user && 
                <CreateReply 
                    alertUser={alertUser}
                    displayName={user.displayName}
                    post={post}
                    setView={setView}
                    handleReply={handleReply}/>
            }


            <ViewReplies 
                path={path}
                postID={postID}
                alertUser={alertUser}/>

            {showFeedback && 
                <Snackbar 
                    open={showFeedback} 
                    onClose={() => setShowFeedback(false)}>
                        <Alert 
                            severity={feedbackType}
                            className="alert"
                            onClose={() => setShowFeedback(false)}>
                            <AlertTitle>{feedbackTitle}</AlertTitle>
                            {feedbackDesc}
                        </Alert>
                </Snackbar>
            }
        </>
    )
}
