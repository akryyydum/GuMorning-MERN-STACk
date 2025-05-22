const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Menu = require('./modules/menu.model');
const User = require('./modules/user.model');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/gumorning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
        // Improved error handling
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

// User routes
app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.delete('/api/users/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
