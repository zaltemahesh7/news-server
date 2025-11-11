import { Request, Response } from "express";
import newsServiceAdmin from "./service";

const newsController = {
  /**
   * @desc    Create a new news article
   * @route   POST /api/news
   * @access  Protected (Anchor/Admin)
   */
  postNews: async (req: Request, res: Response) => {
    try {
      const { title, content, categoryId, tags, thumbnail, media, status, scheduledAt } = req.body;

      // Extract author (logged-in user)
      const authorId = (req as any)?.user?.id;

      if (!title || !content || !authorId || !categoryId) {
        return res.status(400).json({
          success: false,
          message: "Title, content, author, and category are required",
        });
      }

      const newNews = await newsServiceAdmin.postNews({
        title,
        content,
        authorId,
        categoryId,
        tags,
        thumbnail,
        status,
        scheduledAt,
      });

      return res.status(201).json({
        success: true,
        message: "News article created successfully",
        data: newNews,
      });
    } catch (error: any) {
      console.error("Error in postNews controller:", error.message);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  },

  // Update news article
  putNews: async (req: Request, res: Response) => {
    try {
      const newsId = req.params.id;
      const updateData = req.body;

      const updatedNews = await newsServiceAdmin.putNews(newsId, updateData);
      res.status(200).json(updatedNews);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },
};

export default newsController;
