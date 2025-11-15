"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app_1.default.use((0, cors_1.default)({ origin: "*" }));
(0, config_1.connectDB)().then(() => {
    app_1.default.listen(PORT, () => {
        // lightweight console logger for startup
        console.log(`Server listening on http://localhost:${PORT} (env: ${process.env.NODE_ENV || "development"})`);
    });
});
//# sourceMappingURL=index.js.map