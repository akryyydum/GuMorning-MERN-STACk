import React from 'react';
import { Typography } from 'antd';
import './About.css';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={styles.container} className="about-container">
      <div style={styles.darkOverlay}></div>
      <div className="about-content about-fadein">
        <div className="LeftAbout">
          <Title level={2} className="about-title">About GuMorning</Title>
          <Paragraph className="about-paragraph">
           A multifaceted cafe and pop-up concept space, dedicated to creating unique experiences that resonate with the Novo Vizcayano community.
          </Paragraph>
          <Paragraph className="about-paragraph">
          Inclusive at its core and encouraging indivual in every visit.
          </Paragraph>
        </div>
        <div className="RightAbout">
          <img
            src="https://scontent.fmnl17-7.fna.fbcdn.net/v/t51.75761-15/487454242_17889879585219780_7244560314377680406_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHlCp0rwier-njMtzU93cZq0BAnBJGbzqvQECcEkZvOq_VIn3_UqrTksl58XPXLj8JSksUWFiKr-F8vEvXqfhnN&_nc_ohc=e0kXOByenFMQ7kNvwEp4kSv&_nc_oc=Adk8C1Pccc0iJL9JvPZntPJlzxsFtxG1vkmG6QdwKQblP9Br3_gOrMBD13Fjzhc4FFY&_nc_zt=23&_nc_ht=scontent.fmnl17-7.fna&_nc_gid=J1BuFdN1kwOd_R5qLLlckg&oh=00_AfLNrysVeQof7mZk-C0btyzAdrNELnSWvRz_H4lq2H2LAA&oe=683CE7F1"
            alt="GuMorning"
            style={{
              maxWidth: 700,
              minWidth: 340,
              width: '120%',
              borderRadius: 18,
              boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
              objectFit: 'cover',
              zIndex: 2,
              position: 'relative'
            }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundImage: 'url("https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/479521569_122199922274248712_924707889322222752_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF3dAvErIvxcaPawQSyulS4LdntaQtbg8ot2e1pC1uDyjCnlpMDpXwn926pC0namsFv0VaEePaF3IsHjnxQ6cGP&_nc_ohc=gYb0pxvsPcEQ7kNvwEVd2Um&_nc_oc=AdlJgr-eESjJoNg5yXA4Www8c34ZKNH0M5cu9adwIFldRbiNt_AU08twZbjCdCwmzZY&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=ApECQFHyvHUy6i7gwcCW0g&oh=00_AfIe2hJbARqn-LHGkpNMQ4XkafrhP4YI6JBVYzUBZjU7AA&oe=683CEF5B")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.82)',
    zIndex: 1,
  },
};

export default About;
