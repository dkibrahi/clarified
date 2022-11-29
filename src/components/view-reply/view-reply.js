// react imports
import { projFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';

// styles
import styles from './Home.module.css';

// components
import UserReply from '../../components/user-reply/UserReply';
import Loading from '../../components/loading-screen/Loading';


export default function ViewReplies(props) {
  const [replies, setReplies] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projFirestore.collection('replies').doc(props.postID).collection('reply').orderBy('date').onSnapshot(snapshot => {
      if (snapshot.empty) {
        setIsPending(false);
      }

      else {
        let results = [];

        snapshot.docs.forEach(doc => {
          results.push( { id: doc.id, ...doc.data() });
        })

        results.reverse();

        setReplies(results);
        setIsPending(false);
      }
    
    }, (err) => {
        setError(err.message);
        setIsPending(false);
      });

    return () => unsub();
  }, []);


  return (
    <div className='home'>
      {error && <p className='error'>{error}</p>}
      {isPending && <Loading />}
      {replies && <UserReply replies={replies} />}
    </div>
  )
}