const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

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
router.post('/', auth, async (req, res) => {
  try {
    const faq = await prisma.fAQ.create({ data: req.body });
    res.json(faq);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update FAQ (Protected)
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.fAQ.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
