import React from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Button from '@mui/material/Button';
import avatar from '../assets/images/sifat-portrait.webp';
import '../assets/styles/Main.scss';

function Main() {

  return (
    <div className="container">
      <div className="about-section">
        <div className="image-wrapper">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="content">
          <div className="social_icons">
            <a href="https://github.com/Md-Sifatullah617" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/md-sifatullah617" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
          <h1>Md Sifatullah</h1>
          <p>Software Engineer</p>
          <div className="cv-actions">
            <Button component="a" href="/cv/" target="_blank" rel="noreferrer" variant="contained">View CV</Button>
            <Button component="a" href="/cv/?print=1" target="_blank" rel="noreferrer" variant="outlined" title="Opens the print dialog; choose Save as PDF">Download PDF</Button>
          </div>

          <div className="mobile_social_icons">
            <a href="https://github.com/Md-Sifatullah617" target="_blank" rel="noreferrer"><GitHubIcon/></a>
            <a href="https://www.linkedin.com/in/md-sifatullah617" target="_blank" rel="noreferrer"><LinkedInIcon/></a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
