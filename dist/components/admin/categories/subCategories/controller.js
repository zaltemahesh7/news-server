"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subcategoryController = void 0;
const service_1 = require("./service");
exports.subcategoryController = {
    // Create subcategory
    createSubcategory: async (req, res) => {
        try {
            const payload = req.body;
            payload.createdBy = req?.user?.id;
            const subcategory = await service_1.subcategoryService.createSubcategory(payload);
            res.status(201).json({ message: "Subcategory created successfully", subcategory });
        }
        catch (error) {
            res
                .status(error.statusCode || 500)
                .json({ success: false, message: error.message || "Failed to create subcategory" });
        }
    },
    // Get all or filtered subcategories
    getSubcategories: async (req, res) => {
        try {
            const subcategories = await service_1.subcategoryService.getSubcategories(req.query.categoryId);
            res.status(200).json(subcategories);
        }
        catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
    // Get subcategory by ID
    getSubcategoryById: async (req, res) => {
        try {
            const subcategory = await service_1.subcategoryService.getSubcategoryById(req.params.id);
            res.status(200).json(subcategory);
        }
        catch (error) {
            res.status(404).json({ success: false, message: error.message });
        }
    },
    // Update subcategory
    updateSubcategory: async (req, res) => {
        try {
            const updated = await service_1.subcategoryService.updateSubcategory(req.params.id, req.body);
            res.status(200).json(updated);
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
    // Delete subcategory
    deleteSubcategory: async (req, res) => {
        try {
            const result = await service_1.subcategoryService.deleteSubcategory(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
//# sourceMappingURL=controller.js.map