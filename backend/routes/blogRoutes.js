const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recent blogs (e.g. for homepage)
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 4;
    const blogs = await prisma.blog.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get blog by slug
router.get('/:slug', async (req, res) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug }
    });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a blog
router.post('/', async (req, res) => {
  try {
    const { title, coverImage, description } = req.body;
    
    // Generate slug from title
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Check if slug exists
    const existing = await prisma.blog.findUnique({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        coverImage,
        description
      }
    });
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a blog
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, coverImage, description } = req.body;

    let updateData = { title, coverImage, description };

    if (title) {
      let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const existing = await prisma.blog.findUnique({ where: { slug } });
      if (existing && existing.id !== id) {
        slug = `${slug}-${Date.now()}`;
      }
      updateData.slug = slug;
    }

    const blog = await prisma.blog.update({
      where: { id },
      data: updateData
    });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
  try {
    await prisma.blog.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
