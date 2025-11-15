"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subcategoryService = void 0;
const model_1 = require("./model");
const model_2 = require("../model");
exports.subcategoryService = {
    /**
     * Create a new subcategory
     */
    createSubcategory: async (subcategoryData) => {
        try {
            const { name, categoryId, createdBy } = subcategoryData;
            if (!name || !categoryId || !createdBy) {
                throw new Error("Subcategory name, categoryId, and createdBy are required");
            }
            // Check if category exists
            const categoryExists = await model_2.Category.findById(categoryId);
            if (!categoryExists)
                throw new Error("Category not found");
            // Check duplicate name under same category
            const existing = await model_1.Subcategory.findOne({ name, categoryId });
            if (existing)
                throw new Error("Subcategory already exists in this category");
            const newSubcategory = new model_1.Subcategory(subcategoryData);
            return { success: true, data: await newSubcategory.save() };
        }
        catch (error) {
            console.error("Error creating subcategory:", error.message);
            throw new Error(error.message || "Failed to create subcategory");
        }
    },
    /**
     * Get all subcategories (optionally filtered by category)
     */
    getSubcategories: async (categoryId) => {
        try {
            const query = categoryId ? { categoryId } : {};
            return {
                success: true,
                data: await model_1.Subcategory.find(query)
                    .populate("categoryId", "name")
                    .populate("createdBy", "name email role")
                    .sort({ createdAt: -1 }),
            };
        }
        catch (error) {
            console.error("Error fetching subcategories:", error.message);
            throw new Error(error.message || "Failed to fetch subcategories");
        }
    },
    /**
     * Get subcategory by ID
     */
    getSubcategoryById: async (id) => {
        try {
            const subcategory = await model_1.Subcategory.findById(id)
                .populate("categoryId", "name")
                .populate("createdBy", "name email role");
            if (!subcategory)
                throw new Error("Subcategory not found");
            return { success: true, data: subcategory };
        }
        catch (error) {
            console.error("Error fetching subcategory:", error.message);
            throw new Error(error.message || "Failed to fetch subcategory");
        }
    },
    /**
     * Update subcategory details
     */
    updateSubcategory: async (id, updateData) => {
        try {
            const updated = await model_1.Subcategory.findByIdAndUpdate(id, updateData, { new: true });
            if (!updated)
                throw new Error("Subcategory not found");
            return { success: true, message: "Subcategory updated successfully", data: updated };
        }
        catch (error) {
            console.error("Error updating subcategory:", error.message);
            throw new Error(error.message || "Failed to update subcategory");
        }
    },
    /**
     * Delete subcategory
     */
    deleteSubcategory: async (id) => {
        try {
            const deleted = await model_1.Subcategory.findByIdAndDelete(id);
            if (!deleted)
                throw new Error("Subcategory not found");
            return { success: true, message: "Subcategory deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting subcategory:", error.message);
            throw new Error(error.message || "Failed to delete subcategory");
        }
    },
};
//# sourceMappingURL=service.js.map