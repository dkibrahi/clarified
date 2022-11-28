// react imports
import { useState } from 'react'; 

// component
import Flag from './Flag';

// functions/hooks
import { useAuthContext } from '../../hooks/useAuthContext';

// icons
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';

// styles
import styles from './MoreOptions.module.css';


const ITEM_HEIGHT = 48;

export default function MoreOptions(props) {
  const [showOptions, setShowOptions] = useState(null);
  const open = Boolean(showOptions);

  const { user, isAdmin } = useAuthContext();

  const email = props.author + '@umich.edu';

  const handleClick = (e) => {
    setShowOptions(e.currentTarget);
  };

  const handleClose = () => {
    setShowOptions(null);
  };

  const handleDelete = () => {
    setShowOptions(null);
    props.handleDelete(); // let parent delete specific post
  };

  const handleEdit = () => {
    setShowOptions(null);
    props.handleEdit();
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
          {props.displayEdit && email === user.email && 
          <MenuItem key="edit" onClick={handleEdit}>
              <CreateIcon className={styles.editIcon}/> 
          </MenuItem> 
          }

          {props.displayDelete && email === user.email && 
          <MenuItem key="delete" onClick={handleDelete}>
              <DeleteIcon className={styles.deleteIcon}/> 
          </MenuItem> }

          {/* user cannot flag their own content */}
          {email !== user.email &&
          <Flag 
            postID={props.postID}
            author={user.displayName}
            admin={isAdmin}
          />
          }
        </div>
      </Menu>
    </div>
  )
}

