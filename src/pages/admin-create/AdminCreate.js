// react imports
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// icons
import { Card, TextField, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// components
import CreatePost from '../../components/create-post/CreatePost';

// functions/hooks
import { validTitle } from '../../functions/title';
import savePost from '../../functions/savePost';
import { useAuthContext } from '../../hooks/useAuthContext';

// styles
import styles from './AdminCreate.module.css';

export default function AdminCreate() {
    const history = useHistory();

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [showFeedback, setShowFeedback] = useState(false); // if user alert should be shown
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const [valid, setValid] = useState(null); // for save feature

    const { user } = useAuthContext();

    let post = {title: '', content: ''};

    const handleCancel = () => {
        history.push('/');
    }

    const handleSave = async () => {
        setValid(null);

        validTitle(newTitle, setFeedbackDesc, setValid).then(res => {
            setValid(res);
        });
    }

    useEffect(() => {
        const ac = new AbortController();

        if (valid !== null && typeof valid !== 'undefined') {
            savePost(setFeedbackType, setFeedbackTitle, setFeedbackDesc, newTitle, newContent, history, valid, user).then(res => {
                setShowFeedback(true);
            })
        }

        return () => ac.abort();
    }, [valid]);


    return (
        <>
            <Card variant="outlined" className={styles.card}>
                <CreatePost
                    post={post}
                    displayCancel={true}
                    setView={handleCancel}
                    setNewContent={setNewContent}
                    handleSave={handleSave}>
                    <TextField
                        id="outlined-required"
                        onChange={(e) => setNewTitle(e.target.value)}
                        label="Title"
                        defaultValue={post.title}/>
                </CreatePost>
            </Card>

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
