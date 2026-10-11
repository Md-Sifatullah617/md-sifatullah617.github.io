import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import './index.scss';

const CaseStudy = lazy(() => import("./components/CaseStudy"));
const Blog = lazy(() => import("./components/Blog"));
const BlogPost = lazy(() => import("./components/BlogPost"));

function ScrollManager() {
    const location = useLocation();

    useEffect(() => {
        if (!(location.state as { scrollTo?: string } | null)?.scrollTo) {
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
    }, [location]);

    return null;
}

function App() {
    const [mode, setMode] = useState<string>('dark');

    const handleModeChange = () => {
        if (mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    }

    return (
    <BrowserRouter>
        <div className={`main-container ${mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
            <ScrollManager/>
            <Navigation parentToChild={{mode}} modeChange={handleModeChange}/>
            <Suspense fallback={<div style={{ minHeight: "80vh" }} />}>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/work/:slug" element={<CaseStudy/>} />
                    <Route path="/blog" element={<Blog/>} />
                    <Route path="/blog/:slug" element={<BlogPost/>} />
                </Routes>
            </Suspense>
            <Footer />
        </div>
    </BrowserRouter>
    );
}

export default App;
