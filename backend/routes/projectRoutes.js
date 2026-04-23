const express = require('express');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const router = express.Router();
const prisma = new PrismaClient();

// Middleware to protect admin routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'supersecret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// GET all projects (public)
router.get('/', async (req, res) => {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(projects);
});

// GET specific project (public)
router.get('/:id', async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id }
  });
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

// POST new project (protected)
router.post('/', authenticateToken, async (req, res) => {
  try {
    // ensuring galleryJson is a string
    const data = req.body;
    if (Array.isArray(data.galleryJson)) {
      data.galleryJson = JSON.stringify(data.galleryJson);
    }

    const project = await prisma.project.create({ data });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update project (protected)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    if (Array.isArray(data.galleryJson)) {
      data.galleryJson = JSON.stringify(data.galleryJson);
    }
    
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data
    });
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE project (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.project.delete({
      where: { id: req.params.id }
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
