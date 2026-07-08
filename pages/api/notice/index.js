// pages/api/notices/index.js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {

    if (req.method === 'GET') {
    try {
      // Requirements: Urgent notices must be ordered first via Prisma orderBy, not in the browser.
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: 'desc' },      
          { publishDate: 'desc' }     
        ],
      });
      return res.status(200).json(notices);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch notices from the database.' });
    }
  }

  // --- CREATE A NOTICE (POST) ---
  if (req.method === 'POST') {
    const { title, body, category, priority, publishDate, image } = req.body;

    // Server-Side Input Validation (Mandatory requirement)
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is short text and required.' });
    }
    if (!body || body.trim() === '') {
      return res.status(400).json({ error: 'Body is longer text and required.' });
    }
    if (!['Exam', 'Event', 'General'].includes(category)) {
      return res.status(400).json({ error: 'Category must be one of Exam, Event, or General.' });
    }
    if (!['Normal', 'Urgent'].includes(priority)) {
      return res.status(400).json({ error: 'Priority must be either Normal or Urgent.' });
    }
    if (!publishDate || isNaN(Date.parse(publishDate))) {
      return res.status(400).json({ error: 'A valid publish date is required.' });
    }

    try {
      const newNotice = await prisma.notice.create({
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null, // Optional field
        },
      });
      return res.status(201).json(newNotice);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create notice inside database.' });
    }
  }

  // Handle unsupported methods
  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}