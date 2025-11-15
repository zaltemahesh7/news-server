"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const newsTypeController = {
    // Create a new news type
    createNewsType: async (req, res) => {
        try {
            const payload = req.body;
            payload.createdBy = req?.user?.id;
            const newsType = await service_1.default.createNewsType(payload);
            res.status(201).json({ success: true, message: "News type created successfully", newsType });
        }
        catch (error) {
            res
                .status(error.statusCode || 400)
                .json({ success: false, message: error.message || "Failed to create news type" });
        }
    },
    // Get all news types
    getNewsTypes: async (_req, res) => {
        try {
            const newsTypes = await service_1.default.getNewsTypes();
            res.status(200).json(newsTypes);
        }
        catch (error) {
            res
                .status(error.statusCode || 400)
                .json({ success: false, message: error.message || "Failed to fetch news types" });
        }
    },
    // Get news type by ID
    getNewsTypeById: async (req, res) => {
        try {
            const newsType = await service_1.default.getNewsTypeById(req.params.id);
            res.status(200).json(newsType);
        }
        catch (error) {
            res
                .status(error.statusCode || 400)
                .json({ success: false, message: error.message || "Failed to get news type" });
        }
    },
    // Update news type
    updateNewsType: async (req, res) => {
        try {
            const updated = await service_1.default.updateNewsType(req.params.id, req.body);
            res.status(200).json({ message: "News type updated successfully", updated });
        }
        catch (error) {
            res.status(error.statusCode || 400).json({ success: false, message: error.message });
        }
    },
    // Delete news type
    deleteNewsType: async (req, res) => {
        try {
            const result = await service_1.default.deleteNewsType(req.params.id);
            res.status(200).json(result);
        }
        catch (error) {
            res
                .status(error.statusCode || 400)
                .json({ success: false, message: error.message || "Failed to delete news type" });
        }
    },
};
exports.default = newsTypeController;
//# sourceMappingURL=controller.js.map