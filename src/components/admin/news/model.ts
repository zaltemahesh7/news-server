import mongoose, { Schema, Document } from "mongoose";

export interface INews extends Document {
  title: string;
  content: string;
  authorId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  tags?: string[];
  thumbnail?: string;
  media?: {
    images?: string[];
    videos?: string[];
  };
  status: "draft" | "pending" | "approved" | "rejected" | "published";
  scheduledAt?: Date;
  publishedAt?: Date;
  views: number;
  likes: number;
  dislikes: number;
  moderation?: {
    reviewedBy?: mongoose.Types.ObjectId;
    remarks?: string;
    reviewedAt?: Date;
  };
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema<INews> = new Schema(
  {
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
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
    scheduledAt: {
      type: Date,
    },
    publishedAt: {
      type: Date,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    },
    moderation: {
      reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
      remarks: { type: String, trim: true },
      reviewedAt: { type: Date },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Index for faster searching by title, tags, and category
NewsSchema.index({ title: "text", content: "text", tags: 1, categoryId: 1 });

export const News = mongoose.model<INews>("News", NewsSchema);
