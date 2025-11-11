import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
  title: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  tags?: string[];
  tagsText?: string; // ✅ flattened version for indexing
  thumbnail?: string;
  status: "draft" | "pending" | "approved" | "rejected" | "published";
  scheduledAt?: Date;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema = new Schema<INews>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    tags: {
      type: [String],
      trim: true,
      default: [],
    },
    tagsText: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["draft", "pending", "approved", "rejected", "published"],
      default: "draft",
    },
    scheduledAt: {
      type: Date,
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ✅ Convert tags array to a flat string before saving
NewsSchema.pre("save", function (next) {
  if (this.tags && Array.isArray(this.tags)) {
    this.tagsText = this.tags.join(" ");
  }
  next();
});

// ✅ Create text index safely
NewsSchema.index({ title: "text", content: "text", tagsText: "text" });

export const News = mongoose.model<INews>("News", NewsSchema);
