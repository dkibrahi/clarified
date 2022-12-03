// react imports
import { useState } from 'react';
import { projFirestore } from '../../firebase/config';

// icons
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import FlagIcon from '@mui/icons-material/Flag';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// styles
import styles from './MoreOptions.module.css';


export default function Flag(props) {
    const [open, setOpen] = useState(false);

    const [description, setDescription] = useState('');

    const [displayAlert, setDisplayAlert] = useState(false);
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [feedbackDesc, setFeedbackDesc] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (description.length < 10) {
            alertUser('error', 'Description too short', 'Please enter a description of at least 10 characters');
            setOpen(false);
            return;
        }

        projFirestore.collection('reports').doc(props.postID).collection("report").doc(props.author).set({
            description: description,
            admin: props.admin,
            date: new Date()
        }).then(res => {
            alertUser('success', 'Report submitted/updated', 'A member of our team will review the report and contact you with updates. If you\'ve already submitted a report, we will go with the one you\'ve just submitted.');
        });

        alertUser('success', 'Report submitted', 'A report was submitted/updated with the your concerns');
        setOpen(false);
    }

    const alertUser = (status, title, desc) => {
        setFeedbackType(status);
        setFeedbackTitle(title);
        setFeedbackDesc(desc);
        setDisplayAlert(true);
    }

    return (
        <>
            <MenuItem 
                key="flag" 
                onClick={() => setOpen(true)}
                data-testid="flag">
                <FlagIcon className={styles.flagIcon}/>
            </MenuItem>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Report User</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        Please describe why you would like to report the user/this comment.
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id="name"
                        label="Description"
                        fullWidth
                        variant="standard"/>
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
                </DialogActions>
            </Dialog>

            {
                    displayAlert && 
                    <Snackbar 
                        open={displayAlert} 
                        onClose={() => setDisplayAlert(false)}>
                            <Alert 
                                severity={feedbackType}
                                className={styles.alert}
                                onClose={() => setDisplayAlert(false)}>
                                <AlertTitle>{feedbackTitle}</AlertTitle>
                                {feedbackDesc}
                            </Alert>
                    </Snackbar>
            }
        </>
  );
}