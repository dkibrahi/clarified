// react import
import { useState } from 'react';

// components
import CreatePost from '../../posts/create-post/CreatePost';

// icons
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateReply(props) {
    const [open, setOpen] = useState(false);

    const [newContent, setNewContent] = useState(props.post.content);
 

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
        const isAnonymous = choice === 'a' ? true: false;

        props.handleReply(isAnonymous, newContent);

        setOpen(false);
    }

    return (
        <>
            <CreatePost
                post={props.post}
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
                        Remaining anonymous means other users won't see that YOU SPECIFICALLY posted this comment. You can always change this by editing the reply once it's submitted
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => {handleChoice('d')}}>No, show my name!</Button>
                    <Button onClick={() => {handleChoice('a')}}>Remain anonymous</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

