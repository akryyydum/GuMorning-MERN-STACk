import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
import { Button, Modal, Grid } from 'antd';

const { useBreakpoint } = Grid;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState('');
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  useEffect(() => {
    setRole(localStorage.getItem('role'));
    setUserName(localStorage.getItem('fullName') || '');
    setProfileDropdown(false); 
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileDropdown(false);
      }
    }
    if (profileDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [profileDropdown]);

  const handleHamburgerClick = () => setOpen(!open);

  const handleProfileClick = (e) => {
    e.preventDefault();
    if (userName) {
      setProfileDropdown((prev) => !prev);
    } else {
      setProfileDropdown(false);
      navigate('/profile');
    }
  };

  const handleLogout = () => {
    setLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('fullName');
    setUserName('');
    setRole(null);
    setProfileDropdown(false);
    setLogoutConfirm(false);
    navigate('/');
  };

  const cancelLogout = () => {
    setLogoutConfirm(false);
  };

  const RightLinks = (
    <>
      <li>
        <Link
          to="/social"
          className={`navbar-link${location.pathname === '/social' ? ' navbar-link-active' : ''}`}
          onClick={() => setOpen(false)}
        >
          <ShareAltOutlined style={{ marginRight: 6 }} />
        </Link>
      </li>
      <li style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <div
          className={`navbar-link${location.pathname === '/profile' ? ' navbar-link-active' : ''}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            fontSize: 18,
            cursor: 'pointer',
            userSelect: 'none'
          }}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!userName) navigate('/profile');
          }}
          onKeyDown={e => {
            if ((e.key === 'Enter' || e.key === ' ') && !userName) navigate('/profile');
          }}
        >
          <UserOutlined style={{ marginRight: userName ? 6 : 0 }} />
          {userName && (
            <span
              style={{
                color: '#251d1b',
                fontWeight: 500,
                fontSize: 15,
                marginLeft: 2,
                maxWidth: 100,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              title={userName}
            >
              {userName}
            </span>
          )}
        </div>
        {userName && (
          <>
            <Button
              size="small"
              style={{
                marginLeft: 8,
                background: '#fff',
                color: '#d89500',
                border: '1px solid #d89500',
                fontWeight: 600,
                borderRadius: 6,
                padding: '0 12px',
                height: 28,
                lineHeight: '26px',
                fontSize: 14,
                boxShadow: 'none'
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
            <Modal
              open={logoutConfirm}
              onOk={confirmLogout}
              onCancel={cancelLogout}
              okText="Yes, Logout"
              cancelText="Cancel"
              title="Confirm Logout"
              centered
              closable={false}
            >
              Are you sure you want to logout?
            </Modal>
          </>
        )}
      </li>
    </>
  );

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
          {role === 'admin' && (
            <li>
              <Link
                to="/admin"
                className={`navbar-link${location.pathname === '/admin' ? ' navbar-link-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <AppstoreOutlined style={{ marginRight: 6 }} />
                Admin
              </Link>
            </li>
          )}
          {isMobile && RightLinks}
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
      {!isMobile && (
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
            {RightLinks}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
