import { Request, Response } from "express";
import newsServiceAdmin from "./service";

const newsController = {
  getNews: async (req: Request, res: Response) => {
    try {
      const results = await newsServiceAdmin.getNews();
      res.status(200).json(results);
    } catch (error: any) {
      res
        .status(error.statusCode || 500)
        .json({ message: error.message || "Failed to fetch news" });
    }
  },
  getNewsById: async (req: Request, res: Response) => {},
};

export default newsController;
