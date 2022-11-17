// react imports
import { projFirestore } from '../../firebase/config';
import {useLocation} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import isValid from '../../functions/isValid';
import savePost from '../../functions/savePost';

// icons
import { Card, CardContent, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// components
import MoreOptions from '../../components/more-options/MoreOptions';
import CreatePost from '../../components/create-post/CreatePost';
import AlertUser from '../../components/alert-user/AlertUser';

// styles 
import styles from './ViewPost.module.css';
import Loading from '../../components/loading-screen/Loading';

export default function ViewPost() {
    const history = useHistory();

    const data = useLocation();

    let { titleLink } = useParams();

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [postDate, setPostDate] = useState(null);

    const [post, setPost] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const [showFeedback, setShowFeedback] = useState(false); // if user alert should be shown
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');
    const [valid, setValid] = useState(null); // for save feature

    const [postID, setPostID] = useState('');

    useEffect(() => {
        if (data.state && 'edit' in data.state && data.state.edit) {
            setIsEditing(true);
        }
    }, []);

   
    useEffect(() => {
        setIsPending(true);

        grabPostID();

        if (postID.length == 0) {
            return;
        }
        
        const unsub = projFirestore.collection('posts').doc(postID).onSnapshot(snapshot => {
            if (snapshot.empty) {
                setError("Post was not found");
                setIsPending(false);
            }

            else {
                let result = {id: postID, ...snapshot.data()};
                
                setPostDate(result.date.toDate().toDateString()); 
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

    const grabPostID = () => {
        titleLink = titleLink.replace(/\-/g,'');
        titleLink = titleLink.toLowerCase();

        projFirestore.collection('titles').doc(titleLink).onSnapshot(snapshot => {
            if (snapshot.empty) {
                setError("Post was not found");
                setIsPending(false);
            }

            else {
                setPostID(snapshot.data().postID);
            }

        }, (err) => {
            setError(err.message);
            setIsPending(false);
        });
    }

    const handleDelete = () => {
        projFirestore.collection('posts').doc(post.id).delete();
        history.push('/home');
    }

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = async () => {
        if (post.title === newTitle) {
            setIsEditing(false);
            return;
        }

        isValid(newTitle, setFeedbackDesc, setValid);
    }

    useEffect(() => {
        if (valid !== null && typeof valid !== 'undefined') {
            savePost(setFeedbackType, setFeedbackTitle, setShowFeedback, setFeedbackDesc, newTitle, newContent, history, valid);
        }

         setIsEditing(false);

    }, [valid]);
    

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
                            <p>{postDate}</p>
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

                {showFeedback && <AlertUser 
                    display={showFeedback}
                    severity={feedbackType}
                    title={feedbackTitle}
                    description={feedbackDesc}/>
                }
            </Card>
        }

       </>
    )
}
