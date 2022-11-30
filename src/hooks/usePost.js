// react imports
import { useState, useEffect } from 'react';
import { projFirestore } from '../firebase/config';
import { useHistory } from "react-router-dom";

export const usePost = (isEditing, titleLink, setPostDate, setNewTitle, setNewContent) => {
    const history = useHistory();

    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState(null);

    const [postID, setPostID] = useState(''); // use a hook because use-effect should change depending on postID
    const [post, setPost] = useState(null);
    

    useEffect(() => {
        setIsPending(true);

        grabPostID();

        if (postID.length === 0) {
            return;
        }
        
        
        const unsub = projFirestore.collection('posts').doc(postID).get().then(snapshot => {
            if (snapshot.empty) {
                setError("Post was not found");
                setIsPending(false);
            }

            else {
                let result = {id: postID, ...snapshot.data()};

                if (!result.title) {
                    setError("Post was not found");
                }

                else {
                    setPostDate(result.date.toDate().toDateString()); 

                    setPost(result);
                    setNewTitle(result.title);
                    setNewContent(result.content);
                }
                
                setIsPending(false);

                return () => unsub();
            }
        
        }, (err) => {
            setError(err.message);
            setIsPending(false);
        });

    }, [isEditing, postID]);

    const grabPostID = () => {
        if (!(titleLink.includes('-'))) {
                history.push('/error');
        }

        setPostID(titleLink.split('-').pop());
    }

    return { isPending, error, post, postID };
}

