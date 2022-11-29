// react imports
import { projFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';

// components
import Loading from '../loading-screen/Loading';
import UserReplies from '../user-replies/UserReplies';


export default function ViewReplies({ postID }) {
  const [replies, setReplies] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    console.log("reached view replies");

    const unsub = projFirestore.collection('replies').doc(postID).collection('reply').orderBy('date').onSnapshot(snapshot => {
      if (snapshot.empty) {
        setIsPending(false);
      }

      else {
        let results = [];

        snapshot.docs.forEach(doc => {
          results.push( { id: doc.id, ...doc.data() });
        })

        results.reverse();

        console.log(results);

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
      {replies && <UserReplies replies={replies} postID={postID}/>}
    </div>
  )
}