// styles
import styles from './PostTemplate.module.css';

export default function PostTemplate(title, author, date) {
  return (
    <div className="hold-post">
        <div className="hold-post__author">
            <img src="https://via.placeholder.com/150" alt="author" />
            <div className="hold-post__author-info">
                <h4>Author: {author}</h4>
                <p>date: {date}</p>
            </div>
        </div>
        <div className="hold-post__title">
            <h2>Title: {title}</h2>
        </div>
    </div>
);
}