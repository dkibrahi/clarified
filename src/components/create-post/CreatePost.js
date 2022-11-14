// react imports
import { useState } from 'react';
import { projFirestore } from '../../firebase/config';
import Button from '@material-ui/core/Button';

import styles from './CreatePost.module.css';

export default function CreatePost() {
    const[author, setAuthor] = useState('John Doe');
    const[content, setContent] = useState('');
    const[title, setTitle] = useState('');
    var time = new Date().toLocaleTimeString();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const posts = {author, content, title, time};
        console.log(posts);
        try {
            await projFirestore.collection('posts').add(posts).set({
                author: author,
                content: content,
                title: title,
                time: time
            })
        } catch(err) {
            console.log(err);
        }
    }
    return (
   <div className='create'>
    <h2 className='page-title'>Create Post</h2>
    
    <form onSubmit={handleSubmit}>
        <label>
            <span>Author:</span>
            <input type ="text" 
            onChange={(e)=> setAuthor(e.target.value)} 
            value={author}
            required
        />
        </label>

        <label>
            <span>Content:</span>
            <textarea
            onChange={(e)=> setContent(e.target.value)}
            value={content}
            required
            />
        </label>

        <label>
            <span >Title:</span>
            <input type = "text"
            onChange={(e)=> setTitle(e.target.value)}
            value={title}
            required
            />
        </label>

        <Button color="secondary" type='submit'>Create Post</Button>

    </form>
   </div>
  )
}
