// react 
import { useState, useEffect } from 'react';
import { projFirestore } from '../../firebase/config';

// icons
import { Fab } from '@mui/material';
import MessageIcon from '@mui/icons-material/Message';

// styles
import styles from './PostRatings.module.css';

export default function PostRatings({ numReplies }) {
  return (
    <>
      <Fab 
        variant="extended" 
        size="small">
          <span className={styles.comments}>
            <MessageIcon /> 
            {numReplies}
          </span>
      </Fab>
    </>
  )
}
