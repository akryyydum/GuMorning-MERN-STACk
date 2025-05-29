import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Skeleton, Button, Modal } from 'antd';
import { CoffeeOutlined } from '@ant-design/icons';
import './Menu.css';

const { Title } = Typography;
const NAVBAR_HEIGHT = 90; 
const API_URL = 'http://localhost:5000/api';

const categoryOptions = [
  "All",
  "Tea",
  "Pastries",
  "Cookies",
  "Muffins",
  "Smoothies",
  "Coffee",
  "Frappe"
];

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/menu`)
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      });
  }, []);

  const filteredMenu = selectedCategory === "All"
    ? menu
    : menu.filter(item => item.category === selectedCategory);

  const handleCardClick = (item) => {
    setModalItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalItem(null);
  };

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
      <div className="menu-flex-row" style={styles.flexRow}>
        <div style={styles.categorySidebar} className="menu-category-sidebar">
          <div style={{ marginBottom: 18, color: '#fff', fontWeight: 600, fontSize: 18, letterSpacing: 1 }}>
            Categories
          </div>
          <div>
            {categoryOptions.map(cat => (
              <Button
                key={cat}
                type={selectedCategory === cat ? "primary" : "text"}
                block
                style={{
                  marginBottom: 8,
                  background: selectedCategory === cat ? '#d89500' : 'rgba(0,0,0,0.15)',
                  color: selectedCategory === cat ? '#fff' : '#fff',
                  fontWeight: selectedCategory === cat ? 700 : 500,
                  borderRadius: 8,
                  border: 'none',
                  textAlign: 'left',
                  transition: 'background 0.2s'
                }}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        <div
          style={styles.productsSection}
          className="menu-products-section"
        >
          <Row
            gutter={[32, 32]}
            justify="start"
            style={{
              ...styles.contentRow,
              minHeight: '60vh',
              position: 'relative',
              zIndex: 2,
              background: 'transparent',
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
                      onClick={() => handleCardClick(item)}
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
                      <Typography.Text style={{ color: '#d89500', fontSize: 14, fontWeight: 500, letterSpacing: 1 }}>
                        {item.category}
                      </Typography.Text>
                      {/* Description hidden here */}
                      {/* <Typography.Paragraph style={{ color: '#b0a074', fontSize: 14, minHeight: 40, marginBottom: 0 }}>
                        {item.description}
                      </Typography.Paragraph> */}
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
      </div>
      <Modal
        open={modalOpen}
        onCancel={handleModalClose}
        footer={null}
        centered
        width={400}
        bodyStyle={{ padding: 24, background: '#23211f', borderRadius: 18, color: '#fff' }}
      >
        {modalItem && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={modalItem.photo}
              alt={modalItem.name}
              style={{
                width: '100%',
                maxHeight: 220,
                objectFit: 'cover',
                borderRadius: 12,
                marginBottom: 18,
                background: '#222'
              }}
              onError={e => { e.target.onerror = null; e.target.src = '/fallback-image.png'; }}
            />
            <Typography.Title level={4} style={{ color: '#fff', marginBottom: 8 }}>
              {modalItem.name}
            </Typography.Title>
            <Typography.Text style={{ color: '#d89500', fontWeight: 600, fontSize: 16 }}>
              {modalItem.category}
            </Typography.Text>
            <div style={{ margin: '12px 0', color: '#fff', fontSize: 18, fontWeight: 700 }}>
              ₱{modalItem.price}
              {modalItem.weight && (
                <span style={{ color: '#b0a074', fontWeight: 400, fontSize: 15, marginLeft: 8 }}>
                  {modalItem.weight}g
                </span>
              )}
            </div>
            <Typography.Paragraph style={{ color: '#b0a074', fontSize: 15, marginBottom: 0 }}>
              {modalItem.description}
            </Typography.Paragraph>
          </div>
        )}
      </Modal>
      <style>
        {`
        .menu-flex-row {
          display: flex;
          flex-direction: row;
          gap: 32px;
        }
        @media (max-width: 900px) {
          .menu-flex-row {
            flex-direction: column;
            gap: 18px;
            padding: 0 2vw 32px 2vw;
          }
          .menu-category-sidebar {
            max-width: 100% !important;
            width: 100% !important;
            margin-bottom: 0;
            margin-top: 0;
            position: static !important;
            top: unset !important;
          }
          .menu-products-section {
            max-width: 100% !important;
            width: 100% !important;
            min-width: 0 !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .menu-products-section > .ant-row {
            width: 100% !important;
            margin: 0 !important;
          }
        }
        @media (max-width: 600px) {
          .menu-title {
            font-size: 1.3rem !important;
          }
          .menu-flex-row {
            padding: 0 0.5vw 18px 0.5vw;
            gap: 10px;
          }
          .menu-category-sidebar {
            padding: 12px 6px !important;
            font-size: 15px !important;
          }
          .menu-products-section {
            min-width: 0 !important;
            width: 100% !important;
            display: flex !important;
            flex-direction: column !important;
          }
          .menu-products-section > .ant-row {
            width: 100% !important;
            margin: 0 !important;
          }
        }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    left: 0,
    width: '100%',
    minHeight: '100vh',
    padding: 0,
    backgroundImage:
      'url("https://scontent.fmnl17-7.fna.fbcdn.net/v/t51.75761-15/487954215_17889879861219780_3243142726285693171_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEUfymEi4pSsIWyeoU5PKnhOLHbiSZRaAY4sduJJlFoBl2kvs6EL9xJddpg2BjE9HniX1QQCN0DWXuuQ9-_2GqB&_nc_ohc=FK7BDfnalCsQ7kNvwE6uL_E&_nc_oc=AdkdVmheFqZOEw_eTb2CiXwDBIimF5OlIPt5xqaZDs7jMnDlxkRX7rUT6TfKvKEcSzY&_nc_zt=23&_nc_ht=scontent.fmnl17-7.fna&_nc_gid=JrdXLStsukEDXfUO3k6qLQ&oh=00_AfICweF-P3cU3-kGzojYVeNnRKtRZWGddEtsZoMuKvIxHQ&oe=683CF805")',
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
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    zIndex: 2,
    maxWidth: 1400,
    margin: '0 auto',
    width: '100%',
    minHeight: '70vh',
    padding: '0 10px 40px 10px',
    gap: 32,
  },
  categorySidebar: {
    minWidth: 180,
    maxWidth: 220,
    background: 'rgba(0,0,0,0.55)',
    borderRadius: 16,
    padding: '24px 16px',
    marginTop: 12,
    marginBottom: 12,
    boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
    height: 'fit-content',
    alignSelf: 'flex-start',
    position: 'sticky',
    top: 40,
    zIndex: 3,
  },
  productsSection: {
    flex: 1,
    minWidth: 0,
    zIndex: 2,
  },
  contentRow: {
    margin: 0,
    alignItems: 'stretch',
    position: 'relative',
    zIndex: 2,
    padding: 0,
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
