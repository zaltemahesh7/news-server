"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const auth_middleware_1 = require("../../../../middlewares/authMiddleware/auth.middleware");
const router = express_1.default.Router();
// 🔹 News Type Routes (Chained)
router
    .route("/")
    .get(controller_1.default.getNewsTypes)
    .post(auth_middleware_1.protect, controller_1.default.createNewsType);
router
    .route("/:id")
    .get(controller_1.default.getNewsTypeById)
    .put(auth_middleware_1.protect, controller_1.default.updateNewsType)
    .delete(auth_middleware_1.protect, controller_1.default.deleteNewsType);
exports.default = router;
//# sourceMappingURL=routes.js.map