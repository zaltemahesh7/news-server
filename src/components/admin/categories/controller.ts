import { Request, Response } from "express";
import { categoryService } from "./service";

export const categoryController = {
  // Create a new category
  createCategory: async (req: Request, res: Response) => {
    try {
      const category = await categoryService.createCategory(req.body);
      res.status(201).json({ message: "Category created successfully", category });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all categories
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.getCategories();
      res.status(200).json(categories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get category by ID
  getCategoryById: async (req: Request, res: Response) => {
    try {
      const category = await categoryService.getCategoryById(req.params.id);
      res.status(200).json(category);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  // Update category
  updateCategory: async (req: Request, res: Response) => {
    try {
      const updated = await categoryService.updateCategory(req.params.id, req.body);
      res.status(200).json({ message: "Category updated successfully", updated });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete category
  deleteCategory: async (req: Request, res: Response) => {
    try {
      const result = await categoryService.deleteCategory(req.params.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
