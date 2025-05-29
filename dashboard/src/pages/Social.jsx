import React from 'react';
import { Typography } from 'antd';
import { FacebookFilled, InstagramFilled, MailOutlined } from '@ant-design/icons';
import './About.css';

const { Title, Paragraph, Text, Link } = Typography;

const NAVBAR_HEIGHT = 90; // px

const Social = () => {
  return (
    <div style={{ ...styles.container, paddingTop: NAVBAR_HEIGHT }} className="about-container location-responsive-container">
      <div style={styles.darkOverlay}></div>
      <div className="about-content about-fadein location-about-content">
        <div className="LeftAbout location-leftabout">
          {/* You can use an image or illustration for socials */}
          <img
            src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
            alt="Social Media"
            style={styles.socialImg}
          />
        </div>
        <div className="RightAbout location-rightabout">
          <Title
            level={3}
            style={{ color: '#fff', fontSize: '2rem', marginBottom: '12px' }}
          >
            <FacebookFilled style={{ ...styles.icon, fontSize: '2rem' }} /> Facebook
          </Title>
          <Paragraph style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '24px' }}>
            <a
              href="https://www.facebook.com/gumorningnv"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#d89500', fontWeight: 500 }}
            >
              facebook.com/gumorningnv
            </a>
          </Paragraph>
          <Title
            level={3}
            style={{ color: '#fff', fontSize: '2rem', marginBottom: '12px' }}
          >
            <InstagramFilled style={{ ...styles.icon, fontSize: '2rem' }} /> Instagram
          </Title>
          <Paragraph style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '24px' }}>
            <a
              href="https://www.instagram.com/gumorningnv"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#d89500', fontWeight: 500 }}
            >
              @gumorningnv
            </a>
          </Paragraph>
          <Title
            level={3}
            style={{ color: '#fff', fontSize: '2rem', marginBottom: '12px' }}
          >
            <MailOutlined style={{ ...styles.icon, fontSize: '2rem' }} /> Email
          </Title>
          <Paragraph style={{ color: '#fff', fontSize: '1.25rem' }}>
            <a
              href="mailto:gumorningnv@gmail.com"
              style={{ color: '#d89500', fontWeight: 500 }}
            >
              gumorningnv@gmail.com
            </a>
          </Paragraph>
        </div>
      </div>
      {/* Responsive styles for Socials page */}
      <style>
        {`
        .location-responsive-container {
          min-height: 100vh;
          box-sizing: border-box;
        }
        .location-about-content {
          display: flex;
          flex-direction: row;
          gap: 40px;
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px;
        }
        .location-leftabout {
          flex: 1.2;
          min-width: 320px;
          min-height: 350px;
          max-width: 600px;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .location-rightabout {
          flex: 1;
          min-width: 240px;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        @media (max-width: 900px) {
          .location-about-content {
            flex-direction: column;
            gap: 24px;
            padding: 24px 8px;
          }
          .location-leftabout,
          .location-rightabout {
            max-width: 100%;
            width: 100%;
          }
          .location-leftabout {
            height: 250px;
            min-height: 180px;
          }
        }
        @media (max-width: 600px) {
          .location-about-content {
            padding: 12px 2vw;
          }
          .location-leftabout {
            height: 180px;
            min-height: 120px;
          }
          .location-rightabout {
            padding-top: 12px;
          }
        }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100vw',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    backgroundImage: 'url("https://scontent.fmnl17-5.fna.fbcdn.net/v/t39.30808-6/479521569_122199922274248712_924707889322222752_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF3dAvErIvxcaPawQSyulS4LdntaQtbg8ot2e1pC1uDyjCnlpMDpXwn926pC0namsFv0VaEePaF3IsHjnxQ6cGP&_nc_ohc=gYb0pxvsPcEQ7kNvwEVd2Um&_nc_oc=AdlJgr-eESjJoNg5yXA4Www8c34ZKNH0M5cu9adwIFldRbiNt_AU08twZbjCdCwmzZY&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=ApECQFHyvHUy6i7gwcCW0g&oh=00_AfIe2hJbARqn-LHGkpNMQ4XkafrhP4YI6JBVYzUBZjU7AA&oe=683CEF5B")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  socialImg: {
    width: '60%',
    maxWidth: 220,
    minWidth: 120,
    borderRadius: 24,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
    background: '#222',
    objectFit: 'contain',
    margin: 'auto'
  },
  icon: {
    color: '#d89500',
    marginRight: '8px',
  }
};

export default Social;
