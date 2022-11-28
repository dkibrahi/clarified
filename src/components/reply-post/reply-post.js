import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

// styles
import styles from './CreateReply.module.css';

export default function CreateReply(props) {
    return (
        <div className={styles.ReplyPost}>
            {props.children}
            <TextField
                id="outlined-multiline-static"
                onChange={(e) => props.setNewContent(e.target.value)}
                label="Multiline"
                multiline
                rows={4}
                defaultValue={props.replies.content}
            />

            <div className={styles.editReplyButtons}>
                <Button 
                    variant="contained" 
                    onClick={() => props.setView(false)}
                    className={styles.cancelButton}>
                    Cancel
                </Button>
                <Button 
                    variant="contained" 
                    onClick={props.handleSave}
                    className={styles.saveButton}>
                    Save
                </Button>
            </div>
        </div>
  )
}

