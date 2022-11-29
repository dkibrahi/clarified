// react imports
import { projFirestore } from '../../firebase/config';
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

// icons
import { Card, CardContent, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// components
import MoreOptions from '../../components/more-options/MoreOptions';
import CreatePost from '../../components/create-post/CreatePost';
import Loading from '../../components/loading-screen/Loading';

// functions
import { cleanTitle } from '../../functions/title';

// styles 
import styles from './ViewPost.module.css';

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

    const [postID, setPostID] = useState('');

    useEffect(() => {
        if (data.state && 'edit' in data.state && data.state.edit) {
            setIsEditing(true);
        }
    }, []);

   
    useEffect(() => {
        setIsPending(true);

        grabPostID();

        if (postID.length === 0) {
            return;
        }
        
        
        const unsub = projFirestore.collection('posts').doc(postID).get().then(snapshot => {
            if (snapshot.empty) {
                setError("Post was not found");
                setIsPending(false);
            }

            else {
                let result = {id: postID, ...snapshot.data()};

                if (!result.title) {
                    setError("Post was not found");
                }

                else {
                    setPostDate(result.date.toDate().toDateString()); 

                    setPost(result);
                    setNewTitle(result.title);
                    setNewContent(result.content);
                }
                
                setIsPending(false);

                return () => unsub();
            }
        
        }, (err) => {
            setError(err.message);
            setIsPending(false);
        });

    }, [isEditing, postID]);


    const grabPostID = () => {
        if (!(titleLink.includes('-'))) {
            history.push('/error');
        }

        setPostID(titleLink.split('-').pop());
    }

    const handleDelete = async () => {
        await projFirestore.collection('posts').doc(post.id).delete();
        history.push('/');
    }

    const handleEdit = () => {
        setIsEditing(true);
    }
    
    const handleSave = async () => {
        let linkTitle = cleanTitle(newTitle);

        await projFirestore.collection('posts').doc(post.id).update({ 
            title: newTitle,   
            content: newContent,
            linkTitle: linkTitle
        });
        
        linkTitle = linkTitle + '-' + post.id;

        history.push(`/posts/${linkTitle}`);
        window.location.reload();
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
                    author={post.author}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    displayEdit={true}
                    displayDelete={true}
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
                            <p>{post.author}</p>
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
            </Card>
       }
       </>
    )
}
