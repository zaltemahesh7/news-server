"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.talukaController = void 0;
const service_1 = require("./service");
exports.talukaController = {
    /**
     * Create a new Taluka
     */
    createTaluka: async (req, res) => {
        try {
            const { name, districtId, code, description, isActive } = req.body;
            const createdBy = req?.user?.id;
            if (!name || !districtId || !createdBy) {
                return res.status(400).json({
                    success: false,
                    message: "Taluka name, districtId, and createdBy are required",
                });
            }
            const taluka = await service_1.talukaService.createTaluka({
                name,
                districtId,
                code,
                description,
                createdBy,
                isActive,
            });
            res.status(201).json({
                success: true,
                message: "Taluka created successfully",
                data: taluka,
            });
        }
        catch (error) {
            console.error("Error creating taluka:", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    /**
     * Get all Talukas with pagination & filters
     */
    getAllTalukas: async (req, res) => {
        try {
            const result = await service_1.talukaService.getAllTalukas(req.query);
            res.status(200).json({
                success: true,
                message: "Talukas fetched successfully",
                ...result,
            });
        }
        catch (error) {
            console.error("Error fetching talukas:", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    /**
     * Get Taluka by ID
     */
    getTalukaById: async (req, res) => {
        try {
            const taluka = await service_1.talukaService.getTalukaById(req.params.id);
            res.status(200).json({
                success: true,
                message: "Taluka fetched successfully",
                data: taluka,
            });
        }
        catch (error) {
            console.error("Error fetching taluka by ID:", error.message);
            res.status(404).json({ success: false, message: error.message });
        }
    },
    /**
     * Update Taluka
     */
    updateTaluka: async (req, res) => {
        try {
            const updated = await service_1.talukaService.updateTaluka(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: "Taluka updated successfully",
                data: updated,
            });
        }
        catch (error) {
            console.error("Error updating taluka:", error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    },
    /**
     * Delete Taluka
     */
    deleteTaluka: async (req, res) => {
        try {
            const result = await service_1.talukaService.deleteTaluka(req.params.id);
            res.status(200).json({
                success: true,
                ...result,
            });
        }
        catch (error) {
            console.error("Error deleting taluka:", error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
//# sourceMappingURL=controller.js.map