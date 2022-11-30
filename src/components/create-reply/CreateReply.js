// react import
import { useState } from 'react';
import { projFirestore } from '../../firebase/config';

// components
import CreatePost from '../create-post/CreatePost';

// icons
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateReply(props) {
    const [open, setOpen] = useState(false);

    const [newContent, setNewContent] = useState('');
    

    const post = {content: ''};   

    const handleSave = () => {
        if (newContent.length < 5) {
            props.alertUser('error', 'Reply Not Added!', 'The reply is too short. Add more words'); 
            return;
        }

        if (newContent.length > 1500) {
            props.alertUser('error', 'Reply Not Added!', 'The reply is too long. Please shorten it.'); 
            return;
        }

        setOpen(true);
    } 

    const handleChoice = async (choice) => {
        const author = choice === 'd' ? props.displayName : 'anonymous'

        const doc  = {
            author: author,
            content: newContent,
            date: new Date()
        }

        try {
            await projFirestore.collection('replies').doc(props.postID).collection('reply').add(doc);
            props.alertUser('success', 'Reply Added!', 'The reply was added.'); 

            props.setView(false);

            return () => props.setView(false);
        } catch (err) {
            console.log(err);
        }

        setOpen(false);
    }

    return (
        <>
            <CreatePost
                post={post}
                setView={props.setView}
                setNewContent={setNewContent}
                handleSave={handleSave} />

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Would you like to remain anonymous?
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Remaining anonymous means other users won't see that YOU SPECIFICALLY posted this comment. You can always change this by editing the reply.
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {handleChoice('d')}}>Disagree</Button>
                    <Button onClick={() => {handleChoice('a')}}>Agree</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

