import express from "express";
const router = express.Router();
import subcategoryRoutes from "./subCategories/routes";
import { categoryController } from "./controller";
import { protect } from "../../../middlewares/authMiddleware/auth.middleware";

// 🔹 Category Routes (Chained)
router.use("/subcategories", subcategoryRoutes);

router
  .route("/")
  .get(categoryController.getCategories)
  .all(protect)
  .post(categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .all(protect)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

export default router;
