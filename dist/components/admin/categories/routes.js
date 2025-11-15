"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const routes_1 = __importDefault(require("./subCategories/routes"));
const routes_2 = __importDefault(require("./newsTypes/routes"));
const controller_1 = require("./controller");
const auth_middleware_1 = require("../../../middlewares/authMiddleware/auth.middleware");
// 🔹 Category Routes (Chained)
router.use("/subcategories", routes_1.default);
// 🔹 News Type Routes (Chained)
router.use("/newstypes", routes_2.default);
router
    .route("/")
    .get(controller_1.categoryController.getCategories)
    .all(auth_middleware_1.protect)
    .post(controller_1.categoryController.createCategory);
router
    .route("/:id")
    .get(controller_1.categoryController.getCategoryById)
    .all(auth_middleware_1.protect)
    .put(controller_1.categoryController.updateCategory)
    .delete(controller_1.categoryController.deleteCategory);
exports.default = router;
//# sourceMappingURL=routes.js.map