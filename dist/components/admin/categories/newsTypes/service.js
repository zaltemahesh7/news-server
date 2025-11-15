"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const newsTypeService = {
    /**
     * Create a new news type
     */
    createNewsType: async (data) => {
        try {
            if (!data.name || !data.createdBy) {
                throw new Error("Name and createdBy are required");
            }
            const existingType = await model_1.NewsType.findOne({ name: data.name });
            if (existingType) {
                throw new Error("News type already exists");
            }
            const newType = new model_1.NewsType(data);
            return await newType.save();
        }
        catch (error) {
            console.error("Error creating news type:", error.message);
            throw new Error(error.message || "Failed to create news type");
        }
    },
    /**
     * Get all news types
     */
    getNewsTypes: async () => {
        try {
            return await model_1.NewsType.find().populate("createdBy", "name email role").sort({ createdAt: -1 });
        }
        catch (error) {
            console.error("Error fetching news types:", error.message);
            throw new Error(error.message || "Failed to fetch news types");
        }
    },
    /**
     * Get single news type by ID
     */
    getNewsTypeById: async (id) => {
        try {
            const newsType = await model_1.NewsType.findById(id).populate("createdBy", "name email");
            if (!newsType)
                throw new Error("News type not found");
            return newsType;
        }
        catch (error) {
            console.error("Error fetching news type:", error.message);
            throw new Error(error.message || "Failed to get news type");
        }
    },
    /**
     * Update a news type
     */
    updateNewsType: async (id, updateData) => {
        try {
            const updatedType = await model_1.NewsType.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedType)
                throw new Error("News type not found");
            return updatedType;
        }
        catch (error) {
            console.error("Error updating news type:", error.message);
            throw new Error(error.message || "Failed to update news type");
        }
    },
    /**
     * Delete a news type
     */
    deleteNewsType: async (id) => {
        try {
            const deleted = await model_1.NewsType.findByIdAndDelete(id);
            if (!deleted)
                throw new Error("News type not found");
            return { message: "News type deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting news type:", error.message);
            throw new Error(error.message || "Failed to delete news type");
        }
    },
};
exports.default = newsTypeService;
//# sourceMappingURL=service.js.map