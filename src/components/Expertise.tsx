import React from "react";
import '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReact, faGolang, faDocker } from '@fortawesome/free-brands-svg-icons';
import Chip from '@mui/material/Chip';
import '../assets/styles/Expertise.scss';

const labelsFirst = [
    "Flutter",
    "BLoC",
    "Clean Architecture",
    "Next.js",
    "React",
    "TypeScript",
];

const labelsSecond = [
    "Go",
    "REST",
    "PostgreSQL",
    "JWT/RBAC",
    "sqlx",
    "migrations",
];

const labelsThird = [
    "AWS",
    "Docker",
    "Nginx",
    "CI/CD",
    "code review",
    "Scrum",
];

function Expertise() {
    return (
    <div className="container" id="expertise">
        <div className="skills-container">
            <h1>Expertise</h1>
            <div className="skills-grid">
                <div className="skill">
                    <FontAwesomeIcon icon={faReact} size="3x"/>
                    <h3>Mobile & Full-Stack</h3>
                    <p>I build production mobile apps in Flutter and full-stack web apps in Next.js and React, owning the full lifecycle from architecture to deployment.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsFirst.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faGolang} size="3x"/>
                    <h3>Backend & APIs</h3>
                    <p>I design and ship Go REST APIs backed by PostgreSQL, with JWT/RBAC auth and versioned migrations — the same layered architecture across every project.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsSecond.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>

                <div className="skill">
                    <FontAwesomeIcon icon={faDocker} size="3x"/>
                    <h3>Infra & Practice</h3>
                    <p>I containerise and deploy to AWS with Docker and Nginx behind CI/CD, and I'm comfortable inheriting and stabilising legacy codebases before adding to them.</p>
                    <div className="flex-chips">
                        <span className="chip-title">Tech stack:</span>
                        {labelsThird.map((label, index) => (
                            <Chip key={index} className='chip' label={label} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Expertise;
