"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const auth_middleware_1 = require("../../../../middlewares/authMiddleware/auth.middleware");
const router = express_1.default.Router();
// 🔹 Subcategory Routes (Chained)
router
    .route("/")
    .get(controller_1.subcategoryController.getSubcategories)
    .all(auth_middleware_1.protect)
    .post(controller_1.subcategoryController.createSubcategory);
router
    .route("/:id")
    .get(controller_1.subcategoryController.getSubcategoryById)
    .all(auth_middleware_1.protect)
    .put(controller_1.subcategoryController.updateSubcategory)
    .delete(controller_1.subcategoryController.deleteSubcategory);
exports.default = router;
//# sourceMappingURL=routes.js.map