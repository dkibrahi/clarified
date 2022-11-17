// react imports
import { projFirestore } from '../firebase/config';
import { useHistory } from 'react-router-dom';

const savePost = async (setFeedbackType, setFeedbackTitle, setShowFeedback, setFeedbackDesc, title, content, history, isValid) => {
    if (!isValid) {
        console.log(isValid);
        alert("reached saved post and not valid");
        setFeedbackType('error');
        setFeedbackTitle('Error Creating Post');
        setShowFeedback(true);
        return;
    }    

    const doc = { 
        author: 'placeholder',
        title: title,
        content: content,
        date: new Date()
    };

    try {
        const firebaseObj = await projFirestore.collection('posts').add(doc);
        const postID = firebaseObj.id;

        let titleLink = title.replace(/[^a-zA-Z]/g, "");
        titleLink = titleLink.toLowerCase();

        await projFirestore.collection('titles').doc(titleLink).set({'postID': postID});
        setFeedbackType('success');
        setFeedbackTitle('Post Created');
        setFeedbackDesc('Post saved! Do NOT refresh. Users will be able to reply in just a moment...');
        setShowFeedback(true);

        titleLink = title.replace(/\ /g,'-');
        titleLink = titleLink.replace(/[^a-zA-Z-]/g, "");
        titleLink = titleLink.toLowerCase();
        setTimeout(() => history.push(`/posts/${titleLink}`), 2500);
    } catch(err) {
        setFeedbackType('error');
        setFeedbackTitle('Error Creating Post');
        setFeedbackDesc('The post could not be created. This is an error on our end. Please try again later');
        setShowFeedback(true);
        console.log(err);
    }
    
}

export default savePost;