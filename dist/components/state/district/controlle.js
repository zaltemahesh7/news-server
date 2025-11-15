"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.districtController = void 0;
const service_1 = require("./service");
exports.districtController = {
    /**
     * Create a new district
     */
    createDistrict: async (req, res) => {
        try {
            const { name, stateId, code, description, isActive } = req.body;
            const createdBy = req?.user?.id;
            if (!name || !createdBy) {
                return res.status(400).json({
                    success: false,
                    message: "District name and createdBy are required",
                });
            }
            const district = await service_1.districtService.createDistrict({
                name,
                stateId,
                code,
                description,
                createdBy,
                isActive,
            });
            res.status(201).json({
                success: true,
                message: "District created successfully",
                data: district,
            });
        }
        catch (error) {
            console.error("Error creating district:", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    /**
     * Get all districts with pagination and filters
     */
    getAllDistricts: async (req, res) => {
        try {
            const districts = await service_1.districtService.getAllDistricts(req.query);
            res.status(200).json({
                success: true,
                message: "Districts fetched successfully",
                ...districts,
            });
        }
        catch (error) {
            console.error("Error fetching districts:", error.message);
            res.status(500).json({ success: false, message: error.message });
        }
    },
    /**
     * Get district by ID
     */
    getDistrictById: async (req, res) => {
        try {
            const district = await service_1.districtService.getDistrictById(req.params.id);
            res.status(200).json({
                success: true,
                message: "District fetched successfully",
                data: district,
            });
        }
        catch (error) {
            console.error("Error fetching district by ID:", error.message);
            res.status(404).json({ success: false, message: error.message });
        }
    },
    /**
     * Update district
     */
    updateDistrict: async (req, res) => {
        try {
            const updated = await service_1.districtService.updateDistrict(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: "District updated successfully",
                data: updated,
            });
        }
        catch (error) {
            console.error("Error updating district:", error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    },
    /**
     * Delete district
     */
    deleteDistrict: async (req, res) => {
        try {
            const result = await service_1.districtService.deleteDistrict(req.params.id);
            res.status(200).json({
                success: true,
                ...result,
            });
        }
        catch (error) {
            console.error("Error deleting district:", error.message);
            res.status(400).json({ success: false, message: error.message });
        }
    },
};
//# sourceMappingURL=controlle.js.map