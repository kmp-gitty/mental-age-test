import React from 'react';
import { Link } from 'react-router-dom';
import brainImage from './assets/resized_brains_banner_300x250.png'; // replace with actual image

const posts = [
  {
    title: 'Chronological Age vs. Psychological Age',
    date: '5/25/25',
    description: 'When we think about age, the first thing that comes to mind is usually chronological age — the number of years we’ve lived...',
    image: brainImage,
    link: '/blog/chronological-vs-psychological-age',
  },
  // You can add more posts later
];

export default function Blog() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Latest in News</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <div key={idx} className="bg-white shadow rounded overflow-hidden max-w-[320px] mx-auto">
            <img
  src={post.image}
  alt={post.title}
  className="w-[300px] h-[250px] object-cover mx-auto"
/>
            <div className="p-4">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-500 text-sm mb-2">{post.date}</p>
              <p className="text-gray-700 mb-4">{post.description}</p>
              <Link to={post.link} className="text-blue-600 underline">Read more</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

