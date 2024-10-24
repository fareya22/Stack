// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import Post from './components/Post.jsx';

function App() {
    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<h1>Welcome</h1>} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/post" element={< Post/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
