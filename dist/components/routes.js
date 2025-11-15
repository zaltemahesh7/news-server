"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const routes_1 = __importDefault(require("./admin/routes"));
router.use("/admin", routes_1.default);
const routes_2 = __importDefault(require("./news/routes"));
router.use("/news", routes_2.default);
const routes_3 = __importDefault(require("./state/district/routes"));
router.use("/district", routes_3.default);
const routes_4 = __importDefault(require("./state/district/taluka/routes"));
router.use("/taluka", routes_4.default);
const routes_5 = __importDefault(require("./users/routes"));
router.use("/user", routes_5.default);
exports.default = router;
//# sourceMappingURL=routes.js.map