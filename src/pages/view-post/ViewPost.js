// react imports
import { projFirestore } from '../../firebase/config';
import { useLocation, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

// components
import HandleReplies from '../../components/replies/handle-replies/HandleReplies';
import MoreOptions from '../../components/more-options/MoreOptions';
import CreatePost from '../../components/posts/create-post/CreatePost';
import Loading from '../../components/loading-screen/Loading';

// functions/hooks
import { cleanTitle } from '../../functions/title';
import { usePost } from '../../hooks/usePost';

// icons
import { Card, CardContent, TextField } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

// styles 
import styles from './ViewPost.module.css';

export default function ViewPost() {
    const history = useHistory();

    const data = useLocation();

    let { titleLink } = useParams();

    const [view, setView] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');
    const [postDate, setPostDate] = useState(null);

    const [path, setPath] = useState(null);

    const { isPending, error, post, postID } = usePost(isEditing, titleLink, setPostDate, setNewTitle, setNewContent);

    useEffect(() => {
        if (data.state && 'edit' in data.state && data.state.edit) {
            setIsEditing(true);
        }

        if (postID) {
            setPath(projFirestore.collection('replies').doc(postID).collection('reply'));
            console.log(path);
        }
    }, [postID]);

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
        <div className={styles.view}>
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
                    displayDelete={true}/>

                {isEditing && 
                    <CreatePost
                        post={post}
                        displayCancel={true}
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
                        <Button 
                            size="small" 
                            variant="contained"
                            onClick={() => setView(true)}>
                            <ReplyIcon/>
                            <span>Reply</span>
                        </Button>
                    </>
                }
            </Card>
       }

       {post && path && 
       <HandleReplies 
            path={path}
            postID={postID}
            view={view}
            setView={setView}/> 
       }
       </div>
    )
}
