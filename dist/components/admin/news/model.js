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
exports.News = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const NewsSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: 5,
        maxlength: 200,
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        minlength: 20,
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"],
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Category is required"],
    },
    tags: {
        type: [String],
        default: [],
    },
    tagsText: {
        type: String,
        default: "",
    },
    thumbnail: {
        type: String,
        default: "",
    },
    media: {
        images: [{ type: String }],
        videos: [{ type: String }],
    },
    status: {
        type: String,
        enum: ["draft", "pending", "approved", "rejected", "published"],
        default: "draft",
    },
    scheduledAt: { type: Date },
    publishedAt: { type: Date },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    moderation: {
        reviewedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
        remarks: { type: String, trim: true },
        reviewedAt: { type: Date },
    },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
// Flatten tags array into string for text indexing
NewsSchema.pre("save", function (next) {
    if (this.tags && Array.isArray(this.tags)) {
        this.tagsText = this.tags.join(" ");
    }
    next();
});
// Safe text index (no array indexing error)
NewsSchema.index({ title: "text", content: "text", tagsText: "text" });
exports.News = mongoose_1.default.model("News", NewsSchema);
//# sourceMappingURL=model.js.map