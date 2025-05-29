const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Menu = require('./modules/menu.model');
const User = require('./modules/user.model');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gumorning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Serve uploaded images statically
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
app.use('/uploads', express.static(uploadsDir));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Image upload endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ url });
});

// Menu routes
app.get('/api/menu', async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        console.error('Error fetching menu:', err);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});


app.post('/api/menu', async (req, res) => {
    try {
        const menuItem = new Menu(req.body);
        await menuItem.save();
        res.status(201).json(menuItem);
    } catch (err) {
        // Improved error handling
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }
});

app.put('/api/menu/:id', async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(menuItem);
    } catch (err) {
        if (err.name === 'ValidationError') {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal Server Error', details: err.message });
        }
    }
});

app.delete('/api/menu/:id', async (req, res) => {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.post('/api/signup', async (req, res) => {
    try {
        const { idNo, fullName, email, password, username, role } = req.body;
        if (!idNo || !fullName || !email || !password || !username || !role) {
            return res.status(400).json({ error: 'All required fields must be filled.' });
        }
        const existing = await User.findOne({ $or: [{ email }, { idNo }, { username }] });
        if (existing) {
            return res.status(400).json({ error: 'User already exists.' });
        }
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({
            idNo,
            fullName,
            email,
            password: hashed,
            username,
            role
        });
        await user.save();
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required.' });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        res.json({ token: 'demo-token', user: { username: user.username, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
