import { IUser, User } from "./model";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { generateToken } from "../../../middlewares/authMiddleware/auth.middleware";

const authService = {
  registerUser: async (userData: Partial<IUser>) => {
    try {
      // Validate required fields
      if (!userData.email || !userData.password || !userData.name) {
        const error: any = new Error("Name, email, and password are required");
        error.statusCode = 400;
        throw error;
      }

      // Check for existing user
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error("Email is already registered");
      }

      // Create and save new user
      const newUser = new User(userData);
      const savedUser = await newUser.save();

      // Return without password
      const { password, ...userWithoutPassword } = savedUser.toObject();
      return userWithoutPassword;
    } catch (error: any) {
      throw error;
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      // Validate input
      if (!email || !password) {
        const error = new Error("Email and password are required");
        throw error;
      }

      // Find user by email
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw new Error("User not found");
      }

      // Compare password
      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // Generate JWT
      const token = generateToken(user.id, user.email, user.role);

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user.toObject();
      return {
        message: "Login successful",
        token,
        user: userWithoutPassword,
      };
    } catch (error: any) {
      throw error;
    }
  },
};

export default authService;
