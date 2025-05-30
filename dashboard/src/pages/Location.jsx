import React from 'react';
import { Typography } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './About.css';

const { Title, Paragraph, Text } = Typography;

const NAVBAR_HEIGHT = 90;

const Location = () => {
  return (
    <div
      style={{
        ...styles.container,
        paddingTop: NAVBAR_HEIGHT,
        minHeight: '100vh',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      className="about-container location-responsive-container"
    >
      <div style={styles.darkOverlay}></div>
      <div className="location-main-content">
        <div className="location-map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d761.5885504015126!2d121.14809771571304!3d16.48215230188949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3390450073b65141%3A0x5469a9d0560b39c4!2sGumorning%20NV!5e0!3m2!1sen!2sph!4v1747832832339!5m2!1sen!2sph"
            width="100%"
            height="100%"
            style={styles.map}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="GuMorning Location"
          ></iframe>
        </div>
        <div className="location-info-section">
          <div className="location-info-card" style={{ background: 'transparent', boxShadow: 'none', border: 'none', backdropFilter: 'none' }}>
            <Title
              level={3}
              style={{
                color: '#fff',
                fontSize: '2.1rem',
                marginBottom: '18px',
                textAlign: 'left',
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <EnvironmentOutlined style={styles.icon} /> Address
            </Title>
            <Paragraph style={{ color: '#fff', fontSize: '1.18rem', marginBottom: '28px', lineHeight: 1.7 }}>
              13 Basa Street<br />
              Bayombong, Nueva Vizcaya<br />
              Philippines
            </Paragraph>
            <Title
              level={3}
              style={{
                color: '#fff',
                fontSize: '2.1rem',
                marginBottom: '18px',
                textAlign: 'left',
                letterSpacing: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <ClockCircleOutlined style={styles.icon} /> Hours
            </Title>
            <Paragraph style={{ color: '#fff', fontSize: '1.18rem', lineHeight: 1.7 }}>
              <Text strong style={{ color: '#fff', fontSize: '1.1rem' }}>Monday - Saturday:</Text> 10:00 AM - 9:00 PM<br />
              <Text strong style={{ color: '#fff', fontSize: '1.1rem' }}>Sunday:</Text> 12:00 PM - 9:00 PM
            </Paragraph>
          </div>
        </div>
      </div>
      <style>
        {`
        .location-main-content {
          display: flex;
          flex-direction: row;
          gap: 48px;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 48px 32px;
          position: relative;
          z-index: 2;
          align-items: stretch;
        }
        .location-map-section {
          flex: 1.3;
          min-width: 220px;
          width: 100%;
          max-width: 650px;
          height: 420px;
          display: flex;
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.22);
          background: #181818;
          align-items: stretch;
        }
        .location-info-section {
          flex: 1;
          min-width: 260px;
          max-width: 420px;
          display: flex;
          align-items: stretch;
          justify-content: center;
        }
        .location-info-card {
          width: 100%;
          background: rgba(30, 30, 30, 0.85);
          border-radius: 22px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.22);
          padding: 38px 32px 32px 32px;
          backdrop-filter: blur(4px);
          border: 1.5px solid rgba(216,149,0,0.13);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          height: 100%;
        }
        @media (max-width: 1100px) {
          .location-main-content {
            gap: 24px;
            padding: 32px 8px;
          }
          .location-map-section {
            max-width: 100vw;
            height: 320px;
            min-width: 160px;
          }
          .location-info-card {
            padding: 28px 16px 20px 16px;
          }
        }
        @media (max-width: 900px) {
          .location-main-content {
            flex-direction: column;
            gap: 32px;
            padding: 24px 4vw;
            align-items: stretch;
          }
          .location-map-section,
          .location-info-section {
            max-width: 100%;
            width: 100%;
          }
          .location-map-section {
            height: 220px;
            min-height: 140px;
            border-radius: 16px;
          }
        }
        @media (max-width: 600px) {
          .location-main-content {
            padding: 12px 2vw;
            gap: 18px;
          }
          .location-map-section {
            height: 140px;
            min-height: 80px;
            border-radius: 10px;
          }
          .location-info-card {
            border-radius: 10px;
            padding: 14px 6px 10px 6px;
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
  map: {
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    width: '100%',
    height: '100%',
    minHeight: 100,
    background: '#222',
  },
  icon: {
    color: '#d89500',
    marginRight: '8px',
  }
};

export default Location;
