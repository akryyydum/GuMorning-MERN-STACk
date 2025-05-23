import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Skeleton, Button, Input } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons';
import './Menu.css'; // Import the CSS file for animations

const { Title, Paragraph } = Typography;
const { Search } = Input;
const NAVBAR_HEIGHT = 20;
const API_URL = 'http://localhost:5000/api';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/menu`)
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      });
  }, []);

  // Filtered menu based on search
  const filteredMenu = menu.filter(
    item =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        ...styles.container,
        paddingTop: NAVBAR_HEIGHT,
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        position: 'relative',
      }}
      className="menu-container"
    >
      <div style={styles.darkOverlay}></div>
      <div className="menu-title-wrapper">
        <Title
          level={2}
          style={{
            color: '#fff',
            textAlign: 'center',
            marginBottom: 32,
            position: 'relative',
            zIndex: 2,
            fontWeight: 700,
            letterSpacing: 1,
          }}
          className="menu-title"
        >
          <CoffeeOutlined style={{ color: '#d89500', marginRight: 12 }} />
          Our Menu
        </Title>
      </div>
      <div style={{ marginBottom: 24, zIndex: 2, position: 'relative', textAlign: 'center' }}>
        <Search
          placeholder="Search menu..."
          allowClear
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            maxWidth: 320,
            background: 'rgba(0,0,0,0.7)',
            borderRadius: 8,
            border: '1.5px solid #d89500',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}
          className="menu-search-bar"
          inputStyle={{
            background: 'rgba(0,0,0,0.7)',
            color: '#fff',
            border: 'none',
          }}
        />
      </div>
      <Row
        gutter={[32, 32]}
        justify="center"
        style={{
          ...styles.contentRow,
          minHeight: '60vh',
          position: 'relative',
          zIndex: 2,
        }}
        className="menu-fadein"
      >
        {loading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <Col xs={24} sm={12} md={8} lg={6} key={idx}>
                <Card
                  loading
                  className="bakery-card"
                  style={styles.bakeryCard}
                  cover={<Skeleton.Image style={{ width: '100%', height: 160, borderRadius: '18px 18px 0 0' }} />}
                />
              </Col>
            ))
          : filteredMenu.map((item) => (
              <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
                <Card
                  hoverable
                  className="bakery-card"
                  style={styles.bakeryCard}
                  cover={
                    <img
                      src={item.photo}
                      alt={item.name}
                      style={styles.bakeryCardImg}
                      onError={e => { e.target.onerror = null; e.target.src = '/fallback-image.png'; }}
                    />
                  }
                  bodyStyle={{
                    padding: 18,
                    background: 'transparent',
                    color: '#fff',
                    borderRadius: '0 0 18px 18px',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <Typography.Text strong style={{ color: '#fff', fontSize: 18 }}>
                      ₱{item.price}
                    </Typography.Text>
                    <Typography.Text style={{ color: '#b0a074', fontSize: 15 }}>
                      {item.weight ? `${item.weight}g` : ''}
                    </Typography.Text>
                  </div>
                  <Typography.Title level={5} style={{ color: '#fff', marginBottom: 6, fontWeight: 600, fontSize: 18, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </Typography.Title>
                  <Typography.Paragraph style={{ color: '#b0a074', fontSize: 14, minHeight: 40, marginBottom: 0 }}>
                    {item.description}
                  </Typography.Paragraph>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <Button
                      type="primary"
                      style={{
                        background: '#d89500',
                        border: 'none',
                        borderRadius: 6,
                        fontWeight: 600,
                        fontSize: 15,
                        padding: '2px 22px',
                        boxShadow: '0 2px 8px rgba(216,149,0,0.10)'
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
        {!loading && filteredMenu.length === 0 && (
          <Col span={24}>
            <div style={{ color: '#fff', textAlign: 'center', marginTop: 40, fontSize: 18 }}>
              No menu items found.
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

const styles = {
  container: {
    left: 0,
    width: '100%',
    minHeight: '100vh',
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
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 2,
    padding: '0 10px 40px 10px',
  },
  bakeryCard: {
    borderRadius: 18,
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #23211f 80%, #2d261b 100%)',
    border: 'none',
    boxShadow: '0 4px 24px 0 rgba(0,0,0,0.22)',
    minHeight: 320,
    transition: 'box-shadow 0.2s, transform 0.2s',
  },
  bakeryCardImg: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    background: '#222',
  },
};

export default Menu;
