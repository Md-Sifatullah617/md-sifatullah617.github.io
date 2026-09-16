import React from "react";
import chargeaiImg from '../assets/images/chargeai.png';
import lrsImg from '../assets/images/lrs.png';
import hiyeImg from '../assets/images/Hiye.webp';
import '../assets/styles/Project.scss';

interface ProjectEntry {
    name: string;
    blurb: string;
    href?: string;
    image?: string;
}

// Ported from src/data/projects.ts on the Astro site. The case-study route
// (/work/telecom-event-platform) and the Ventures-section anchor (/#ventures)
// don't exist in this single-page app, so those two link out to a real
// external URL (Manobsheba) or render unlinked (Telecom, Grameenphone) instead.
const projects: ProjectEntry[] = [
    {
        name: "Telecom Event Management Platform",
        blurb: "Sole full-stack engineer on Metal Plus' event-management platform for Grameenphone — Go REST API, PostgreSQL, a Flutter field client, and a Next.js admin, shipped to production on AWS.",
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
            {projects.map((p) => (
                <div className="project" key={p.name}>
                    {p.image && (
                        p.href ? (
                            <a href={p.href} target="_blank" rel="noreferrer"><img src={p.image} className="zoom" alt="thumbnail" width="100%"/></a>
                        ) : (
                            <img src={p.image} className="zoom" alt="thumbnail" width="100%"/>
                        )
                    )}
                    {p.href ? (
                        <a href={p.href} target="_blank" rel="noreferrer"><h2>{p.name}</h2></a>
                    ) : (
                        <h2>{p.name}</h2>
                    )}
                    <p>{p.blurb}</p>
                </div>
            ))}
        </div>
    </div>
    );
}

export default Project;
