import React from 'react';
import { Typography, Row, Col, Space } from 'antd'; // <-- Add Row, Col, Space import
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './About.css';

const { Title, Paragraph, Text } = Typography;

const Location = () => {
  return (
   <div
      style={{
        ...styles.container,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
      className="location-container location-mobile-scroll"
    >
      
      <div className="location-title-wrapper">
        <h2 className="location-title">Where to Find Us</h2>
      </div>
      <Row
        gutter={[8, 16]}
        style={{
          ...styles.contentRow,
          height: 'auto',
        }}
        className="location-content-row location-fadein"
      >
        <Col
          xs={24}
          md={11}
          className="location-map-col"
          style={{
            ...styles.mapCol,
            width: '100%',
            minWidth: 0,
            flex: 1,
            maxWidth: '600px',
          }}
        >
          <div
            style={{
              ...styles.mapContainer,
              height: '450px',
              minHeight: '180px',
              width: '100%',
            }}
            className="map-container"
          >
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
        </Col>
        <Col
          xs={24}
          md={11}
          className="location-info-col"
          style={{
            ...styles.infoCol,
            width: '100%',
            minWidth: 0,
            flex: 1,
            maxWidth: '600px',
          }}
        >
          <Space
            direction="vertical"
            size="large"
            style={{
              ...styles.infoContainer,
              minWidth: 0,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div>
             <Title
                 level={3}
                 style={{ color: '#fff', fontSize: '2rem', marginBottom: '12px' }}
             >
                 <EnvironmentOutlined style={{ ...styles.icon, fontSize: '2rem' }} /> Address
             </Title>
             <Paragraph style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '24px' }}>
                 13 Basa Street<br />
                 Bayombong, Nueva Vizcaya<br />
                 Philippines
             </Paragraph>
             <Title
                 level={3}
                 style={{ color: '#fff', fontSize: '2rem', marginBottom: '12px' }}
             >
                 <ClockCircleOutlined style={{ ...styles.icon, fontSize: '2rem' }} /> Hours
             </Title>
             <Paragraph style={{ color: '#fff', fontSize: '1.25rem' }}>
                 <Text strong style={{ color: '#fff', fontSize: '1.1rem' }}>Monday - Saturday:</Text> 10:00 AM - 9:00 PM<br />
                 <Text strong style={{ color: '#fff', fontSize: '1.1rem' }}>Sunday:</Text> 12:00 PM - 9:00 PM
             </Paragraph>
             </div>
          </Space>
        </Col>
      </Row>
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

export default Location;
