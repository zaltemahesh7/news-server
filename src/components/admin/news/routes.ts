import express from "express";
import newsController from "./controller";
const router = express.Router();

router.route("/news").post(newsController.postNews);
router.post("/news/:id", newsController.putNews);

export default router;
