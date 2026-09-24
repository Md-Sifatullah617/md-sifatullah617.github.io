import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { caseStudies } from "../data/caseStudies";
import "../assets/styles/Article.scss";

function CaseStudy() {
    const { slug } = useParams();
    const caseStudy = caseStudies.find((c) => c.slug === slug);

    useEffect(() => {
        document.title = caseStudy
            ? `${caseStudy.name} — Md Sifatullah`
            : "Case study not found — Md Sifatullah";
    }, [caseStudy]);

    if (!caseStudy) {
        return (
            <div className="container">
                <div className="items-container article">
                    <Link to="/" state={{ scrollTo: "projects" }} className="back-link">&larr; Back to projects</Link>
                    <h1>Case study not found</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="items-container article">
                <Link to="/" state={{ scrollTo: "projects" }} className="back-link">&larr; Back to projects</Link>
                <h1>{caseStudy.name}</h1>
                {caseStudy.content}
            </div>
        </div>
    );
}

export default CaseStudy;
