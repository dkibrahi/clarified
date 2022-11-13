// react imports
import { useState } from 'react'; 

// icons
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


export default function PopUpDialog({ handleSend }) {
    const [showDialog, setShowDialog] = useState(true);
    const [description, setDescription] = useState('');

    const sendDialog = async () => {
        setShowDialog(false);
        handleSend(description);
    }

    return (
        <Dialog
            open={showDialog}
            onClose={() => setShowDialog(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {"Report User"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Let us know what was wrong about the comment.
            </DialogContentText>
            <TextField
                autoFocus
                onChange={(e) => setDescription(e.target.value) }
                margin="dense"
                id="name"
                label="Description"
                type="report"
                fullWidth
                variant="standard"
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={sendDialog}>Send</Button>
            </DialogActions>
        </Dialog>
    )
}
