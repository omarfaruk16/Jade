const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to protect admin routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {

    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

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
router.post('/', authenticateToken, async (req, res) => {
  try {
    const promotion = await prisma.promotion.create({ data: req.body });
    res.json(promotion);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE promotion (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.promotion.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
