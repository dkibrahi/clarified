// react imports
import { projFirestore } from '../firebase/config';

// functions
import { cleanTitle } from '../functions/title';

const savePost = async (setFeedbackType, setFeedbackTitle, setFeedbackDesc, title, content, history, isValid) => {
    if (!isValid) {
        setFeedbackType('error');
        setFeedbackTitle('Error Creating Post');
        return;
    }    

    let linkTitle = cleanTitle(title);

    const doc = { 
        author: 'placeholder',
        title: title,
        content: content,
        date: new Date(),
        linkTitle: linkTitle
    };

    try {
        const firebaseObj = await projFirestore.collection('posts').add(doc);
        const postID = firebaseObj.id;

        setFeedbackType('success');
        setFeedbackTitle('Post Created');
        setFeedbackDesc('Post saved! Do NOT refresh. Users will be able to reply in just a moment...');

        linkTitle = linkTitle + '-' + postID;

        setTimeout(() => history.push(`/posts/${linkTitle}`), 2500);
    } catch(err) {
        setFeedbackType('error');
        setFeedbackTitle('Error Creating Post');
        setFeedbackDesc('The post could not be created. This is an error on our end. Please try again later');
        console.log(err);
    }
    
}

export default savePost;