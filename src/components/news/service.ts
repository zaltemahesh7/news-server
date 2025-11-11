import { News, INews } from "../admin/news/model";

const newsServiceAdmin = {
  /**
   * Create a new news article
   */
  postNews: async (newsData: Partial<INews>) => {
    try {
      if (!newsData.title || !newsData.content || !newsData.authorId || !newsData.categoryId) {
        throw new Error("Title, content, author, and category are required");
      }

      const newNews = new News(newsData);
      return await newNews.save();
    } catch (error: any) {
      console.error("Error creating news:", error.message);
      throw new Error(error.message || "Failed to create news");
    }
  },

  /**
   * Get all news or filter by status/category/author
   */
  getNews: async (filters: any = {}) => {
    try {
      const query: any = {};

      if (filters.status) query.status = filters.status;
      if (filters.categoryId) query.categoryId = filters.categoryId;
      if (filters.authorId) query.authorId = filters.authorId;
      if (filters.keyword) query.$text = { $search: filters.keyword };

      const newsList = await News.find(query)
        .populate("authorId", "name email role")
        .populate("categoryId", "name")
        .sort({ createdAt: -1 });

      return newsList;
    } catch (error: any) {
      console.error("Error fetching news:", error.message);
      throw new Error(error.message || "Failed to fetch news");
    }
  },

  /**
   * Update an existing news article
   */
  putNews: async (id: string, updateData: Partial<INews>) => {
    try {
      const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedNews) throw new Error("News not found");
      return updatedNews;
    } catch (error: any) {
      console.error("Error updating news:", error.message);
      throw new Error(error.message || "Failed to update news");
    }
  },
};

export default newsServiceAdmin;
