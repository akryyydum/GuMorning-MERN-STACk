import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center' }}>
          <Card style={{ maxWidth: '100%', width: '100%' }}>
            <Title level={2} style={{ textAlign: 'center' }}>About GuMorning</Title>
            <Paragraph style={{ textAlign: 'center' }}>
              GuMorning is your all-in-one dashboard for productivity, information, and more.
              Our mission is to help you start your day right with everything you need in one place.
            </Paragraph>
          </Card>
        </div>
        <div>
          <Title level={3} style={{ textAlign: 'center' }}>Features</Title>
          <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
            <li>Weather Updates</li>
            <li>News Headlines</li>
            <li>Task Management</li>
            <li>Calendar Integration</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '16px',
    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
    maxWidth: '800px',
    width: '90%',
  },
};

export default About;
