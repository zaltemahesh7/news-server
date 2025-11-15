"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../../../middlewares/authMiddleware/auth.middleware");
const controller_1 = require("./controller");
const router = express_1.default.Router();
// 🔹 Taluka CRUD Routes
router
    .route("/")
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin"), controller_1.talukaController.createTaluka)
    .get(controller_1.talukaController.getAllTalukas);
router
    .route("/:id")
    .get(controller_1.talukaController.getTalukaById)
    .put(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin"), controller_1.talukaController.updateTaluka)
    .delete(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin"), controller_1.talukaController.deleteTaluka);
exports.default = router;
//# sourceMappingURL=routes.js.map