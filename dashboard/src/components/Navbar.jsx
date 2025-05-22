import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  InfoCircleOutlined,
  EnvironmentOutlined,
  AppstoreOutlined,
  ShareAltOutlined,
  UserOutlined
} from '@ant-design/icons';
import './Navbar.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleHamburgerClick = () => setOpen(!open);

  return (
    <nav className="navbar">
      <div className="navbar-section navbar-section-left">
        <div className="navbar-hamburger" onClick={handleHamburgerClick}>
          <span />
          <span />
          <span />
        </div>
        <ul className={`navbar-links${open ? ' navbar-links-open' : ''}`}>
          <li>
            <Link
              to="/"
              className={`navbar-link${location.pathname === '/' ? ' navbar-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <HomeOutlined style={{ marginRight: 6 }} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`navbar-link${location.pathname === '/about' ? ' navbar-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <InfoCircleOutlined style={{ marginRight: 6 }} />
              About
            </Link>
          </li>
          <li>
            <Link
              to="/location"
              className={`navbar-link${location.pathname === '/location' ? ' navbar-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <EnvironmentOutlined style={{ marginRight: 6 }} />
              Location
            </Link>
          </li>
          <li>
            <Link
              to="/menu"
              className={`navbar-link navbar-link-bold${location.pathname === '/menu' ? ' navbar-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <AppstoreOutlined style={{ marginRight: 6 }} />
              Menu
            </Link>
          </li>
         
        </ul>
      </div>
      <div className="navbar-section navbar-section-center">
        <div className="navbar-logo" style={{ overflow: 'hidden', maxWidth: '100%', display: 'flex', justifyContent: 'center' }}>
          <img
            src={logo}
            alt="GuMorning Logo"
            style={{
              height: '70px',
              maxWidth: '100%',
              width: 'auto',
              display: 'block',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>
      <div className="navbar-section navbar-section-right" style={{ minWidth: 0, flexShrink: 1 }}>
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: 0,
            padding: 0,
            listStyle: 'none',
            flexWrap: 'wrap',
            minWidth: 0,
            maxWidth: '100%',
            overflow: 'hidden'
          }}
        >
          <li>
            <Link
              to="/social"
              className={`navbar-link${location.pathname === '/social' ? ' navbar-link-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              <ShareAltOutlined style={{ marginRight: 6 }} />
            </Link>
          </li>
          <li>
            <Link
          to="/profile"
          className={`navbar-link${location.pathname === '/profile' ? ' navbar-link-active' : ''}`}
          onClick={() => setOpen(false)}
        >
          <UserOutlined style={{ marginRight: 6 }} />
        </Link>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
