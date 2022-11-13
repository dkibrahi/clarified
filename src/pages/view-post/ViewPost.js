// react imports
import { projFirestore } from '../../firebase/config';
import {useLocation} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

// icons
import { Card, CardContent, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// components
import MoreOptions from '../../components/more-options/MoreOptions';

// styles 
import styles from './ViewPost.module.css';

export default function ViewPost() {
    const history = useHistory();

    const data = useLocation();
    const post = data.state.post;

    const [isEditing, setIsEditing] = useState(data.state.edit);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const handleDelete = () => {
        projFirestore.collection('posts').doc(post.id).delete();
        history.push('/home');
    }

    const handleEdit = () => {
        setIsEditing(true);
    }
    
    const handleSave = async () => {
        await projFirestore.collection('posts').doc(post.id).update({
            title: newTitle,    
            content: newContent
        });
        
        setIsEditing(false);
    }


    return (
        <Card variant="outlined" className={styles.card}>
            <MoreOptions 
                size="small" 
                postID={post.id}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                displayEdit={true}
                displayDelete={true}
                displayFlag={false}
            />

            {isEditing && 
                <div className={styles.editPost}>
                    <TextField
                        required
                        id="outlined-required"
                        onChange={(e) => setNewTitle(e.target.value)}
                        label="Title"
                        defaultValue={post.title}
                    />
                    <TextField
                        id="outlined-multiline-static"
                        onChange={(e) => setNewContent(e.target.value)}
                        label="Multiline"
                        multiline
                        rows={4}
                        defaultValue={post.content}
                    />

                    <div className={styles.editPostButtons}>
                        <Button 
                            variant="contained" 
                            onClick={() => setIsEditing(false)}
                            className={styles.cancelButton}>
                            Cancel
                        </Button>
                        <Button 
                            variant="contained" 
                            onClick={handleSave}
                            className={styles.saveButton}>
                            Save
                        </Button>
                    </div>
                </div>
            }

            {!isEditing && 
                <>
                    <div className={styles.defaultPost}>
                        <h3>{post.title}</h3>
                        <p>{post.time}</p>
                        <CardContent>
                            <div>{post.content}</div>
                        </CardContent>
                        <Divider />
                    </div>
                    <Button size="small" variant="contained">
                        <ReplyIcon/>
                        <span>Reply</span>
                    </Button>
                </>
            }

        </Card>
    )
}
