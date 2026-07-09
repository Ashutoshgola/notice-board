import { prisma } from "../../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          { priority: "desc" },
          { publishDate: "desc" },
        ],
      });

      return res.status(200).json(notices);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch notices" });
    }
  }

  if (req.method === "POST") {
    try {
      const {
        title,
        body,
        category,
        priority,
        publishDate,
        image,
      } = req.body;
        // for server
      if (!title || !body || !publishDate) {
        return res.status(400).json({
          message: "Title, Body and Publish Date are required.",
        });
      }

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
          image,
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Failed to create notice",
      });
    }
  }

  return res.status(405).json({
    message: "Method Not Allowed",
  });
}