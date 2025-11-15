"use strict";
// import express from "express";
// import newsController from "./controller";
// import { protect } from "../../../middlewares/authMiddleware/auth.middleware";
// const router = express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.route("/").post(protect,newsController.postNews);
// router.post("/:id", newsController.putNews);
// export default router;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const auth_middleware_1 = require("../../../middlewares/authMiddleware/auth.middleware");
const router = express_1.default.Router();
// CRUD Routes for News
router
    .route("/")
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin", "anchor"), controller_1.newsController.createNews)
    .get(controller_1.newsController.getAllNews);
router
    .route("/:id")
    .get(controller_1.newsController.getNewsById)
    .put(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin", "anchor"), controller_1.newsController.updateNews)
    .delete(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin"), controller_1.newsController.deleteNews);
exports.default = router;
//# sourceMappingURL=routes.js.map