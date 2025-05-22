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
  Avatar
} from 'antd';
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';

// Dummy API functions (replace with real API calls)
const fetchMenuItems = async () => []; // GET /api/menu
const createMenuItem = async (item) => {}; // POST /api/menu
const updateMenuItem = async (id, item) => {}; // PUT /api/menu/:id
const deleteMenuItem = async (id) => {}; // DELETE /api/menu/:id

const fetchUsers = async () => []; // GET /api/users
const deleteUser = async (id) => {}; // DELETE /api/users/:id

const Admin = () => {
  // Menu state
  const [menu, setMenu] = useState([]);
  const [menuLoading, setMenuLoading] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState(null);

  // Users state
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  // Form
  const [form] = Form.useForm();
  const [photoFile, setPhotoFile] = useState(null);

  // Fetch menu items
  const loadMenu = async () => {
    setMenuLoading(true);
    const data = await fetchMenuItems();
    setMenu(data);
    setMenuLoading(false);
  };

  // Fetch users
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

  // Menu CRUD handlers
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
        // Upload photoFile to server and get URL
        // photoUrl = await uploadPhoto(photoFile);
        photoUrl = URL.createObjectURL(photoFile); // For demo only
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
      // Validation error
    }
  };

  const handleMenuDelete = async (item) => {
    await deleteMenuItem(item._id);
    message.success('Menu item deleted');
    loadMenu();
  };

  // User handlers
  const handleUserDelete = async (user) => {
    await deleteUser(user._id);
    message.success('User deleted');
    loadUsers();
  };

  // Table columns
  const menuColumns = [
    {
      title: 'Photo',
      dataIndex: 'photo',
      key: 'photo',
      render: (photo) =>
        photo ? <Avatar shape="square" size={64} src={photo} /> : <Avatar shape="square" size={64} icon={<UserOutlined />} />,
    },
    { title: 'Name', dataIndex: 'name', key: 'name' },
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

  // Upload props
  const uploadProps = {
    beforeUpload: (file) => {
      setPhotoFile(file);
      return false; // Prevent auto upload
    },
    showUploadList: false,
    accept: 'image/*',
    maxCount: 1,
  };

  return (
    <div style={{ padding: 32 }}>
      <Tabs defaultActiveKey="menu" items={[
        {
          key: 'menu',
          label: 'Menu Management',
          children: (
            <>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{ marginBottom: 16 }}
                onClick={() => handleMenuModalOpen()}
              >
                Add Menu Item
              </Button>
              <Table
                columns={menuColumns}
                dataSource={menu}
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
                  <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                    <Input.TextArea rows={3} />
                  </Form.Item>
                  <Form.Item name="price" label="Price" rules={[{ required: true, type: 'number', min: 0 }]}>
                    <InputNumber prefix="₱" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Photo">
                    <Upload {...uploadProps}>
                      <Button icon={<UploadOutlined />}>Upload Photo</Button>
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
            <Table
              columns={userColumns}
              dataSource={users}
              loading={usersLoading}
              rowKey="_id"
              pagination={{ pageSize: 8 }}
            />
          ),
        },
      ]} />
    </div>
  );
};

export default Admin;
