"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
// middleware
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
// routes
const routes_1 = __importDefault(require("./components/routes"));
app.use("/api/v1", routes_1.default);
app.get("/", (_req, res) => res.status(200).json({ status: "ok", message: "Welcome to News API, Use /v1" }));
// generic 404
// app.use((_req, res) => res.status(404).json({ message: "Not Found" }));
exports.default = app;
//# sourceMappingURL=app.js.map