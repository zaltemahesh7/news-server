"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const model_1 = require("./model");
exports.categoryService = {
    /**
     * Create a new category
     */
    createCategory: async (categoryData) => {
        try {
            if (!categoryData.name || !categoryData.createdBy) {
                throw new Error("Category name and createdBy are required");
            }
            const existing = await model_1.Category.findOne({ name: categoryData.name });
            if (existing)
                throw new Error("Category already exists");
            const newCategory = new model_1.Category(categoryData);
            return await newCategory.save();
        }
        catch (error) {
            console.error("Error creating category:", error.message);
            throw new Error(error.message || "Failed to create category");
        }
    },
    /**
     * Get all categories
     */
    getCategories: async () => {
        try {
            return await model_1.Category.find().populate("createdBy", "name").sort({ createdAt: -1 });
        }
        catch (error) {
            console.error("Error fetching categories:", error.message);
            throw new Error(error.message || "Failed to fetch categories");
        }
    },
    /**
     * Get single category by ID
     */
    getCategoryById: async (id) => {
        try {
            const category = await model_1.Category.findById(id).populate("createdBy", "name email");
            if (!category)
                throw new Error("Category not found");
            return category;
        }
        catch (error) {
            console.error("Error fetching category:", error.message);
            throw new Error(error.message || "Failed to get category");
        }
    },
    /**
     * Update a category
     */
    updateCategory: async (id, updateData) => {
        try {
            const updatedCategory = await model_1.Category.findByIdAndUpdate(id, updateData, { new: true });
            if (!updatedCategory)
                throw new Error("Category not found");
            return updatedCategory;
        }
        catch (error) {
            console.error("Error updating category:", error.message);
            throw new Error(error.message || "Failed to update category");
        }
    },
    /**
     * Delete a category
     */
    deleteCategory: async (id) => {
        try {
            const deleted = await model_1.Category.findByIdAndDelete(id);
            if (!deleted)
                throw new Error("Category not found");
            return { success: true, message: "Category deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting category:", error.message);
            throw new Error(error.message || "Failed to delete category");
        }
    },
};
//# sourceMappingURL=service.js.map