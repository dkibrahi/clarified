// react imports
import { projFirestore } from '../../firebase/config';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import isValid from '../../functions/isValid';
import savePost from '../../functions/savePost';

// icons
import { Card, TextField } from '@mui/material';

// components
import CreatePost from '../../components/create-post/CreatePost';
import AlertUser from '../../components/alert-user/AlertUser';

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

    const [post, setPost] = useState({title: '', content: ''});

    // to do, check user title and make sure it is unquie, give message if not
    // make sure description isn't empty

    const handleCancel = () => {
        history.push('/home');
    }

    const handleSave = async () => {
        isValid(newTitle, setFeedbackDesc, setValid);
    }

    useEffect(() => {
        if (valid !== null && typeof valid !== 'undefined') {
            savePost(setFeedbackType, setFeedbackTitle, setShowFeedback, setFeedbackDesc, newTitle, newContent, history, valid);
        }
    }, [valid]);

    const handleChange = (e) => {
        setNewTitle(e.target.value);
        setShowFeedback(false);
    }

    return (
        <>
            <Card variant="outlined" className={styles.card}>
                <CreatePost
                    post={post}
                    setView={handleCancel}
                    setNewContent={setNewContent}
                    handleSave={handleSave}>
                    <TextField
                        id="outlined-required"
                        onChange={(e) => handleChange(e)}
                        label="Title"
                        defaultValue={post.title}/>
                </CreatePost>
            </Card>

        {showFeedback && <AlertUser 
            display={showFeedback}
            severity={feedbackType}
            title={feedbackTitle}
            description={feedbackDesc}/>
        }

        </>
  )
}
