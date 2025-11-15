"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsService = void 0;
const model_1 = require("./model");
exports.newsService = {
    /**
     * Create a new news article
     */
    createNews: async (newsData) => {
        try {
            const { title, content, authorId, categoryId } = newsData;
            if (!title || !content || !authorId || !categoryId) {
                throw new Error("Title, content, authorId, and categoryId are required");
            }
            const formattedTags = newsData.tags?.map((tag) => tag.trim().toLowerCase()) || [];
            const newNews = new model_1.News({
                ...newsData,
                tags: formattedTags,
                status: newsData.status || "draft",
                isDeleted: false,
            });
            const savedNews = await newNews.save();
            return savedNews;
        }
        catch (error) {
            console.error("Error creating news:", error.message);
            throw new Error(error.message || "Failed to create news");
        }
    },
    /**
     * Get all news articles (with pagination & filters)
     */
    getAllNews: async (query) => {
        try {
            const { page = 1, limit = 10, categoryId, authorId, status } = query;
            const filters = { isDeleted: false };
            if (categoryId)
                filters.categoryId = categoryId;
            if (authorId)
                filters.authorId = authorId;
            if (status)
                filters.status = status;
            const skip = (page - 1) * limit;
            const [newsList, total] = await Promise.all([
                model_1.News.find(filters)
                    .populate("authorId", "name email")
                    .populate("categoryId", "name")
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit),
                model_1.News.countDocuments(filters),
            ]);
            return {
                data: newsList,
                pagination: {
                    total,
                    currentPage: Number(page),
                    totalPages: Math.ceil(total / limit),
                },
            };
        }
        catch (error) {
            console.error("Error fetching news:", error.message);
            throw new Error(error.message || "Failed to fetch news");
        }
    },
    /**
     * Get news by ID
     */
    getNewsById: async (id) => {
        try {
            const news = await model_1.News.findById(id)
                .populate("authorId", "name email")
                .populate("categoryId", "name");
            if (!news || news.isDeleted) {
                throw new Error("News not found");
            }
            return news;
        }
        catch (error) {
            console.error("Error fetching news by ID:", error.message);
            throw new Error(error.message || "Failed to get news");
        }
    },
    /**
     * Update news article
     */
    updateNews: async (id, updateData) => {
        try {
            if (updateData.tags && Array.isArray(updateData.tags)) {
                updateData.tags = updateData.tags.map((tag) => tag.trim().toLowerCase());
            }
            const updatedNews = await model_1.News.findByIdAndUpdate(id, updateData, {
                new: true,
            });
            if (!updatedNews)
                throw new Error("News not found");
            return updatedNews;
        }
        catch (error) {
            console.error("Error updating news:", error.message);
            throw new Error(error.message || "Failed to update news");
        }
    },
    /**
     * Delete (soft delete) news article
     */
    deleteNews: async (id) => {
        try {
            const deletedNews = await model_1.News.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
            if (!deletedNews)
                throw new Error("News not found");
            return { message: "News deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting news:", error.message);
            throw new Error(error.message || "Failed to delete news");
        }
    },
};
//# sourceMappingURL=service.js.map