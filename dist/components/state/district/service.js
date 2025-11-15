"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.districtService = void 0;
const model_1 = require("./model");
exports.districtService = {
    /**
     * Create a new district
     */
    createDistrict: async (districtData) => {
        try {
            if (!districtData.name || !districtData.createdBy) {
                throw new Error("District name and createdBy are required");
            }
            const existing = await model_1.District.findOne({ name: districtData.name });
            if (existing) {
                throw new Error("District with this name already exists");
            }
            const district = new model_1.District(districtData);
            return await district.save();
        }
        catch (error) {
            console.error("Error creating district:", error.message);
            throw new Error(error.message || "Failed to create district");
        }
    },
    /**
     * Get all districts with optional filters
     */
    getAllDistricts: async (query) => {
        try {
            const { page = 1, limit = 10, stateId, isActive } = query;
            const filters = {};
            if (stateId)
                filters.stateId = stateId;
            if (typeof isActive !== "undefined")
                filters.isActive = isActive;
            const skip = (Number(page) - 1) * Number(limit);
            const [districts, total] = await Promise.all([
                model_1.District.find(filters)
                    // .populate("stateId", "name")
                    .populate("createdBy", "name email")
                    .sort({ name: 1 })
                    .skip(skip)
                    .limit(Number(limit)),
                model_1.District.countDocuments(filters),
            ]);
            return {
                data: districts,
                pagination: {
                    total,
                    currentPage: Number(page),
                    totalPages: Math.ceil(total / Number(limit)),
                },
            };
        }
        catch (error) {
            console.error("Error fetching districts:", error.message);
            throw new Error(error.message || "Failed to fetch districts");
        }
    },
    /**
     * Get a district by ID
     */
    getDistrictById: async (id) => {
        try {
            const district = await model_1.District.findById(id)
                .populate("stateId", "name")
                .populate("createdBy", "name email");
            if (!district)
                throw new Error("District not found");
            return district;
        }
        catch (error) {
            console.error("Error fetching district by ID:", error.message);
            throw new Error(error.message || "Failed to get district");
        }
    },
    /**
     * Update a district
     */
    updateDistrict: async (id, updateData) => {
        try {
            const updated = await model_1.District.findByIdAndUpdate(id, updateData, {
                new: true,
            });
            if (!updated)
                throw new Error("District not found");
            return updated;
        }
        catch (error) {
            console.error("Error updating district:", error.message);
            throw new Error(error.message || "Failed to update district");
        }
    },
    /**
     * Delete a district
     */
    deleteDistrict: async (id) => {
        try {
            const deleted = await model_1.District.findByIdAndDelete(id);
            if (!deleted)
                throw new Error("District not found");
            return { message: "District deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting district:", error.message);
            throw new Error(error.message || "Failed to delete district");
        }
    },
};
//# sourceMappingURL=service.js.map