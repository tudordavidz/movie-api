import { Movie } from "../models/movie.model";

export const listMovies = async () => Movie.find();

export const searchMovies = async (query: string) =>
  Movie.find({
    $or: [
      { title: { $regex: query, $options: "i" } },
      { genre: { $regex: query, $options: "i" } },
    ],
  });

export const addMovie = async (movieData: {
  title: string;
  genre: string;
  rating: number;
  streamingLink: string;
}) => Movie.create(movieData);

export const updateMovie = async (
  id: string,
  updates: Partial<{
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
  }>
) => Movie.findByIdAndUpdate(id, updates, { new: true });

export const deleteMovie = async (id: string) => Movie.findByIdAndDelete(id);
