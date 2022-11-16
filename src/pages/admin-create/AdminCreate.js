// react imports
import { projFirestore } from '../../firebase/config';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

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

    const [post, setPost] = useState({title: '', content: ''});

    // to do, check user title and make sure it is unquie, give message if not
    // make sure description isn't empty

    const handleCancel = () => {
        history.push('/home');
    }

    const handleSave = async () => {
        if (!validTitle()) {
            setShowFeedback(true);
            setFeedbackType('error');
            setFeedbackTitle('Error Creating Post');
            return;
        } 

        const today = new Date().toISOString().slice(0, 10);   

        const doc = { 
            author: 'placeholder',
            title: newTitle,
            content: newContent,
            date: new Date()
        };

        try {
            await projFirestore.collection('posts').add(doc);
            setShowFeedback(true);
            setFeedbackType('success');
            setFeedbackTitle('Post Created');
            setFeedbackDesc('Post was created! Users will be able to reply in just a moment...');

            //  history.push('/home');
            // history.push(`/posts${newTitle}`); will send user to their post eventually
        } catch(err) {
            setShowFeedback(true);
            setFeedbackType('error');
            setFeedbackTitle('Error Creating Post');
            setFeedbackDesc('The post could not be created. This is an error on our end. Please try again later');
            console.log(err);
        }

    }

    const validTitle = () => {
        if (newTitle.length == 0) {
            setFeedbackDesc('Please enter a title for the post');
            return false;
        }

        if (newTitle.length >= 40) {
            setFeedbackDesc('Please shorten the length of the post to under 40 characters');
            return false;
        }

        // unique check

        return true;
    }

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
