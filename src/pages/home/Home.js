// react imports
import { projFirestore } from '../../firebase/config';
import { useEffect, useState } from 'react';

// styles
import styles from './Home.module.css';

// components
import UserPosts from '../../components/posts/user-posts/UserPosts';
import Loading from '../../components/loading-screen/Loading';


export default function Home() {
  const [posts, setPosts] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsPending(true);

    const unsub = projFirestore.collection('posts').orderBy('date').onSnapshot(snapshot => {
      if (snapshot.empty) {
        setError("No posts to load");
        setIsPending(false);
      }

      else {
        let results = [];

        snapshot.docs.forEach(doc => {
          results.push( { id: doc.id, ...doc.data() });
        })

        results.reverse();

        setPosts(results);
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
      {posts && <UserPosts posts={posts} />}
    </div>
  )
}