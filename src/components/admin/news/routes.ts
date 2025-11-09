import express from "express";
import newsController from "./controller";
const router = express.Router();

router.route("/").post(newsController.postNews);
router.post("/:id", newsController.putNews);

export default router;
