import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    streamingLink: { type: String, required: true },
  },
  { timestamps: true }
);

export const Movie = mongoose.model("Movie", movieSchema);
