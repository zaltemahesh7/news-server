"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_1 = __importDefault(require("./service"));
const newsController = {
    getNews: async (req, res) => {
        try {
            const results = await service_1.default.getNews();
            res.status(200).json(results);
        }
        catch (error) {
            res
                .status(error.statusCode || 500)
                .json({ message: error.message || "Failed to fetch news" });
        }
    },
    getNewsById: async (req, res) => { },
};
exports.default = newsController;
//# sourceMappingURL=controller.js.map