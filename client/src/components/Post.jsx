// client/src/components/Post.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Post() {
    const [text, setText] = useState('');
    const [codeSnippet, setCodeSnippet] = useState('');
    const [language, setLanguage] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('text', text);
        formData.append('codeSnippet', codeSnippet);
        formData.append('language', language);
        formData.append('fileName', fileName);
        if (file) {
            formData.append('file', file);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include the token in the headers
                },
            });
            alert('Post created successfully');
            // Clear fields after submission
            setText('');
            setCodeSnippet('');
            setLanguage('');
            setFileName('');
            setFile(null);
        } catch (error) {
            alert(error.response?.data?.error || 'Error creating post');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Post</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <textarea
                        placeholder="Post text..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Code Snippet..."
                        value={codeSnippet}
                        onChange={(e) => setCodeSnippet(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="File Name (for code snippet)"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Create Post
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Post;
