"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taluka = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const TalukaSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Taluka name is required"],
        trim: true,
        unique: true,
        minlength: 2,
        maxlength: 100,
    },
    districtId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "District",
        required: [true, "District reference is required"],
    },
    code: {
        type: String,
        trim: true,
        unique: true,
        sparse: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: 300,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "CreatedBy reference is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true, versionKey: false });
// 🔹 Index for faster searching by name and district
TalukaSchema.index({ name: 1, districtId: 1 }, { unique: true });
exports.Taluka = mongoose_1.default.model("Taluka", TalukaSchema);
//# sourceMappingURL=model.js.map