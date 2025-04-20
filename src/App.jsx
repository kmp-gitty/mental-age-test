import React from "react";
import { Card, CardContent } from "./components/ui/card.jsx";
import { Button } from "./components/ui/button.jsx";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow z-10 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">YourSite</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero/About Section */}
      <section className="p-6 text-center max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-2">Welcome to Your DIY, Gym & Island Living Hub</h2>
        <p className="text-base text-gray-600">Discover home improvement tips, build your perfect garage gym, and experience the taste of Hawaii — all in one place.</p>
      </section>

      {/* Category Links */}
      <div className="flex justify-center gap-4 p-4 flex-wrap">
        <Button>Home Projects</Button>
        <Button>Garage Gym</Button>
        <Button>Hawaiian Cuisine</Button>
      </div>

      {/* Blog Teasers */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="h-40 bg-gray-200 mb-2"></div>
              <h3 className="text-lg font-semibold">Blog Post Title {i + 1}</h3>
              <p className="text-sm text-gray-600">Short preview of the blog post content goes here to entice readers to click through.</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Email Signup Bar */}
      <section className="bg-gray-100 py-6 px-4 text-center">
        <h4 className="text-lg font-semibold mb-2">Stay in the loop</h4>
        <input type="email" placeholder="Your email" className="border p-2 rounded mr-2" />
        <Button>Subscribe</Button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <nav className="space-x-4">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Contact</a>
          </nav>
          <div className="text-gray-400">© 2025 YourSite. All rights reserved.</div>
        </div>
        <div className="mt-4 text-center">
          <input type="email" placeholder="Email for updates" className="border p-2 rounded mr-2" />
          <Button>Sign Up</Button>
        </div>
      </footer>
    </div>
  );
}
