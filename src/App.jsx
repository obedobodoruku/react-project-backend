import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router";
import { Link } from 'react-router';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import NewBlog from './pages/NewBlog';




const Navbar = () => {
    return (
        <div className='top-0 sticky border-[2px] border-blue-500 backdrop-blur-3xl py-[7px] text-white mt-7 rounded-[10px]'>
          <nav className="flex items-center px-3 justify-between">
              <div className='text-2xl font-bold '>APP</div>
              <ul className='flex gap-4'>
                  <li className='hover:underline'><Link to="/">Home</Link></li>
                  <li  className='hover:underline'><Link to="/about">About</Link></li>
                  <li  className='hover:underline'><Link to="/contact">Contact</Link></li>
                  <li  className='hover:underline'><Link to="/blog">Blog</Link></li>
              </ul>
          </nav>
            
        </div>
    );
};

const Footer = () => {
    return (
      <div className='flex flex-col items-center justify-center'>
        <hr className="border-white w-full my-5" />
        <footer>
          <span className="text-white text-center text-[0.8rem]">By Obed Obodoruku © 2025</span>
        </footer>
      </div>
    )
}

const App = () => {

      const [data, setData] = useState([]);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);

  return (
    <div>
      
      <BrowserRouter>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="blog" element={<Blog 
           data={data}
           setData={setData} 
           error={error}
           setError={setError}
           loading={loading}
           setLoading={setLoading}
           />} />
           <Route path="new-blog" element={<NewBlog 
           error={error}
           setError={setError}
           loading={loading}
           setLoading={setLoading}
           />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;