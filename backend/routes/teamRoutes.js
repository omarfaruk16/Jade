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

// GET all team members (Public)
router.get('/', async (req, res) => {
  try {
    const teamMembers = await prisma.teamMember.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(teamMembers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST new team member (Protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const teamMember = await prisma.teamMember.create({ data: req.body });
    res.json(teamMember);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update team member (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const teamMember = await prisma.teamMember.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(teamMember);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE team member (Protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.teamMember.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
