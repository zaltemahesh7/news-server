"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const routes_1 = __importDefault(require("./news/routes"));
router.use("/news", routes_1.default);
const routes_2 = __importDefault(require("./categories/routes"));
router.use("/category", routes_2.default);
exports.default = router;
//# sourceMappingURL=routes.js.map