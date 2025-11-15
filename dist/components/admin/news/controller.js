"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsController = void 0;
const service_1 = require("./service");
exports.newsController = {
    /**
     * Create a new news article
     */
    createNews: async (req, res) => {
        try {
            const { title, content, categoryId, tags, thumbnail, media, status, scheduledAt } = req.body;
            const authorId = req?.user?.id; // user from auth middleware
            if (!title || !content || !authorId || !categoryId) {
                return res.status(400).json({
                    success: false,
                    message: "Title, content, authorId, and categoryId are required",
                });
            }
            const news = await service_1.newsService.createNews({
                title,
                content,
                authorId,
                categoryId,
                tags,
                thumbnail,
                media,
                status,
                scheduledAt,
            });
            return res.status(201).json({
                success: true,
                message: "News created successfully",
                data: news,
            });
        }
        catch (error) {
            console.error("Error in createNews:", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    /**
     * Get all news with pagination and filters
     */
    getAllNews: async (req, res) => {
        try {
            const newsList = await service_1.newsService.getAllNews(req.query);
            res.status(200).json({
                success: true,
                message: "News fetched successfully",
                ...newsList,
            });
        }
        catch (error) {
            console.error("Error fetching news:", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    /**
     * Get single news by ID
     */
    getNewsById: async (req, res) => {
        try {
            const news = await service_1.newsService.getNewsById(req.params.id);
            res.status(200).json({
                success: true,
                message: "News fetched successfully",
                data: news,
            });
        }
        catch (error) {
            console.error("Error fetching news by ID:", error.message);
            res.status(404).json({ success: false, message: error.message });
        }
    },
    /**
     * Update news article
     */
    updateNews: async (req, res) => {
        try {
            const updated = await service_1.newsService.updateNews(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: "News updated successfully",
                data: updated,
            });
        }
        catch (error) {
            console.error("Error updating news:", error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    },
    /**
     * Delete (soft delete) news
     */
    deleteNews: async (req, res) => {
        try {
            const result = await service_1.newsService.deleteNews(req.params.id);
            res.status(200).json({
                success: true,
                ...result,
            });
        }
        catch (error) {
            console.error("Error deleting news:", error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
//# sourceMappingURL=controller.js.map