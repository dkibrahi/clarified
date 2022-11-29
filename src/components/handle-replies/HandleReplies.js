// react import
import { useState } from 'react';
import { projFirestore } from '../../firebase/config';

// components
import ViewReplies from '../../components/view-replies/ViewReplies';
import CreatePost from '../create-post/CreatePost';

// functions/hooks
import { useAuthContext } from '../../hooks/useAuthContext';

// icons
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// styles
import styles from '../alert-user/AlertUser';

export default function HandleReplies({ postID }) {
    const [newContent, setNewContent] = useState('');

    const [showFeedback, setShowFeedback] = useState(false); // if user alert should be shown
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const { user } = useAuthContext();

    const post = {content: ''};

    const handleSave = () => {
        if (newContent.length < 15) {
             alertUser('error', 'Reply Not Added!', 'The reply is too short. Add more words'); 
            return;
        }

        if (newContent.length > 1500) {
            alertUser('error', 'Reply Not Added!', 'The reply is too long. Please shorten it.'); 
            return;
        }

        const doc  = {
            author: user.displayName,
            content: newContent,
            date: new Date()
        }

        try {
            const unsub = projFirestore.collection('replies').doc(postID).collection('reply').add(doc);
            alertUser('success', 'Reply Added!', 'The reply was added.'); 
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
            <CreatePost
                post={post}
                displayCancel={false}
                setNewContent={setNewContent}
                handleSave={handleSave} />
            <ViewReplies postID={postID}/>

            {showFeedback && 
                <Snackbar 
                    open={showFeedback} 
                    onClose={() => setShowFeedback(false)}>
                        <Alert 
                            severity={feedbackType}
                            className={styles.alert}
                            onClose={() => setShowFeedback(false)}>
                            <AlertTitle>{feedbackTitle}</AlertTitle>
                            {feedbackDesc}
                        </Alert>
                </Snackbar>
            }
        </>
    )
}
