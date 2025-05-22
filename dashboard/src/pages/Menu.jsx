import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Skeleton, Button, Input } from 'antd';
import { CoffeeOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Menu.css'; // Import the CSS file for animations

const { Title, Paragraph } = Typography;
const { Search } = Input;
const NAVBAR_HEIGHT = 20;
const API_URL = 'http://localhost:5000/api';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [slideDirection, setSlideDirection] = useState('right'); // 'left' or 'right'
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/menu`)
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      });
  }, []);

  const handleSelect = (idx) => {
    setSlideDirection(idx > selectedIdx ? 'right' : 'left');
    setSelectedIdx(idx);
  };

  const handlePrev = () => {
    if (selectedIdx > 0) {
      setSlideDirection('left');
      setSelectedIdx(selectedIdx - 1);
    }
  };

  const handleNext = () => {
    if (selectedIdx < menu.length - 1) {
      setSlideDirection('right');
      setSelectedIdx(selectedIdx + 1);
    }
  };

  // Filtered menu based on search
  const filteredMenu = menu.filter(
    item =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
  );

  // Adjust selectedIdx if filteredMenu changes
  useEffect(() => {
    if (filteredMenu.length === 0) {
      setSelectedIdx(0);
    } else if (selectedIdx >= filteredMenu.length) {
      setSelectedIdx(0);
    }
  }, [search, menu]); // eslint-disable-line

  const selected = filteredMenu[selectedIdx];

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
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{
          ...styles.contentRow,
          minHeight: '60vh',
          position: 'relative',
          zIndex: 2,
        }}
        className="menu-fadein"
      >
        {/* Left: Selected Product */}
        <Col xs={24} md={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            className={`menu-selected-slide menu-slide-${slideDirection}`}
            key={selected?._id || 'skeleton'}
            style={{ width: '100%', maxWidth: 400, minHeight: 340 }}
          >
            {loading || !selected ? (
              <Card loading style={styles.card} cover={<Skeleton.Image style={{ width: '100%', height: 180 }} />} />
            ) : (
              <Card
                hoverable
                className="menu-card"
                style={styles.card}
                cover={
                  <img
                    src={selected.photo}
                    alt={selected.name}
                    style={styles.cardImg}
                  />
                }
                bodyStyle={{ background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: '0 0 16px 16px' }}
              >
                <Title level={4} style={{ color: '#fff', marginBottom: 8 }}>
                  {selected.name}
                </Title>
                <Paragraph style={{ color: '#fff', minHeight: 48 }}>
                  {selected.description}
                </Paragraph>
                <div style={{ fontWeight: 'bold', color: '#d89500', fontSize: 18 }}>
                  ₱{selected.price}
                </div>
                <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    icon={<LeftOutlined />}
                    onClick={handlePrev}
                    disabled={selectedIdx === 0}
                  />
                  <Button
                    icon={<RightOutlined />}
                    onClick={handleNext}
                    disabled={selectedIdx === filteredMenu.length - 1}
                  />
                </div>
              </Card>
            )}
          </div>
        </Col>
        {/* Right: Product List */}
        <Col xs={24} md={14}>
          <div style={{ marginBottom: 16 }}>
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
          <Row gutter={[16, 16]} justify="start">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <Col xs={24} sm={12} md={8} key={idx}>
                    <Card
                      loading
                      style={styles.card}
                      cover={<Skeleton.Image style={{ width: '100%', height: 120 }} />}
                    />
                  </Col>
                ))
              : filteredMenu.map((item, idx) => (
                  <Col xs={24} sm={12} md={8} key={item._id}>
                    <Card
                      hoverable
                      className={`menu-card menu-list-card${selectedIdx === idx ? ' menu-list-card-selected' : ''}`}
                      style={{
                        ...styles.card,
                        border: selectedIdx === idx ? '2px solid #d89500' : 'none',
                        opacity: selectedIdx === idx ? 1 : 0.85,
                        cursor: selectedIdx === idx ? 'default' : 'pointer',
                        background: selectedIdx === idx ? 'rgba(216,149,0,0.10)' : styles.card.background,
                      }}
                      cover={
                        <img
                          src={item.photo}
                          alt={item.name}
                          style={styles.cardImg}
                        />
                      }
                      onClick={() => selectedIdx !== idx && handleSelect(idx)}
                      bodyStyle={{ background: 'rgba(0,0,0,0.7)', color: '#fff', borderRadius: '0 0 16px 16px' }}
                    >
                      <Title level={5} style={{ color: '#fff', marginBottom: 4 }}>
                        {item.name}
                      </Title>
                      <div style={{ fontWeight: 'bold', color: '#d89500', fontSize: 16 }}>
                        ₱{item.price}
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
        </Col>
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
    background: 'rgba(0,0,0,0.66)',
    zIndex: 1,
  },
  contentRow: {
    margin: 0,
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 2,
    padding: '0 10px 40px 10px',
  },
  card: {
    borderRadius: 0,
    overflow: 'hidden',
    minHeight: 220,
    background: 'rgba(0,0,0,0.1)',
  },
  cardImg: {
    width: '100%',
    height: 250,
    objectFit: 'cover',
    background: '#222',
  },
};

export default Menu;
