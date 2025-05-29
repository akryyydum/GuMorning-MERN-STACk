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
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #23211f 80%, #2d261b 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Card
        style={{
          width: 290,
          borderRadius: 14,
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)',
          background: 'rgba(0,0,0,0.88)',
        }}
        bodyStyle={{ padding: 20 }}
      >
        <Title level={4} style={{ color: '#d89500', textAlign: 'center', marginBottom: 18 }}>
          {isSignup ? 'Sign Up' : 'Login'}
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
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
              fontWeight: 600,
              borderRadius: 8,
              marginTop: 8
            }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </Form>
        <div style={{ marginTop: 18, textAlign: 'center' }}>
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
      </Card>
    </div>
  );
};

export default Login;
