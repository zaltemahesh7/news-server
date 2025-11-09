import { Request, Response } from "express";
import newsServiceAdmin from "./service";

const newsController = {
  // Create a news article
  postNews: async (req: Request, res: Response) => {
    try {
      const { title, content, author,categoryId } = req.body;
      if (!title || !content || !author) {
        return res.status(400).json({ message: "Title, content, and author are required" });
      }

      const newNews = await newsServiceAdmin.postNews({ title, content, authorId: author, categoryId });
      res.status(201).json(newNews);
    } catch (error: any) {
      console.error("Error in postNews controller:", error);
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Internal Server Error" });
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
