// react imports
import { projFirestore } from '../firebase/config';

const savePost = async (setFeedbackType, setFeedbackTitle, setShowFeedback, setFeedbackDesc, title, content, history, isValid) => {
    if (!isValid) {
        setFeedbackType('error');
        setFeedbackTitle('Error Creating Post');
        return;
    }    

    const doc = { 
        author: 'placeholder',
        title: title,
        content: content,
        numReplies: 0,
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

        titleLink = title.replace(/\ /g,'-');
        titleLink = titleLink.replace(/[^a-zA-Z-]/g, "");
        titleLink = titleLink.toLowerCase();
        setTimeout(() => history.push(`/posts/${titleLink}`), 2500);
    } catch(err) {
        setFeedbackType('error');
        setFeedbackTitle('Error Creating Post');
        setFeedbackDesc('The post could not be created. This is an error on our end. Please try again later');
        console.log(err);
    }
    
}

export default savePost;