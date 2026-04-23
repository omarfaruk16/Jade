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

// GET all testimonials (Public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(testimonials);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new testimonial (Protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.create({ data: req.body });
    res.json(testimonial);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update testimonial (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(testimonial);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE testimonial (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
