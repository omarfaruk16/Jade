const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// GET all promotions
router.get('/', async (req, res) => {
  try {
    const promotions = await prisma.promotion.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(promotions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new promotion (Protected)
router.post('/', auth, async (req, res) => {
  try {
    const promotion = await prisma.promotion.create({ data: req.body });
    res.json(promotion);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE promotion (Protected)
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.promotion.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
