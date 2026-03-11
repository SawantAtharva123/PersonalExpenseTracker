const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST a new transaction
router.post('/', async (req, res) => {
  try {
    const { text, amount, category } = req.body;
    // Simple validation
    if (!text || !amount || !category) {
      return res.status(400).json({ error: 'Please provide all fields' });
    }
    const transaction = await Transaction.create({ text, amount, category });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE a transaction
router.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
