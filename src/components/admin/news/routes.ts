// import express from "express";
// import newsController from "./controller";
// import { protect } from "../../../middlewares/authMiddleware/auth.middleware";
// const router = express.Router();

// router.route("/").post(protect,newsController.postNews);
// router.post("/:id", newsController.putNews);

// export default router;

import express from "express";
import { newsController } from "./controller";
import { authorizeRoles, protect } from "../../../middlewares/authMiddleware/auth.middleware";

const router = express.Router();

// CRUD Routes for News
router
  .route("/")
  .post(protect, authorizeRoles("admin", "anchor"), newsController.createNews)
  .get(newsController.getAllNews);

router
  .route("/:id")
  .get(newsController.getNewsById)
  .put(protect, authorizeRoles("admin", "anchor"), newsController.updateNews)
  .delete(protect, authorizeRoles("admin"), newsController.deleteNews);

export default router;
