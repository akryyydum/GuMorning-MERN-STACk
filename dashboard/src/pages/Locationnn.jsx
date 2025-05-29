import React from 'react';
import { Row, Col, Typography, Space } from 'antd';
import { EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import './Location.css';

const { Title, Paragraph, Text } = Typography;

const NAVBAR_HEIGHT = 80; // Adjust if your navbar height is different

const Location = () => {
  return (
    <div
      style={{
        ...styles.container,
        paddingTop: NAVBAR_HEIGHT,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
      className="location-container location-mobile-scroll"
    >
      <div style={styles.darkOverlay}></div>
      <div className="location-title-wrapper">
        <h2 className="location-title">Where to Find Us</h2>
      </div>
      <Row
        gutter={[8, 16]}
        style={{
          ...styles.contentRow,
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
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
    left: 0,
    width: '100vw',
    // height and paddingTop are set dynamically above
    padding: 0,
    overflow: 'hidden',
    backgroundImage:
      'url("https://scontent.fmnl17-8.fna.fbcdn.net/v/t51.75761-15/487954215_17889879882219780_7558332685967466800_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFWv5Ue2t1mbs27GHYLyZHV4nGBuwxhK1ricYG7DGErWurqUoLGdbqgsLHUiDb9gJctPiTPCrwrTNojHgAba3wc&_nc_ohc=hHv-jVRwz3oQ7kNvwGFlsym&_nc_oc=Adlgs0Rlc-hCCVsZzVz1dLamPZwd_NgUqSfykT9NrVLeEwLBuWeFWcpfItmyl7VOZbs&_nc_zt=23&_nc_ht=scontent.fmnl17-8.fna&_nc_gid=EBXCbrcQAzJ8z8ZVNitV0A&oh=00_AfLlKHht_yHMKreZjvDUiQN0KfV_9zQLWaDu8qyyvr0jlQ&oe=68339377")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  darkOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,0,0,0.88)',
    zIndex: 1,
  },
  contentRow: {
    margin: 0,
    // height is set dynamically above
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    padding: '0 10px',
  },
  mapCol: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 300,
  },
  mapContainer: {
    width: '100%',
    height: '450px',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
  map: {
    border: 0,
    minHeight: 300,
  },
  infoCol: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    minHeight: 300,
  },
  infoContainer: {
    width: '100%',
    color: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxSizing: 'border-box',
    marginTop: 0,
  },
  icon: {
    color: '#d89500',
    marginRight: '8px',
  }
};

export default Location;

/* Add this to the bottom of the file or to Location.css if preferred */
import './Location.css'; // already imported, so add CSS below to Location.css:

/*
In Location.css, add:

@keyframes locationFadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.location-fadein {
  animation: locationFadeInUp 0.9s cubic-bezier(0.23, 1, 0.32, 1) both;
}
*/
