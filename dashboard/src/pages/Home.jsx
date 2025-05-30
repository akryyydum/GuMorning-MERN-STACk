import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import './Home.css'; 

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <Row
          gutter={[0, 16]}
          align="middle"
          justify="center"
          style={{
            width: '100vw',
            height: '100vh',
            margin: 0,
            flexDirection: 'column', 
          }}
        >
          <Col
            xs={24}
            md={18} 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              marginBottom: 0,
            }}
          >
            <div style={styles.left}>
              <Title
                className="animated-title" 
                style={{
                  color: '#fff',
                  marginBottom: 0,
                  fontSize: '2.5rem',
                  textAlign: 'center',
                }}
                level={2}
              >
                Welcome to GuMorning
              </Title>
              <Paragraph
                className="animated-paragraph" 
                style={{
                  color: '#fff',
                  fontSize: '1.4rem',
                  marginTop: 16,
                  textAlign: 'center',
                }}
              >
                Nurturing an Inclusive Comminity. Championing Individuality. Deeply Rooted in Supporting Local.
              </Paragraph>
            </div>
          </Col>
        </Row>

        <div style={styles.bottomButtonContainer}>
          <Button
            className="animated-button" 
            type="primary"
            size="large"
            style={styles.button}
            href="/menu"
          >
            Order Now
          </Button>
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
    minWidth: '100vw',
    minHeight: '100vh',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    backgroundImage:
      'url("https://scontent.fmnl17-3.fna.fbcdn.net/v/t51.75761-15/481449866_17885220096219780_7333015284803729390_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEtl13ljfCu75w51vaSWu6zOAwF_wxrfgs4DAX_DGt-C1MvBgan3_KlhpH7fSg0mcLFzckrh6u26NaZGfd2Gton&_nc_ohc=TpamLTTZzIkQ7kNvwFHG9nm&_nc_oc=AdlxHTlUxEL8NXmZ-CwttLv3_zHRv2MB92eWva3fHVAcQalPDOiyhS_LNoKDaMJl-H0&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=PNMlBiI5R9LZd6eI2CzC9g&oh=00_AfJImLX-qtApeoJV-yCYishrbKYpcKxwPTva2fVVc-fCCw&oe=683CC1B6")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif",
  },
  overlay: {
    width: '100vw',
    height: '100vh',
    background: 'rgba(0,0,0,0.55)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    padding: '1rem 1rem', 
    width: '100%',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: '5%',
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    background: '#d89500',
    borderColor: '#d89500',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '1.3rem',
    padding: '1.5rem 2.5rem',
    marginTop: '0.5rem',
    width: 'auto', 
    minWidth: 200,
  },
};

export default Home;
