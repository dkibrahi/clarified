// react imports
import { projFirestore } from '../../firebase/config';
import {useLocation} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

// icons
import { Card, CardContent, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// components
import MoreOptions from '../../components/more-options/MoreOptions';
import CreatePost from '../../components/create-post/CreatePost';

// styles 
import styles from './ViewPost.module.css';
import Loading from '../../components/loading-screen/Loading';

export default function ViewPost() {
    const history = useHistory();

    const data = useLocation();
    const postID = data.state.postID;

    const [isEditing, setIsEditing] = useState(data.state.edit);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const [post, setPost] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsPending(true);
        
        const unsub = projFirestore.collection('posts').doc(postID).onSnapshot(snapshot => {
            if (snapshot.empty) {
                setError("Post was not found");
                setIsPending(false);
            }

            else {
                let result = {id: postID, ...snapshot.data()};

                setPost(result);
                setNewTitle(result.title);
                setNewContent(result.content);
                setIsPending(false);
            }
        
        }, (err) => {
            setError(err.message);
            setIsPending(false);
        });

        return () => unsub();
    }, [isEditing, postID]);

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
        <>
            {error && <p className='error'>{error}</p>}
            {isPending && <Loading />}

            {post && 
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
                    <CreatePost
                        post={post}
                        setNewContent={setNewContent}
                        setView={setIsEditing}
                        handleSave={handleSave}>
                        <TextField
                            required
                            id="outlined-required"
                            onChange={(e) => setNewTitle(e.target.value)}
                            label="Title"
                            defaultValue={post.title}/>
                    </CreatePost>
                }

                {!isEditing && 
                    <>
                        <div className={styles.defaultPost}>
                            <h3>{post.title}</h3>
                            <p>{post.date}</p>
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
       }
       </>
    )
}
