// react imports
import { useState } from 'react'; 
import { projFirestore } from '../../firebase/config';


// icons
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import FlagIcon from '@mui/icons-material/Flag';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

// styles
import styles from './MoreOptions.module.css';

const ITEM_HEIGHT = 48;

export default function MoreOptions({ postID, displaySuccess, displayFailure }) {
  const [showOptions, setShowOptions] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [description, setDescription] = useState('');
  const open = Boolean(showOptions);

  const handleClick = (e) => {
    setShowOptions(e.currentTarget);
  };

  const handleClose = () => {
    setShowOptions(null);
  };

  const handleDelete = () => {
    setShowOptions(null);
    projFirestore.collection('posts').doc(postID).delete();
  };

  const handleFlag = () => {
    setShowDialog(true);
  }

  const closeFlag = () => {
    setShowDialog(false);
  }

  const handleSend = async () => {
    const doc = { postID, reportedBy: "dkibrahi", description };

    try {
      await projFirestore.collection('reports').add(doc);
    } catch(err) {
      console.log(err);
    }

    setShowDialog(false);
  }

  return (
    <div className={styles.optionsIcon}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon color="primary"/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={showOptions}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '7ch',
          },
        }}
      >
        <div className={styles.toggleIcons}>
          <MenuItem key="edit" onClick={handleClose}>
              <CreateIcon className={styles.editIcon}/>
          </MenuItem>
          <MenuItem key="delete" onClick={handleDelete}>
              <DeleteIcon className={styles.deleteIcon}/>
          </MenuItem>
          <MenuItem key="delete" onClick={handleFlag}>
              <FlagIcon className={styles.deleteIcon}/>
          </MenuItem>
        </div>
      </Menu>
      <Dialog
        open={showDialog}
        onClose={closeFlag}
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
          <Button onClick={closeFlag}>Cancel</Button>
          <Button onClick={handleSend}>Send</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

