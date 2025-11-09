import { Request, Response } from "express";
import { subcategoryService } from "./service";

export const subcategoryController = {
  // Create subcategory
  createSubcategory: async (req: Request, res: Response) => {
    try {
      const subcategory = await subcategoryService.createSubcategory(req.body);
      res.status(201).json({ message: "Subcategory created successfully", subcategory });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Get all or filtered subcategories
  getSubcategories: async (req: Request, res: Response) => {
    try {
      const subcategories = await subcategoryService.getSubcategories(
        req.query.categoryId as string,
      );
      res.status(200).json(subcategories);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get subcategory by ID
  getSubcategoryById: async (req: Request, res: Response) => {
    try {
      const subcategory = await subcategoryService.getSubcategoryById(req.params.id);
      res.status(200).json(subcategory);
    } catch (error: any) {
      res.status(404).json({ message: error.message });
    }
  },

  // Update subcategory
  updateSubcategory: async (req: Request, res: Response) => {
    try {
      const updated = await subcategoryService.updateSubcategory(req.params.id, req.body);
      res.status(200).json({ message: "Subcategory updated successfully", updated });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  // Delete subcategory
  deleteSubcategory: async (req: Request, res: Response) => {
    try {
      const result = await subcategoryService.deleteSubcategory(req.params.id);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
