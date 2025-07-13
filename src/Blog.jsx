import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import brainImage from './assets/resized_brains_banner_300x250.png';

// Simulated blog post list
const allPosts = [
  {
    title: 'How Does the Mental Age Test Work?',
    date: '7/13/25',
    description: 'Our Mental Age Test takes you through a series of 17 binary choice questions...',
    image: brainImage,
    link: '/blog/how-does-the-mental-age-test-work',
  },
  {
    title: 'The Science Behind Personality',
    date: '7/10/25',
    description: 'What is personality? How does personality relate to my mental age? What does the science say...',
    image: brainImage,
    link: '/blog/science-behind-personality',
  },
  
  {
    title: 'Chronological Age vs. Psychological Age',
    date: '5/25/25',
    description: 'When we think about age, the first thing that comes to mind is usually chronological age — the number of years we’ve lived...',
    image: brainImage,
    link: '/blog/chronological-vs-psychological-age',
  },
  // Add more posts here to simulate loading more content
];

export default function Blog() {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [postCount, setPostCount] = useState(6); // load 6 at a time
  const loader = useRef(null);

  useEffect(() => {
    setVisiblePosts(allPosts.slice(0, postCount));
  }, [postCount]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (postCount < allPosts.length) {
          setPostCount((prev) => Math.min(prev + 6, allPosts.length));
        }
      }
    });
    if (loader.current) observer.observe(loader.current);
    return () => loader.current && observer.unobserve(loader.current);
  }, [postCount]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest in News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post, idx) => (
          <div key={idx} className="bg-white shadow rounded overflow-hidden">
            <img src={post.image} alt={post.title} className="w-full h-[250px] object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <Link to={post.link} className="text-blue-600 underline">Read more</Link>
            </div>
          </div>
        ))}
      </div>
      {postCount < allPosts.length && (
        <div ref={loader} className="text-center py-8 text-gray-500">Loading more posts...</div>
      )}
    </div>
  );
}


