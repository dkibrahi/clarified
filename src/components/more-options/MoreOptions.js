// react imports
import { useState } from 'react'; 

// icons
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import FlagIcon from '@mui/icons-material/Flag';

// styles
import styles from './MoreOptions.module.css';
import PopUpDialog from '../popup-dialog/PopUpDialog';

const ITEM_HEIGHT = 48;

export default function MoreOptions(props) {
  const [showOptions, setShowOptions] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const open = Boolean(showOptions);

  const handleClick = (e) => {
    setShowOptions(e.currentTarget);
  };

  const handleClose = () => {
    setShowOptions(null);
  };

  const handleDelete = () => {
    setShowOptions(null);
    props.handleDelete(); // let parent delete specific 
  };

  const handleSend = async (dialogDescription) => {
    setShowDialog(false);
    props.handleFlag(dialogDescription);
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
          {props.displayEdit && <MenuItem key="edit" onClick={handleClose}>
              <CreateIcon className={styles.editIcon}/> 
          </MenuItem> }
          {props.displayDelete && <MenuItem key="delete" onClick={handleDelete}>
              <DeleteIcon className={styles.deleteIcon}/> 
          </MenuItem> }
          {props.displayFlag && <MenuItem key="flag" onClick={() => setShowDialog(true)}>
              <FlagIcon className={styles.flagIcon}/>
              {showDialog && <PopUpDialog handleSend={handleSend}/> }
          </MenuItem> }
        </div>
      </Menu>
    </div>
  )
}

