const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const auth = require('../middleware/auth');

// GET all dealer requests (Protected)
router.get('/requests', auth, async (req, res) => {
  try {
    const requests = await prisma.dealerRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(requests);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// SUBMIT dealer request (Public)
router.post('/submit', async (req, res) => {
  const { fullName, email, phone, businessName, location, budget, interest, message } = req.body;
  try {
    const request = await prisma.dealerRequest.create({
      data: {
        fullName,
        email,
        phone,
        businessName,
        location,
        budget,
        interest,
        message
      }
    });
    res.json(request);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE dealer request (Protected)
router.delete('/requests/:id', auth, async (req, res) => {
  try {
    await prisma.dealerRequest.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
