"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const service_1 = require("./service");
exports.categoryController = {
    // Create a new category
    createCategory: async (req, res) => {
        try {
            const payload = req.body;
            payload.createdBy = req?.user?.id;
            const category = await service_1.categoryService.createCategory(payload);
            res.status(201).json({ success: true, message: "Category created successfully", category });
        }
        catch (error) {
            res
                .status(error.statusCode || 500)
                .json({ succes: false, message: error.message || "Failed to create category" });
        }
    },
    // Get all categories
    getCategories: async (req, res) => {
        try {
            const categories = await service_1.categoryService.getCategories();
            res.status(200).json({ success: true, data: categories });
        }
        catch (error) {
            res
                .status(error.statusCode || 500)
                .json({ success: false, message: error.message || "Failed to get category" });
        }
    },
    // Get category by ID
    getCategoryById: async (req, res) => {
        try {
            const category = await service_1.categoryService.getCategoryById(req.params.id);
            res.status(200).json({ success: true, data: category });
        }
        catch (error) {
            res
                .status(error.statusCode || 500)
                .json({ success: false, message: error.message || "Failed to get category" });
        }
    },
    // Update category
    updateCategory: async (req, res) => {
        try {
            const updated = await service_1.categoryService.updateCategory(req.params.id, req.body);
            res.status(200).json({ success: true, message: "Category updated successfully", updated });
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    // Delete category
    deleteCategory: async (req, res) => {
        try {
            const result = await service_1.categoryService.deleteCategory(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
//# sourceMappingURL=controller.js.map