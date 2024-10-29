import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function PostList({ token }) {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('');
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [showingUserPosts, setShowingUserPosts] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    const res = await fetch(`http://localhost:3000/post`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setShowingUserPosts(false);
  };

  const fetchUserPosts = async () => {
    const res = await fetch(`http://localhost:3000/mypost`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setShowingUserPosts(true);
  };

  const handleCreatePost = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', Array.isArray(content) ? content.join('\n') : content);

    if (isFileUpload && file) {
      formData.append('codeSnippet', file);
    } else {
      formData.append('language', language);
    }

    const res = await fetch(`http://localhost:3000/post`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      setFile(null);
      setLanguage('');
      alert("Post created successfully");
      fetchPosts();
    } else {
      const errorData = await res.json();
      alert(`Error creating post: ${errorData.message}`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Create a Post</h2>
        <button
          onClick={showingUserPosts ? fetchPosts : fetchUserPosts}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-5 rounded-lg shadow transition duration-200"
        >
          {showingUserPosts ? "View Posts by Others" : "View My Posts"}
        </button>
      </div>
      
      <div className="mb-6">
        <button
          onClick={() => setIsFileUpload(!isFileUpload)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg shadow-sm transition duration-200"
        >
          {isFileUpload ? "Switch to Code Snippet" : "Switch to File Upload"}
        </button>
      </div>
  
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
      />
      
      {isFileUpload ? (
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none"
        />
      ) : (
        <>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Code Snippet"
            className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
            rows="4"
          />
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="block w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-400"
          >
            <option value="">Select Language</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
          </select>
        </>
      )}
  
      <button
        onClick={handleCreatePost}
        className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg shadow transition duration-200 mb-8"
      >
        Create Post
      </button>
  
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        {showingUserPosts ? "My Posts" : "Posts by Others"}
      </h2>
      
      {posts.length ? (
        posts.map(post => (
          <div key={post._id} className="p-6 mb-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-gray-700 mb-2">{post.content}</p>
            <p className="text-sm text-gray-500">Posted by: {post.email}</p>
            
            {post.isFileUpload && post.folderName ? (
              <p className="text-sm text-gray-500">Folder Name: {post.folderName}</p>
            ) : post.language ? (
              <p className="text-sm text-gray-500">Language: {post.language}</p>
            ) : null}
  
            {post.codeSnippetUrl && (
              <a
                href={post.codeSnippetUrl}
                className="text-blue-500 hover:underline mt-2 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                View file
              </a>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No posts available.</p>
      )}
    </div>
  );
  
}

PostList.propTypes = {
  token: PropTypes.string.isRequired,
};

export default PostList;
