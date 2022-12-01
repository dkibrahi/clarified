// react import
import { useState } from 'react';
import { projFirestore } from '../../firebase/config';

// components
import ViewReplies from '../../components/view-replies/ViewReplies';
import CreateReply from '../create-reply/CreateReply';

// functions/hooks
import { useAuthContext } from '../../hooks/useAuthContext';

// icons
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function HandleReplies({ postID, view, setView }) {
    const [showFeedback, setShowFeedback] = useState(false); // if user alert should be shown
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const { user } = useAuthContext();

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
                    postID={postID}
                    setView={setView}/>
            }


            <ViewReplies postID={postID}/>

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
