const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

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
router.post('/', auth, async (req, res) => {
  try {
    const teamMember = await prisma.teamMember.create({ data: req.body });
    res.json(teamMember);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// PUT update team member (Protected)
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.teamMember.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
