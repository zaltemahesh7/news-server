"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../../middlewares/authMiddleware/auth.middleware");
const controlle_1 = require("./controlle");
const router = express_1.default.Router();
// 🔹 District CRUD Routes
router
    .route("/")
    .post(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin"), controlle_1.districtController.createDistrict)
    .get(controlle_1.districtController.getAllDistricts);
router
    .route("/:id")
    .get(controlle_1.districtController.getDistrictById)
    .put(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin"), controlle_1.districtController.updateDistrict)
    .delete(auth_middleware_1.protect, (0, auth_middleware_1.authorizeRoles)("admin"), controlle_1.districtController.deleteDistrict);
exports.default = router;
//# sourceMappingURL=routes.js.map