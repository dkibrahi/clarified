// react imports
import { projFirestore } from '../firebase/config';

const validTitle = async (title, setFeedbackDesc, setValid) => {
    if (title.length === 0) {
        setFeedbackDesc('Please enter a title for the post');
        return false;
    }

    if (title.length >= 40) {
        setFeedbackDesc('Please shorten the length of the post to under 40 characters');
        return false;
    }

    let titleLink = title.replace(/[^a-zA-Z]/g, "");
    titleLink = titleLink.toLowerCase();

    projFirestore.collection('titles').doc(titleLink).get().then(data=> {
        if (data.exists) {
            setFeedbackDesc('A post with that tile already exists. Please choose a new title!');
            setValid(false);
            return false;
        }

        else {
            setValid(true);
            return true;
        }

    }, (err) => {
        setValid(false);
        return false;
    });
}

export default validTitle;