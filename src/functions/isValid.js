// react imports
import { projFirestore } from '../firebase/config';

const validTitle = async (title, setFeedbackDesc, setValid) => {
    if (title.length === 0) {
        setFeedbackDesc('Please enter a title for the post');
        setValid(false);
        return;
    }

    if (title.length >= 40) {
        setFeedbackDesc('Please shorten the length of the post to under 40 characters');
        setValid(false);
        return;
    }

    title = title.replace(/\ /g,'');
    title = title.toLowerCase();

    projFirestore.collection('titles').doc(title).onSnapshot(snapshot => {
        if (snapshot.exists) {
            setFeedbackDesc('A post with that tile already exists. Please choose a new title!');
            setValid(false);
        }

        else {
            setValid(true);
        }

    }, (err) => {
        return false;
    });
}

export default validTitle;