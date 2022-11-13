// react imports
import { projFirestore } from '../../firebase/config';
import {useLocation} from "react-router-dom";

// icons
import { Card, CardContent } from '@mui/material';
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';

// components
import MoreOptions from '../../components/more-options/MoreOptions';

// styles 
import styles from './ViewPost.module.css';

export default function ViewPost() {
    const data = useLocation();
    const post = data.state.post;

    const handleDelete = () => {
        projFirestore.collection('posts').doc(post.id).delete();
    }

    return (
        <Card variant="outlined" className={styles.card}>
            <MoreOptions 
            size="small" 
            postID={post.id}
            handleDelete={handleDelete}
            displayEdit={true}
            displayDelete={true}
            displayFlag={false}
            />
            <h3>{post.title}</h3>
            <p>{post.time}</p>
            <CardContent>
                <div>{post.content}</div>
            </CardContent>
            <Button size="small" variant="contained">
                <ReplyIcon/>
                <span>Reply</span>
            </Button>
        </Card>
    )
}
