// react imports
import { Link } from 'react-router-dom';
import { projFirestore } from '../../firebase/config';

// styles 


// component that takes ALL user posts and outputs them
export default function UserPosts( { posts } ) {
  if (posts.length === 0) {
    return <div className='error'>No posts found....</div>
  }


  return (
    <div className="recipe-list">
        {posts.map((post) => (
            <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.time}</p>
                <div>{post.content.substring(0, 100)}...</div>
                {/* <Link to={`/posts/${post.id}`}>Cook this</Link> */}
            </div>
        ))}
    </div>
  )
}
