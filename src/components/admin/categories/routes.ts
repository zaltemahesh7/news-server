import express from "express";
import { categoryController } from "./controller";
const router = express.Router();

// 🔹 Category Routes (Chained)
router
  .route("/categories")
  .post(categoryController.createCategory)
  .get(categoryController.getCategories);

router
  .route("/categories/:id")
  .get(categoryController.getCategoryById)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
