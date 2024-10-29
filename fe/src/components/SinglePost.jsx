import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

const SinglePost = ({ token }) => {
  const { postId } = useParams(); // Get postId from the URL
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    const res = await fetch(`http://localhost:3000/post/${postId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPost(data);
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-3">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500 mb-4">Posted by: {post.email}</p> {/* Author's email */}
      
      {post.codeSnippetUrl && (
        <a
          href={post.codeSnippetUrl}
          className="text-indigo-500 font-medium hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Code Snippet
        </a>
      )}
    </div>
  );
  
};

SinglePost.propTypes = {
  token: PropTypes.string.isRequired,
};

export default SinglePost;
