import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Main from "./Main";
import Timeline from "./Timeline";
import Expertise from "./Expertise";
import Project from "./Project";
import Contact from "./Contact";
import FadeIn from "./FadeIn";

function Home() {
    const location = useLocation();

    useEffect(() => {
        document.title = "Md Sifatullah";
        const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
        if (scrollTo) {
            document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
        }
    }, [location]);

    return (
        <FadeIn transitionDuration={700}>
            <Main/>
            <Expertise/>
            <Timeline/>
            <Project/>
            <Contact/>
        </FadeIn>
    );
}

export default Home;
