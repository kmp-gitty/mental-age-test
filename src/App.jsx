import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);

  return (
    <div className="font-sans bg-white min-h-screen">
      {/* Top Nav */}
      <div className="flex bg-blue-800 text-white text-lg font-semibold">
        <div className="flex-1 px-6 py-4 border-r border-black text-left cursor-pointer">
          Home
        </div>
        <div className="px-6 py-4 text-right cursor-pointer">
          Blog
        </div>
      </div>

      {/* Ad Space */}
      <div className="flex flex-wrap justify-center items-center gap-4 p-4 bg-gray-50">
        <div className="w-[728px] h-[90px] bg-orange-100 flex items-center justify-center border rounded">
          728x90 Banner Ad Placeholder
        </div>
        <div className="w-[320px] h-[250px] bg-orange-100 flex items-center justify-center border rounded">
          320x250 Ad Placeholder
        </div>
      </div>

      {/* SEO Header + Text */}
      <div className="bg-gray-50 p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">HEAD</h1>
        <p className="text-gray-700">[Placeholder SEO-friendly line 1]</p>
        <p className="text-gray-700">[Placeholder line 2]</p>
        <p className="text-gray-700">[Line 3 - flexible if longer]</p>
      </div>

      {/* Quiz Launcher + Ad */}
      {!quizOpen && (
        <div className="flex justify-center items-center gap-6 bg-gray-50 p-6">
          <button
            onClick={() => setQuizOpen(true)}
            className="w-[300px] h-[600px] bg-orange-400 hover:bg-orange-500 transition text-white font-semibold rounded-lg"
          >
            Start Quiz
          </button>
          <div className="w-[300px] h-[600px] bg-orange-100 flex items-center justify-center border rounded">
            300x600 Ad Placeholder
          </div>
        </div>
      )}

      {/* Quiz Area */}
      {quizOpen && (
        <div className="relative bg-white p-6 border-t border-gray-300">
          <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer" onClick={() => setQuizOpen(false)}>
            ✕
          </div>

          <div className="min-h-[600px] flex flex-col justify-between items-center space-y-6 bg-orange-50 p-6 border rounded-lg">
            <div className="text-center text-xl text-gray-800">[Quiz Content Placeholder]</div>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-orange-300 rounded">Answer A</button>
              <button className="px-6 py-3 bg-orange-300 rounded">Answer B</button>
            </div>
          </div>

          {/* Arrows */}
          <div className="mt-6 flex justify-center gap-6">
            <button className="w-10 h-10 rounded-full bg-cyan-200 text-black flex items-center justify-center opacity-50">
              ←
            </button>
            <button className="w-10 h-10 rounded-full bg-cyan-200 text-black flex items-center justify-center">
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}