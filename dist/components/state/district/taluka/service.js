"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.talukaService = void 0;
const model_1 = require("./model");
exports.talukaService = {
    /**
     * Create a new Taluka
     */
    createTaluka: async (talukaData) => {
        try {
            if (!talukaData.name || !talukaData.districtId || !talukaData.createdBy) {
                throw new Error("Taluka name, districtId, and createdBy are required");
            }
            const existing = await model_1.Taluka.findOne({
                name: talukaData.name,
                districtId: talukaData.districtId,
            });
            if (existing)
                throw new Error("Taluka already exists in this district");
            const taluka = new model_1.Taluka(talukaData);
            return await taluka.save();
        }
        catch (error) {
            console.error("Error creating taluka:", error.message);
            throw new Error(error.message || "Failed to create taluka");
        }
    },
    /**
     * Get all Talukas with optional filters (pagination)
     */
    getAllTalukas: async (query) => {
        try {
            const { page = 1, limit = 10, districtId, isActive } = query;
            const filters = {};
            if (districtId)
                filters.districtId = districtId;
            if (typeof isActive !== "undefined")
                filters.isActive = isActive;
            const skip = (Number(page) - 1) * Number(limit);
            const [talukas, total] = await Promise.all([
                model_1.Taluka.find(filters)
                    .populate("districtId", "name")
                    .populate("createdBy", "name email")
                    .sort({ name: 1 })
                    .skip(skip)
                    .limit(Number(limit)),
                model_1.Taluka.countDocuments(filters),
            ]);
            return {
                data: talukas,
                pagination: {
                    total,
                    currentPage: Number(page),
                    totalPages: Math.ceil(total / Number(limit)),
                },
            };
        }
        catch (error) {
            console.error("Error fetching talukas:", error.message);
            throw new Error(error.message || "Failed to fetch talukas");
        }
    },
    /**
     * Get Taluka by ID
     */
    getTalukaById: async (id) => {
        try {
            const taluka = await model_1.Taluka.findById(id)
                .populate("districtId", "name")
                .populate("createdBy", "name email");
            if (!taluka)
                throw new Error("Taluka not found");
            return taluka;
        }
        catch (error) {
            console.error("Error fetching taluka by ID:", error.message);
            throw new Error(error.message || "Failed to get taluka");
        }
    },
    /**
     * Update a Taluka
     */
    updateTaluka: async (id, updateData) => {
        try {
            const updated = await model_1.Taluka.findByIdAndUpdate(id, updateData, { new: true });
            if (!updated)
                throw new Error("Taluka not found");
            return updated;
        }
        catch (error) {
            console.error("Error updating taluka:", error.message);
            throw new Error(error.message || "Failed to update taluka");
        }
    },
    /**
     * Delete a Taluka
     */
    deleteTaluka: async (id) => {
        try {
            const deleted = await model_1.Taluka.findByIdAndDelete(id);
            if (!deleted)
                throw new Error("Taluka not found");
            return { message: "Taluka deleted successfully" };
        }
        catch (error) {
            console.error("Error deleting taluka:", error.message);
            throw new Error(error.message || "Failed to delete taluka");
        }
    },
};
//# sourceMappingURL=service.js.map