import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  Tabs,
  Popconfirm,
  Space,
  Avatar,
  Select
} from 'antd';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api';

const fetchMenuItems = async () => {
  const res = await fetch(`${API_URL}/menu`);
  if (!res.ok) {
    let errMsg = 'Failed to fetch menu items';
    try {
      const err = await res.json();
      errMsg = err.error || errMsg;
    } catch {
      errMsg = res.statusText || errMsg;
    }
    throw new Error(errMsg);
  }
  return await res.json();
};
const createMenuItem = async (item) => {
  const res = await fetch(`${API_URL}/menu`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to create menu item');
  }
};
const updateMenuItem = async (id, item) => {
  const res = await fetch(`${API_URL}/menu/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update menu item');
  }
};
const deleteMenuItem = async (id) => {
  const res = await fetch(`${API_URL}/menu/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete menu item');
};

const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`);
  return await res.json();
};
const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete user');
};

const Admin = () => {
  const [menu, setMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  const [form] = Form.useForm();
  const [photoFile, setPhotoFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Search/filter states
  const [menuSearch, setMenuSearch] = useState('');
  const [menuCategory, setMenuCategory] = useState('');
  const [userSearch, setUserSearch] = useState('');
  const [userRole, setUserRole] = useState('');

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (!token || role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  const loadMenu = async () => {
    setMenuLoading(true);
    try {
      const data = await fetchMenuItems();
      setMenu(data);
    } catch (err) {
      message.error(err.message || 'Failed to load menu');
      setMenu([]);
    }
    setMenuLoading(false);
  };

  const loadUsers = async () => {
    setUsersLoading(true);
    const data = await fetchUsers();
    setUsers(data);
    setUsersLoading(false);
  };

  useEffect(() => {
    loadMenu();
    loadUsers();
  }, []);

  const handleMenuModalOpen = (item = null) => {
    setEditingMenu(item);
    setPhotoFile(null);
    setMenuModalOpen(true);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
  };

  const handleMenuModalCancel = () => {
    setMenuModalOpen(false);
    setEditingMenu(null);
    setPhotoFile(null);
    form.resetFields();
  };

  const handleMenuSubmit = async () => {
    try {
      const values = await form.validateFields();
      let photoUrl = editingMenu?.photo || '';
      if (photoFile) {
        setUploading(true);
        const formData = new FormData();
        formData.append('image', photoFile);
        const res = await fetch(`${API_URL}/upload`, {
          method: 'POST',
          body: formData,
        });
        setUploading(false);
        if (!res.ok) {
          message.error('Image upload failed');
          return;
        }
        const data = await res.json();
        photoUrl = data.url;
      } else if (values.photo && typeof values.photo === 'string') {
        photoUrl = values.photo;
      }
      const menuData = { ...values, photo: photoUrl };
      if (editingMenu) {
        await updateMenuItem(editingMenu._id, menuData);
        message.success('Menu item updated');
      } else {
        await createMenuItem(menuData);
        message.success('Menu item created');
      }
      handleMenuModalCancel();
      loadMenu();
    } catch (err) {
      setUploading(false);
      message.error(err.message || 'Error occurred');
    }
  };

  const handleMenuDelete = async (item) => {
    await deleteMenuItem(item._id);
    message.success('Menu item deleted');
    loadMenu();
  };

  const handleUserDelete = async (user) => {
    await deleteUser(user._id);
    message.success('User deleted');
    loadUsers();
  };

  // Filtered menu and users
  const filteredMenu = menu.filter(item => {
    const matchesSearch = item.name?.toLowerCase().includes(menuSearch.toLowerCase()) || item.description?.toLowerCase().includes(menuSearch.toLowerCase());
    const matchesCategory = menuCategory ? item.category === menuCategory : true;
    return matchesSearch && matchesCategory;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username?.toLowerCase().includes(userSearch.toLowerCase()) || user.fullName?.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = userRole ? user.role === userRole : true;
    return matchesSearch && matchesRole;
  });

  const menuColumns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) =>
        photo ? <Avatar shape="square" size={64} src={photo} /> : <Avatar shape="square" size={64} icon={<UserOutlined />} />,
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (p) => `₱${p}` },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleMenuModalOpen(record)} />
          <Popconfirm title="Delete this item?" onConfirm={() => handleMenuDelete(record)}>
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const userColumns = [
    { title: 'Username', dataIndex: 'username', key: 'username' },
    { title: 'Full Name', dataIndex: 'fullName', key: 'fullName' },
    { title: 'Role', dataIndex: 'role', key: 'role' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Popconfirm title="Delete this user?" onConfirm={() => handleUserDelete(record)}>
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div
      style={{
        padding: 32,
        paddingTop: 120,
        minHeight: '100vh',
        background: '#faf8f3'
      }}
    >
      <Tabs defaultActiveKey="menu" items={[
        {
          key: 'menu',
          label: 'Menu Management',
          children: (
            <>
              {/* Search and Filter Controls */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <Input
                  placeholder="Search menu..."
                  value={menuSearch}
                  onChange={e => setMenuSearch(e.target.value)}
                  style={{ width: 200 }}
                  allowClear
                />
                <Select
                  placeholder="Filter by category"
                  value={menuCategory || undefined}
                  onChange={val => setMenuCategory(val)}
                  allowClear
                  style={{ width: 180 }}
                >
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="Tea">Tea</Select.Option>
                  <Select.Option value="Pastries">Pastries</Select.Option>
                  <Select.Option value="Cookies">Cookies</Select.Option>
                  <Select.Option value="Muffins">Muffins</Select.Option>
                  <Select.Option value="Smoothies">Smoothies</Select.Option>
                  <Select.Option value="Coffee">Coffee</Select.Option>
                  <Select.Option value="Frappe">Frappe</Select.Option>
                </Select>
                <Button onClick={() => { setMenuSearch(''); setMenuCategory(''); }}>
                  Clear Filters
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ marginLeft: 'auto' }}
                  onClick={() => handleMenuModalOpen()}
                >
                  Add Menu Item
                </Button>
              </div>
              <Table
                columns={menuColumns}
                dataSource={filteredMenu}
                loading={menuLoading}
                rowKey="_id"
                pagination={{ pageSize: 6 }}
              />
              <Modal
                open={menuModalOpen}
                title={editingMenu ? 'Edit Menu Item' : 'Add Menu Item'}
                onCancel={handleMenuModalCancel}
                onOk={handleMenuSubmit}
                okText={editingMenu ? 'Update' : 'Create'}
              >
                <Form form={form} layout="vertical">
                  <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                    <Select placeholder="Select a category">
                      <Select.Option value="Tea">Tea</Select.Option>
                      <Select.Option value="Pastries">Pastries</Select.Option>
                      <Select.Option value="Cookies">Cookies</Select.Option>
                      <Select.Option value="Muffins">Muffins</Select.Option>
                      <Select.Option value="Smoothies">Smoothies</Select.Option>
                      <Select.Option value="Coffee">Coffee</Select.Option>
                      <Select.Option value="Frappe">Frappe</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} />
                  </Form.Item>
                  <Form.Item name="price" label="Price" rules={[{ required: true, type: 'number', min: 0 }]}>
                    <InputNumber prefix="₱" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item name="photo" label="Photo URL">
                    <Input placeholder="Paste a public image URL or upload below" />
                  </Form.Item>
                  <Form.Item label="Upload Photo">
                    <Upload
                      beforeUpload={(file) => {
                        setPhotoFile(file);
                        return false; 
                      }}
                      showUploadList={false}
                      accept="image/*"
                      maxCount={1}
                    >
                      <Button icon={<UploadOutlined />} loading={uploading}>Upload Photo</Button>
                    </Upload>
                    {photoFile && (
                      <div style={{ marginTop: 8 }}>
                        <img
                          src={URL.createObjectURL(photoFile)}
                          alt="Preview"
                          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                        />
                      </div>
                    )}
                    {!photoFile && editingMenu?.photo && (
                      <div style={{ marginTop: 8 }}>
                        <img
                          src={editingMenu.photo}
                          alt="Current"
                          style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }}
                        />
                      </div>
                    )}
                  </Form.Item>
                </Form>
              </Modal>
            </>
          ),
        },
        {
          key: 'users',
          label: 'User Management',
          children: (
            <>
              {/* Search and Filter Controls */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                <Input
                  placeholder="Search users..."
                  value={userSearch}
                  onChange={e => setUserSearch(e.target.value)}
                  style={{ width: 200 }}
                  allowClear
                />
                <Select
                  placeholder="Filter by role"
                  value={userRole || undefined}
                  onChange={val => setUserRole(val)}
                  allowClear
                  style={{ width: 150 }}
                >
                  <Select.Option value="">All</Select.Option>
                  <Select.Option value="admin">Admin</Select.Option>
                  <Select.Option value="user">User</Select.Option>
                </Select>
                <Button onClick={() => { setUserSearch(''); setUserRole(''); }}>
                  Clear Filters
                </Button>
              </div>
              <Table
                columns={userColumns}
                dataSource={filteredUsers}
                loading={usersLoading}
                rowKey="_id"
                pagination={{ pageSize: 8 }}
              />
            </>
          ),
        },
      ]} />
    </div>
  );
};

export default Admin;
