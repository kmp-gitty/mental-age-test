// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home.jsx';
import Blog from './Blog';
import BlogPost1_ChronvsPsych from './Blog_Post1_ChronvsPsych';

export default function App() {
  return (
    <Router>
      <div className="font-sans bg-white min-h-screen">
        {/* Top Navigation */}
        <div className="flex bg-blue-800 text-white text-lg font-semibold">
          <div className="flex-1 px-6 py-4 border-r border-black text-left cursor-pointer">
          <a href="/">Home</a>
          </div>
          <div className="px-6 py-4 text-right cursor-pointer">
            <Link to="/blog">Blog</Link>
          </div>
        </div>

        {/* Page Routing */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/chronological-vs-psychological-age" element={<BlogPost1_ChronvsPsych />} />
          </Routes>
      </div>
    </Router>
  );
}
