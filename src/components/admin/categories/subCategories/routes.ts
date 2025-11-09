import express from "express";
import { subcategoryController } from "./controller";
const router = express.Router();

// 🔹 Subcategory Routes (Chained)
router
  .route("/subcategories")
  .post(subcategoryController.createSubcategory)
  .get(subcategoryController.getSubcategories);

router
  .route("/subcategories/:id")
  .get(subcategoryController.getSubcategoryById)
  .put(subcategoryController.updateSubcategory)
  .delete(subcategoryController.deleteSubcategory);
export default router;
