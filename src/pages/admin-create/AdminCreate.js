// react imports
import { projFirestore } from '../../firebase/config';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// icons
import { Alert, Card, TextField } from '@mui/material';

// components
import CreatePost from '../../components/create-post/CreatePost';

// styles
import styles from './AdminCreate.module.css';

export default function AdminCreate() {
    const history = useHistory();

    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [created, setCreated] = useState(true); 
    const [failedToCreate, setFailedToCreate] = useState(false);

    const [post, setPost] = useState(
        {
            title: '',
            content: ''
        }
    );

    const handleCancel = () => {
        history.push('/home');
    }

    const handleSave = async () => {
        const today = new Date().toISOString().slice(0, 10);        

        const doc = { 
            author: 'placeholder',
            title: newTitle,
            content: newContent,
            date: today 
        };

        try {
            await projFirestore.collection('posts').add(doc);
             history.push('/home');
            // history.push(`/posts${newTitle}`); will send user to their post eventually
        } catch(err) {
            console.log(err);
        }

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
                        required
                        id="outlined-required"
                        onChange={(e) => setNewTitle(e.target.value)}
                        label="Title"
                        defaultValue={post.title}/>
                </CreatePost>
            </Card>

            {/* {created && 
                <Alert 
                    severity={'success'}
                    title={'Created Post!'}
                    description={'The post was created! Users will be able to reply in just a moment....'}/>
            } */}

            {/* {failedToCreate && 
                <Alert />
            } */}
        </>
  )
}
