const express = require('express');
const router = express.Router();
const prisma = require('../prisma');
const auth = require('../middleware/auth');

// GET contact info (Public)
router.get('/', async (req, res) => {
  try {
    let contact = await prisma.contactSettings.findUnique({
      where: { id: 'default' },
      include: {
        socials: true,
        addresses: {
          orderBy: { order: 'asc' }
        }
      }
    }).catch(() => null);
    
    if (!contact) {
      // Create default if not exists
      contact = await prisma.contactSettings.create({
        data: {
          id: 'default',
          phone: '+1 (555) 000-0000',
          email: 'hello@example.com',
          address: '123 Business St, City, Country',
          socials: {
            create: [
              { name: 'Instagram', url: 'https://instagram.com' },
              { name: 'LinkedIn', url: 'https://linkedin.com' }
            ]
          }
        },
        include: {
          socials: true
        }
      }).catch(() => null);
    }

    // Parse addresses from address field (JSON format for backward compatibility)
    let addresses = [];
    try {
      if (contact?.address) {
        // Try to parse as JSON first
        if (contact.address.startsWith('[')) {
          addresses = JSON.parse(contact.address);
        } else {
          // Fallback: single address format
          addresses = [{ label: 'Headquarters', address: contact.address }];
        }
      }
    } catch (e) {
      // If parse fails, treat as single address
      addresses = contact?.address ? [{ label: 'Headquarters', address: contact.address }] : [];
    }

    // Return combined response
    res.json({
      ...contact,
      addresses: addresses
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE contact info (Protected)
router.put('/', auth, async (req, res) => {
  const { phone, email, address, addresses, socials } = req.body;

  // Basic validation
  if (typeof phone !== 'string' || phone.length > 50) {
    return res.status(400).json({ error: 'Phone must be a string up to 50 characters.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 100) {
    return res.status(400).json({ error: 'A valid email is required (up to 100 characters).' });
  }

  if (!Array.isArray(socials)) {
    return res.status(400).json({ error: 'Socials must be an array.' });
  }
  for (const s of socials) {
    if (!s || typeof s.name !== 'string' || typeof s.url !== 'string') {
      return res.status(400).json({ error: 'Each social must have a valid string name and url.' });
    }
  }

  // Process addresses
  let addressField = address;
  if (addresses && Array.isArray(addresses)) {
    // Validate addresses
    for (const addr of addresses) {
      if (!addr || typeof addr.address !== 'string' || addr.address.length > 500) {
        return res.status(400).json({ error: 'Each address must have a valid string address.' });
      }
      if (addr.label && (typeof addr.label !== 'string' || addr.label.length > 100)) {
        return res.status(400).json({ error: 'Address label must be a string up to 100 characters.' });
      }
    }
    // Store as JSON string
    addressField = JSON.stringify(addresses);
  } else if (typeof address !== 'string' || address.length > 500) {
    return res.status(400).json({ error: 'Address must be a string up to 500 characters.' });
  }

  try {
    const contact = await prisma.contactSettings.upsert({
      where: { id: 'default' },
      update: {
        phone,
        email,
        address: addressField,
        socials: {
          deleteMany: {},
          create: socials.map(s => ({ name: s.name, url: s.url }))
        }
      },
      create: {
        id: 'default',
        phone,
        email,
        address: addressField,
        socials: {
          create: socials.map(s => ({ name: s.name, url: s.url }))
        }
      },
      include: {
        socials: true
      }
    });

    // Parse addresses for response
    let parsedAddresses = [];
    try {
      if (contact.address.startsWith('[')) {
        parsedAddresses = JSON.parse(contact.address);
      } else {
        parsedAddresses = [{ label: 'Headquarters', address: contact.address }];
      }
    } catch (e) {
      parsedAddresses = [{ label: 'Headquarters', address: contact.address }];
    }

    res.json({
      ...contact,
      addresses: parsedAddresses
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ─── Contact Messages ────────────────────────────────────────────────────────

// POST a new contact message (Public)
router.post('/messages', async (req, res) => {
  const { fullName, email, message } = req.body;

  // Input Validation
  if (typeof fullName !== 'string' || !fullName.trim() || fullName.length > 100) {
    return res.status(400).json({ error: 'Full name must be a string between 1 and 100 characters.' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof email !== 'string' || !emailRegex.test(email) || email.length > 100) {
    return res.status(400).json({ error: 'A valid email is required (up to 100 characters).' });
  }
  if (typeof message !== 'string' || !message.trim() || message.length > 2000) {
    return res.status(400).json({ error: 'Message must be a string between 1 and 2000 characters.' });
  }

  try {
    const newMsg = await prisma.contactMessage.create({
      data: {
        fullName: fullName.trim(),
        email: email.trim(),
        message: message.trim()
      }
    });
    res.status(201).json(newMsg);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET all contact messages (Protected)
router.get('/messages', auth, async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(messages);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE a contact message (Protected)
router.delete('/messages/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.contactMessage.delete({ where: { id } });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
