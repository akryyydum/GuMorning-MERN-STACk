const express = require('express');
const mongoose = require('mongoose');
const Menu = require('../modules/menu.model');

const app = express();
app.use(express.json());

// Ensure mongoose is connected (avoid multiple connections in serverless)
if (mongoose.connection.readyState === 0) {
  mongoose.connect(
    process.env.MONGODB_URI || 'mongodb+srv://hedlkandres:mOZgt9RJlb4P7h8x@cluster0.lj5iwsd.mongodb.net/gumorning?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
}

app.get('/', async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

app.post('/', async (req, res) => {
  try {
    const menuItem = new Menu(req.body);
    await menuItem.save();
    res.status(201).json(menuItem);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: err.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  }
});

app.put('/:id', async (req, res) => {
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

app.delete('/:id', async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = app;
