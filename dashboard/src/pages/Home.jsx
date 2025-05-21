import React from 'react';
import { Row, Col, Button, Typography } from 'antd';
import './Home.css'; // Import the CSS file for animations

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
            flexDirection: 'column', // Changed from 'row' to 'column'
          }}
        >
          <Col
            xs={24}
            md={18} // Increased from 14 to give more width for the centered content
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
                className="animated-title" // Add animation class
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
                className="animated-paragraph" // Add animation class
                style={{
                  color: '#fff',
                  fontSize: '1.4rem',
                  marginTop: 16,
                  textAlign: 'center',
                }}
              >
                Your one-stop dashboard for everything you need.
              </Paragraph>
            </div>
          </Col>
        </Row>

        {/* Button positioned at the bottom */}
        <div style={styles.bottomButtonContainer}>
          <Button
            className="animated-button" // Add animation class
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
      'url("https://scontent.fmnl17-5.fna.fbcdn.net/v/t51.75761-15/488933159_17890653864219780_3301368756016846111_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGPCxxzDwDL-zYDBbHYTJXuK6noxaTtbOYrqejFpO1s5go_LxV6DKK0Z6_MDkR-mtyCICEt8Dy_4tvbDpsyBbwS&_nc_ohc=fl8K2jbr5KQQ7kNvwHcfvbt&_nc_oc=Adnm57eWEZe2Z4DSb8paJ_BfcOhN5I4hZW1WmrTL6JOWFnC5tdHMcDnw6A4V8OZSQLw&_nc_zt=23&_nc_ht=scontent.fmnl17-5.fna&_nc_gid=KPxs1sqvqQM1ra38GGHwmA&oh=00_AfLaCRw0Iw721-OBnF_kUZDXW1-36BLP2zHl959g0FY5Kw&oe=68337CAF")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'center',
    fontFamily: "'Poppins', sans-serif", // Force Poppins font
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
    padding: '1rem 1rem', // Reduced top padding from 2rem to 1rem
    width: '100%',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: '5%', // Position from bottom
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
    width: 'auto', // Changed from 100%
    minWidth: 200,
  },
};

export default Home;
