// pages/api/notices/[id].js
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;
  const noticeId = parseInt(id, 10);

  if (isNaN(noticeId)) {
    return res.status(400).json({ error: 'Invalid notice identification parameter.' });
  }

  // --- UPDATE NOTICE (PUT / PATCH) ---
  if (req.method === 'PUT' || req.method === 'PATCH') {
    const { title, body, category, priority, publishDate, image } = req.body;

    // Run identical server-side input validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title field cannot be left blank.' });
    }
    if (!body || body.trim() === '') {
      return res.status(400).json({ error: 'Body field cannot be left blank.' });
    }
    if (!['Exam', 'Event', 'General'].includes(category)) {
      return res.status(400).json({ error: 'Invalid selected category.' });
    }
    if (!['Normal', 'Urgent'].includes(priority)) {
      return res.status(400).json({ error: 'Invalid selected priority.' });
    }
    if (!publishDate || isNaN(Date.parse(publishDate))) {
      return res.status(400).json({ error: 'Please submit a valid calendar date.' });
    }

    try {
      const updatedNotice = await prisma.notice.update({
        where: { id: noticeId },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: image || null,
        },
      });
      return res.status(200).json(updatedNotice);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update the specified notice record.' });
    }
  }

  // --- DELETE NOTICE (DELETE) ---
  if (req.method === 'DELETE') {
    try {
      await prisma.notice.delete({
        where: { id: noticeId },
      });
      return res.status(200).json({ message: 'Notice was completely deleted from the database.' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete the requested notice record.' });
    }
  }

  // Handle unsupported methods
  res.setHeader('Allow', ['PUT', 'PATCH', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}