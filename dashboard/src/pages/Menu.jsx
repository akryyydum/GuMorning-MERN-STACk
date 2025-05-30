import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Skeleton, Button, Modal, Input, Grid, message, Drawer } from 'antd';
import { CoffeeOutlined, MenuOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import './Menu.css';

const { Title } = Typography;
const { useBreakpoint } = Grid;
const NAVBAR_HEIGHT = 90;
const API_URL = 'gumorning.vercel.app/api';

const categoryOptions = [
  "All",
  "Tea",
  "Pastries",
  "Smoothies",
  "Coffee",
  "Frappe"
];

const Menu = () => {
  const screens = useBreakpoint();
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/menu`)
      .then(res => res.json())
      .then(data => {
        setMenu(data);
        setLoading(false);
      });
  }, []);

  const filteredMenu = menu.filter(item =>
    (selectedCategory === "All" || item.category === selectedCategory) &&
    (
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleCardClick = (item) => {
    setModalItem(item);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalItem(null);
  };

  const handleAdd = (item) => {
    message.success(`Added "${item.name}" to cart!`);
  };

  const isMobile = !screens.md;

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
      <div className="menu-title-wrapper" style={{ position: 'relative', zIndex: 3 }}>
        <Title
          level={2}
          style={{
            color: '#fff',
            textAlign: 'center',
            marginBottom: 18,
            fontWeight: 700,
            letterSpacing: 1,
          }}
          className="menu-title"
        >
          <CoffeeOutlined style={{ color: '#d89500', marginRight: 12 }} />
          Our Menu
        </Title>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 18,
          gap: 12,
          flexWrap: 'wrap'
        }}>
          {isMobile && (
            <Button
              icon={<MenuOutlined />}
              onClick={() => setSidebarOpen(true)}
              style={{
                background: '#23211f',
                color: '#fff',
                border: '1.5px solid #d89500',
                borderRadius: 8,
                fontWeight: 600,
                marginRight: 8
              }}
              size="large"
            >
              Categories
            </Button>
          )}
          <Input
            allowClear
            className="menu-search-bar"
            style={{
              maxWidth: 340,
              width: '100%',
              background: 'rgba(0,0,0,0.7)',
              color: '#fff',
              border: '1.5px solid #d89500',
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 16,
            }}
            size="large"
            prefix={<SearchOutlined style={{ color: '#d89500' }} />}
            placeholder="Search menu..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="menu-flex-row"
        style={{
          ...styles.flexRow,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 10 : 32,
          padding: isMobile ? '0 0.5vw 18px 0.5vw' : styles.flexRow.padding,
          minWidth: 0,
          width: '100%',
          alignItems: 'stretch',
        }}
      >
        {!isMobile ? (
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
                    color: '#fff',
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
        ) : null}
        <div
          style={{
            ...styles.productsSection,
            minWidth: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            zIndex: 2,
            position: 'relative',
          }}
          className="menu-products-section"
        >
          {isMobile && (
            <div
              className="menu-mobile-categories-bar"
              style={{
                width: '100%',
                marginBottom: 10,
                display: 'flex',
                overflowX: 'auto',
                gap: 8,
                padding: '4px 0',
              }}
            >
              {categoryOptions.map(cat => (
                <Button
                  key={cat}
                  type={selectedCategory === cat ? "primary" : "text"}
                  style={{
                    background: selectedCategory === cat ? '#d89500' : 'rgba(0,0,0,0.15)',
                    color: '#fff',
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    borderRadius: 8,
                    border: 'none',
                    textAlign: 'left',
                    transition: 'background 0.2s',
                    minWidth: 90,
                    flex: '0 0 auto',
                  }}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}
          <Row
            gutter={[12, 16]}
            justify="start"
            style={{
              ...styles.contentRow,
              minHeight: '60vh',
              position: 'relative',
              zIndex: 2,
              background: 'transparent',
              width: '100%',
              minWidth: 0,
              flexWrap: 'wrap',
              margin: 0,
              display: 'flex',
            }}
            className="menu-fadein"
          >
            {loading
              ? Array.from({ length: isMobile ? 4 : 8 }).map((_, idx) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={idx} style={{ width: '100%' }}>
                    <Card
                      loading
                      className="bakery-card"
                      style={styles.bakeryCard}
                      cover={<Skeleton.Image style={{ width: '100%', height: 220, borderRadius: '18px 18px 0 0' }} />}
                    />
                  </Col>
                ))
              : filteredMenu.map((item) => (
                  <Col xs={24} sm={12} md={8} lg={6} key={item._id} style={{ width: '100%' }}>
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
                        padding: isMobile ? 12 : 18,
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
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                        <Button
                          type="primary"
                          icon={<ShoppingCartOutlined />}
                          style={{
                            background: '#d89500',
                            border: 'none',
                            borderRadius: 6,
                            fontWeight: 600,
                            fontSize: 15,
                            padding: isMobile ? '2px 14px' : '2px 22px',
                            boxShadow: '0 2px 8px rgba(216,149,0,0.10)'
                          }}
                          onClick={e => {
                            e.stopPropagation();
                            handleAdd(item);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
            {!loading && filteredMenu.length === 0 && (
              <Col span={24} style={{ width: '100%' }}>
                <div style={{ color: '#fff', textAlign: 'center', marginTop: 40, fontSize: 18 }}>
                  No menu items found.
                </div>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <Drawer
        open={modalOpen}
        onClose={handleModalClose}
        width={isMobile ? '100vw' : 600}
        placement="right"
        closable={false}
        bodyStyle={{
          padding: isMobile ? 8 : 0,
          background: 'rgba(35,33,31,0.55)',
          borderRadius: isMobile ? 0 : 18,
          color: '#fff',
          backdropFilter: 'blur(12px)',
          boxShadow: 'none',
          border: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          transition: 'background 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        style={{
          background: 'none',
          boxShadow: 'none',
          transition: 'transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.35s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
        maskStyle={{
          background: 'rgba(0,0,0,0.35)',
          transition: 'background 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
        }}
      >
        {modalItem && (
          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: isMobile ? 12 : 28,
              minHeight: isMobile ? 0 : 260,
              width: '100%',
            }}
          >
            <div
              style={{
                flex: isMobile ? 'none' : '1 1 0',
                width: isMobile ? '100%' : 220,
                minWidth: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isMobile ? 0 : '24px 0 24px 24px',
              }}
            >
              <img
                src={modalItem.photo}
                alt={modalItem.name}
                style={{
                  width: isMobile ? '100%' : 200,
                  height: isMobile ? 180 : 200,
                  objectFit: 'cover',
                  borderRadius: 14,
                  background: '#222',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
                  margin: 0,
                  display: 'block'
                }}
                onError={e => { e.target.onerror = null; e.target.src = '/fallback-image.png'; }}
              />
            </div>
            <div
              style={{
                flex: 2,
                padding: isMobile ? '10px 4px 0 4px' : '24px 24px 24px 0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                minWidth: 0,
              }}
            >
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
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                style={{
                  marginTop: 18,
                  background: '#d89500',
                  border: 'none',
                  borderRadius: 6,
                  fontWeight: 600,
                  fontSize: 16,
                  padding: '4px 32px',
                  alignSelf: isMobile ? 'stretch' : 'flex-start'
                }}
                onClick={() => handleAdd(modalItem)}
                block={isMobile}
              >
                Add to Cart
              </Button>
              <Button
                style={{
                  marginTop: 12,
                  background: 'transparent',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 500,
                  fontSize: 15,
                  alignSelf: isMobile ? 'stretch' : 'flex-start'
                }}
                onClick={handleModalClose}
                block={isMobile}
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Drawer>
      <style>
        {`
        html, body {
          background: #23211f !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden;
        }
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
    height: 220,
    objectFit: 'cover',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    background: '#222',
  },
};

export default Menu;
