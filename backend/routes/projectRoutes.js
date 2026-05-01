const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

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
router.post('/', auth, async (req, res) => {
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
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
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
