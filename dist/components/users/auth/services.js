"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("./model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_middleware_1 = require("../../../middlewares/authMiddleware/auth.middleware");
const authService = {
    registerUser: async (userData) => {
        try {
            // Validate required fields
            if (!userData.email || !userData.password || !userData.name) {
                const error = new Error("Name, email, and password are required");
                error.statusCode = 400;
                throw error;
            }
            // Check for existing user
            const existingUser = await model_1.User.findOne({ email: userData.email });
            if (existingUser) {
                throw new Error("Email is already registered");
            }
            // Create and save new user
            const newUser = new model_1.User(userData);
            const savedUser = await newUser.save();
            // Return without password
            const { password, ...userWithoutPassword } = savedUser.toObject();
            return userWithoutPassword;
        }
        catch (error) {
            throw error;
        }
    },
    loginUser: async (email, password) => {
        try {
            // Validate input
            if (!email || !password) {
                const error = new Error("Email and password are required");
                throw error;
            }
            // Find user by email
            const user = await model_1.User.findOne({ email }).select("+password");
            if (!user) {
                throw new Error("User not found");
            }
            // Compare password
            const isMatch = await bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }
            // Generate JWT
            const token = (0, auth_middleware_1.generateToken)(user.id, user.email, user.role);
            // Return user data without password
            const { password: _, ...userWithoutPassword } = user.toObject();
            return {
                message: "Login successful",
                token,
                user: userWithoutPassword,
            };
        }
        catch (error) {
            throw error;
        }
    },
};
exports.default = authService;
//# sourceMappingURL=services.js.map