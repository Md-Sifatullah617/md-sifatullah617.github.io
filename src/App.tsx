import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import {
  Home,
  CaseStudy,
  Blog,
  BlogPost,
  Navigation,
  Footer,
} from "./components";
import './index.scss';

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
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/work/:slug" element={<CaseStudy/>} />
                <Route path="/blog" element={<Blog/>} />
                <Route path="/blog/:slug" element={<BlogPost/>} />
            </Routes>
            <Footer />
        </div>
    </BrowserRouter>
    );
}

export default App;
