"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../admin/news/model");
const newsServiceAdmin = {
    /**
     * Create a new news article
     */
    postNews: async (newsData) => {
        try {
            if (!newsData.title || !newsData.content || !newsData.authorId || !newsData.categoryId) {
                throw new Error("Title, content, author, and category are required");
            }
            const newNews = new model_1.News(newsData);
            return await newNews.save();
        }
        catch (error) {
            console.error("Error creating news:", error.message);
            throw new Error(error.message || "Failed to create news");
        }
    },
    /**
     * Get all news or filter by status/category/author
     */
    getNews: async (filters = {}) => {
        try {
            const query = {};
            if (filters.status)
                query.status = filters.status;
            if (filters.categoryId)
                query.categoryId = filters.categoryId;
            if (filters.authorId)
                query.authorId = filters.authorId;
            if (filters.keyword)
                query.$text = { $search: filters.keyword };
            const newsList = await model_1.News.find(query)
                .populate("authorId", "name email role")
                .populate("categoryId", "name")
                .sort({ createdAt: -1 });
            return newsList;
        }
        catch (error) {
            console.error("Error fetching news:", error.message);
            throw new Error(error.message || "Failed to fetch news");
        }
    },
    /**
     * Update an existing news article
     */
    putNews: async (id, updateData) => {
        try {
            const updatedNews = await model_1.News.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedNews)
                throw new Error("News not found");
            return updatedNews;
        }
        catch (error) {
            console.error("Error updating news:", error.message);
            throw new Error(error.message || "Failed to update news");
        }
    },
};
exports.default = newsServiceAdmin;
//# sourceMappingURL=service.js.map