"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("./services"));
const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const response = await services_1.default.loginUser(email, password);
            res.status(200).json(response);
        }
        catch (error) {
            console.error("Login Error:", error);
            res.status(400).json({ message: error.message || "Login failed" });
        }
    },
    register: async (req, res) => {
        try {
            const payload = req.body;
            const newUser = await services_1.default.registerUser(payload);
            res.status(201).json(newUser);
        }
        catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message || "Internal Server Error" });
        }
    },
};
exports.default = authController;
//# sourceMappingURL=controller.js.map