import React from "react";
import { Link } from "react-router-dom";
import chargeaiImg from '../assets/images/chargeai.png';
import lrsImg from '../assets/images/lrs.png';
import hiyeImg from '../assets/images/Hiye.webp';
import grameenphoneImg from '../assets/images/grameenphone-logo.png';
import '../assets/styles/Project.scss';

interface ProjectEntry {
    name: string;
    blurb: string;
    href?: string;
    caseStudySlug?: string;
    image?: string;
}

// Ported from src/data/projects.ts on the Astro site. The Ventures-section
// anchor (/#ventures) doesn't exist in this single-page app, so Manobsheba
// links out to its real external URL instead. Telecom and Grameenphone now
// link to their case-study pages (see src/data/caseStudies.tsx).
const projects: ProjectEntry[] = [
    {
        name: "Telecom Event Management Platform",
        blurb: "Sole full-stack engineer on Metal Plus' event-management platform for Grameenphone — Go REST API, PostgreSQL, a Flutter field client, and a Next.js admin, shipped to production on AWS.",
        caseStudySlug: "telecom-event-platform",
        image: grameenphoneImg,
    },
    {
        name: "ChargeAI",
        blurb: "EV-charging companion app for Mulytic Energy — owned the Flutter build end to end, live on iOS and Android.",
        href: "https://play.google.com/store/apps/details?id=com.mulytic_energy.chargeai",
        image: chargeaiImg,
    },
    {
        name: "Manobsheba",
        blurb: "Healthtech venture bringing basic care to rural Bangladesh through Health Care Agent Points. Co-founder and CTO; in private beta.",
        href: "https://manobshebabd.com",
    },
    {
        name: "Grameenphone delivery",
        blurb: "Rescued and stabilised the legacy GP Sync codebase, then took on the in-progress Grameenphone equipment-inventory system.",
        caseStudySlug: "gp-sync",
        image: grameenphoneImg,
    },
    {
        name: "Blockchain-based property registration",
        blurb: "Land-registration prototype on Ethereum smart contracts, from a B.Sc. thesis on privacy in smart contracts. Live interactive demo.",
        href: "https://sifatullah.me/Land-Registration/",
        image: lrsImg,
    },
    {
        name: "Hiye",
        blurb: "Consumer health app built in Flutter, published on the Play Store.",
        href: "https://play.google.com/store/apps/details?id=com.Hiye.hiye",
        image: hiyeImg,
    },
];

function Project() {
    return(
    <div className="projects-container" id="projects">
        <h1>Personal Projects</h1>
        <div className="projects-grid">
            {projects.map((p) => {
                const image = p.image && <img src={p.image} className="zoom" alt="thumbnail" width="100%"/>;
                const title = <h2>{p.name}</h2>;
                return (
                    <div className="project" key={p.name}>
                        {p.caseStudySlug ? (
                            <Link to={`/work/${p.caseStudySlug}`}>{image}{title}</Link>
                        ) : p.href ? (
                            <a href={p.href} target="_blank" rel="noreferrer">{image}{title}</a>
                        ) : (
                            <>{image}{title}</>
                        )}
                        <p>{p.blurb}</p>
                    </div>
                );
            })}
        </div>
    </div>
    );
}

export default Project;
