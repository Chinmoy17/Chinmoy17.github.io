import React, { useState, useEffect } from "react";
import Preloader from "../src/components/Pre";
import Navbar from "./components/Navbar";
import Home from "./components/Home/Home";
import Experience from "./components/Experience/Experience";
import Education from "./components/Education/Education";
import Skills from "./components/Skills/Skills";
import Research from "./components/Research/Research";
import ResearchDetail from "./components/Research/ResearchDetail";
import Projects from "./components/Projects/Projects";
import ProjectDetail from "./components/Projects/ProjectDetail";
import Footer from "./components/Footer";
import Resume from "./components/Resume/ResumeNew";
// Travel blog temporarily disabled
// import TravelBlog from "./components/TravelBlog/TravelBlog";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import TravelBlogDetail from "./components/TravelBlog/TravelBlogDetail";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";

{/* <Route path="/travel-blog" element={<TravelBlog />} /> */}
function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/education" element={<Education />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:slug" element={<ResearchDetail />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/resume" element={<Resume />} />
          { /* Travel Blog routes disabled for now */ }
          { /* <Route path="/travelblog" element={<TravelBlog />} /> */ }
          <Route path="*" element={<Navigate to="/"/>} />
          { /* <Route path="/blog/:id" element={<TravelBlogDetail />} /> */ }
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
