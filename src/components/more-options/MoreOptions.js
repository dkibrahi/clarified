// react imports
import { useState } from 'react'; 
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

// styles
import styles from './MoreOptions.module.css';

const ITEM_HEIGHT = 48;

export default function MoreOptions() {
  const [showOptions, setShowOptions] = useState(null);
  const open = Boolean(showOptions);

  const handleClick = (e) => {
    setShowOptions(e.currentTarget);
  };

  const handleClose = () => {
    setShowOptions(null);
  };

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
          <MenuItem key="delete" onClick={handleClose}>
              <DeleteIcon className={styles.deleteIcon}/>
          </MenuItem>
        </div>
      </Menu>
    </div>
  )
}

