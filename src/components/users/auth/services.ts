import { IUser, User } from "./model";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const authService = {
  registerUser: async (userData: Partial<IUser>) => {
    try {
      // Validate required fields
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error("Name, email, and password are required");
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
      console.error("Error in registerUser service:", error.message);
      throw new Error(error.message || "User registration failed");
    }
  },

  loginUser: async (email: string, password: string) => {
    try {
      // Validate input
      if (!email || !password) {
        throw new Error("Email and password are required");
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
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" },
      );

      // Return user data without password
      const { password: _, ...userWithoutPassword } = user.toObject();
      return {
        message: "Login successful",
        token,
        user: userWithoutPassword,
      };
    } catch (error: any) {
      console.error("Error in loginUser service:", error.message);
      throw new Error(error.message || "Login failed");
    }
  },
};

export default authService;
