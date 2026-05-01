const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// ════════════════════════════════════════════════════════
//  PRODUCT CATEGORIES
// ════════════════════════════════════════════════════════

router.get('/categories', async (req, res) => {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { order: 'asc' },
      include: {
        products: {
          orderBy: { order: 'asc' },
          include: { whatsIncluded: { orderBy: { order: 'asc' } }, gallery: { orderBy: { order: 'asc' } } }
        }
      }
    });
    res.json(categories);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/categories/:slug', async (req, res) => {
  try {
    const category = await prisma.productCategory.findUnique({
      where: { slug: req.params.slug },
      include: {
        products: {
          orderBy: { order: 'asc' },
          include: { whatsIncluded: { orderBy: { order: 'asc' } }, gallery: { orderBy: { order: 'asc' } } }
        }
      }
    });
    if (!category) return res.status(404).json({ error: 'Not found' });
    res.json(category);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/categories', auth, async (req, res) => {
  try {
    const { name, image, order } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = await prisma.productCategory.create({
      data: { name, slug, image, order: Number(order) || 0 }
    });
    res.json(category);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/categories/:id', auth, async (req, res) => {
  try {
    const { name, image, order } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const category = await prisma.productCategory.update({
      where: { id: req.params.id },
      data: { name, slug, image, order: Number(order) || 0 }
    });
    res.json(category);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/categories/:id', auth, async (req, res) => {
  try {
    await prisma.productCategory.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// ════════════════════════════════════════════════════════
//  PRODUCTS
// ════════════════════════════════════════════════════════

router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { order: 'asc' },
      include: {
        category: true,
        whatsIncluded: { orderBy: { order: 'asc' } },
        gallery: { orderBy: { order: 'asc' } }
      }
    });
    res.json(products);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        category: true,
        whatsIncluded: { orderBy: { order: 'asc' } },
        gallery: { orderBy: { order: 'asc' } }
      }
    });
    if (!product) return res.status(404).json({ error: 'Not found' });
    res.json(product);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, subtitle, coverImage, overviewCategory, overviewBestFor, overviewStyleApproach, about, keyLine, imageUrl, categoryId, order, whatsIncluded, gallery, featureQuotesJson } = req.body;
    const product = await prisma.product.create({
      data: {
        title, subtitle, coverImage,
        overviewCategory, overviewBestFor, overviewStyleApproach,
        about, keyLine, imageUrl,
        featureQuotesJson: featureQuotesJson || "[]",
        categoryId, order: Number(order) || 0,
        whatsIncluded: {
          create: (whatsIncluded || []).map((w, i) => ({ title: w.title, description: w.description, order: i }))
        },
        gallery: {
          create: (gallery || []).map((g, i) => ({ url: g.url, order: i }))
        }
      },
      include: { whatsIncluded: true, gallery: true }
    });
    res.json(product);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, subtitle, coverImage, overviewCategory, overviewBestFor, overviewStyleApproach, about, keyLine, imageUrl, categoryId, order, whatsIncluded, gallery, featureQuotesJson } = req.body;
    await prisma.productWhatsIncluded.deleteMany({ where: { productId: req.params.id } });
    await prisma.productGalleryImage.deleteMany({ where: { productId: req.params.id } });
    const product = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        title, subtitle, coverImage,
        overviewCategory, overviewBestFor, overviewStyleApproach,
        about, keyLine, imageUrl,
        featureQuotesJson: featureQuotesJson || "[]",
        categoryId, order: Number(order) || 0,
        whatsIncluded: {
          create: (whatsIncluded || []).map((w, i) => ({ title: w.title, description: w.description, order: i }))
        },
        gallery: {
          create: (gallery || []).map((g, i) => ({ url: g.url, order: i }))
        }
      },
      include: { whatsIncluded: true, gallery: true }
    });
    res.json(product);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id } });
    res.json({ success: true });
  } catch (e) { res.status(400).json({ error: e.message }); }
});

module.exports = router;
