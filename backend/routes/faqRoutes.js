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

// GET all FAQs (Public)
router.get('/', async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(faqs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new FAQ (Protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const faq = await prisma.fAQ.create({ data: req.body });
    res.json(faq);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update FAQ (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const faq = await prisma.fAQ.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(faq);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE FAQ (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.fAQ.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
