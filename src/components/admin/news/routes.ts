import express from "express";
import newsController from "./controller";
import { protect } from "../../../middlewares/authMiddleware/auth.middleware";
const router = express.Router();

router.route("/").post(protect,newsController.postNews);
router.post("/:id", newsController.putNews);

export default router;
