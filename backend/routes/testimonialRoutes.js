const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

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
router.post('/', auth, async (req, res) => {
  try {
    const testimonial = await prisma.testimonial.create({ data: req.body });
    res.json(testimonial);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update testimonial (Protected)
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
