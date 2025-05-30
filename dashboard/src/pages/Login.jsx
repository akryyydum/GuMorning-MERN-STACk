import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Card, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const API_URL = 'http://localhost:5000/api';

function generateIdNo() {
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `GM-${date}-${time}-${rand}`;
}

const bgImage =
  'url("https://scontent.fmnl17-3.fna.fbcdn.net/v/t51.75761-15/481449866_17885220096219780_7333015284803729390_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEtl13ljfCu75w51vaSWu6zOAwF_wxrfgs4DAX_DGt-C1MvBgan3_KlhpH7fSg0mcLFzckrh6u26NaZGfd2Gton&_nc_ohc=TpamLTTZzIkQ7kNvwFHG9nm&_nc_oc=AdlxHTlUxEL8NXmZ-CwttLv3_zHRv2MB92eWva3fHVAcQalPDOiyhS_LNoKDaMJl-H0&_nc_zt=23&_nc_ht=scontent.fmnl17-3.fna&_nc_gid=PNMlBiI5R9LZd6eI2CzC9g&oh=00_AfJImLX-qtApeoJV-yCYishrbKYpcKxwPTva2fVVc-fCCw&oe=683CC1B6")';

const Login = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (isSignup) {
        const signupData = { ...values, idNo: generateIdNo() };
        const res = await fetch(`${API_URL}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData),
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Signup failed');
        message.success('Account created! You can now log in.');
        setIsSignup(false);
      } else {
        const res = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error((await res.json()).error || 'Login failed');
        const data = await res.json();
        message.success('Login successful!');
        if (onLogin) onLogin(data.token || 'demo-token', data.user?.role || 'user');
        localStorage.setItem('token', data.token || 'demo-token');
        localStorage.setItem('role', data.user?.role || 'user');
        localStorage.setItem('fullName', data.user?.fullName || data.user?.username || '');
        navigate('/admin');
      }
    } catch (err) {
      message.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        width: '100vw',
        height: '100vh',
        backgroundImage: bgImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        fontFamily: "'Poppins', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.55)',
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 370,
            margin: '0 auto',
            background: 'transparent',
            borderRadius: 0,
            boxShadow: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Title
            level={2}
            style={{
              color: '#fff',
              textAlign: 'center',
              marginBottom: 0,
              fontWeight: 700,
              fontSize: '2.2rem',
              letterSpacing: 1,
              fontFamily: "'Poppins', sans-serif",
              marginTop: 0,
            }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </Title>
          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 18, width: '100%' }}>
            {isSignup && (
              <>
                <Form.Item
                  name="fullName"
                  label={<span style={{ color: '#fff' }}>Full Name</span>}
                  rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                  <Input autoComplete="off" />
                </Form.Item>
                <Form.Item
                  name="role"
                  label={<span style={{ color: '#fff' }}>Role</span>}
                  rules={[{ required: true, message: 'Please select a role!' }]}
                >
                  <Select placeholder="Select role">
                    <Select.Option value="user">User</Select.Option>
                    <Select.Option value="admin">Admin</Select.Option>
                  </Select>
                </Form.Item>
              </>
            )}
            <Form.Item
              name="username"
              label={<span style={{ color: '#fff' }}>Username</span>}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input autoComplete="username" />
            </Form.Item>
            {isSignup && (
              <Form.Item
                name="email"
                label={<span style={{ color: '#fff' }}>Email</span>}
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Invalid email!' }
                ]}
              >
                <Input autoComplete="email" />
              </Form.Item>
            )}
            <Form.Item
              name="password"
              label={<span style={{ color: '#fff' }}>Password</span>}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password autoComplete={isSignup ? "new-password" : "current-password"} />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                background: '#d89500',
                border: 'none',
                fontWeight: 700,
                borderRadius: 10,
                marginTop: 8,
                fontSize: '1.15rem',
                padding: '0.8rem 0',
                fontFamily: "'Poppins', sans-serif",
                boxShadow: '0 2px 8px rgba(216,149,0,0.10)'
              }}
            >
              {isSignup ? 'Sign Up' : 'Login'}
            </Button>
          </Form>
          <div style={{ marginTop: 18, textAlign: 'center', width: '100%' }}>
            <Text style={{ color: '#fff', fontSize: 13 }}>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <Button
                type="link"
                style={{ color: '#d89500', padding: 0, fontSize: 13 }}
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </Button>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
