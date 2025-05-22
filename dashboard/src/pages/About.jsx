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
        </div>
        <div className="RightAbout">
          <Paragraph className="about-paragraph">
            GuMorning is your all-in-one dashboard for productivity, information, and more.
            Our mission is to help you start your day right with everything you need in one place.
          </Paragraph>
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
    backgroundImage: 'url("https://scontent.fbag2-1.fna.fbcdn.net/v/t51.75761-15/483533952_17886753375219780_127958373605531872_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEUDI-kbywdz7r2IinIyC2Zx3JMoxwF5L7HckyjHAXkvjEKB5hrQwyv0IKB3GHQ72jB0Y4NXdlpaJqs32QEyMHe&_nc_ohc=vbznPYmeYccQ7kNvwGpM2Pj&_nc_oc=AdmmmUppvAQe9Wo55WoDyjO8DfGJdUYY2-2dTHSLHsL8B193ZbtnQSCoMWpQn1AkGuE&_nc_zt=23&_nc_ht=scontent.fbag2-1.fna&_nc_gid=KJIEj9s19m9tSl-99H_jEw&oh=00_AfIfd9nO5HZYYZl0ii-EsvPY0uSjw5kmijkjRwQJrqm7HQ&oe=68343468")',
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
