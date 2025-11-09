import express from "express";
const router = express.Router();

import newsRoutes from "./news/routes";
router.use("/", newsRoutes);

import adminRoures from "./admin/routes";
router.use("/admin", adminRoures);

import userRoutes from "./users/routes";
router.use("/", userRoutes);

export default router;
