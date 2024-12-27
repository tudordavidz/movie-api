import { Request, Response } from "express";
import {
  listMovies,
  searchMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../services/movie.service";

export const getAllMovies = async (_req: Request, res: Response) => {
  const movies = await listMovies();
  res.json(movies);
};

export const searchMovie = async (req: Request, res: Response) => {
  const query = req.query.q as string;
  const movies = await searchMovies(query);
  res.json(movies);
};

export const createMovie = async (req: Request, res: Response) => {
  const newMovie = await addMovie(req.body);
  res.status(201).json(newMovie);
};

export const modifyMovie = async (req: Request, res: Response) => {
  const updatedMovie = await updateMovie(req.params.id, req.body);
  res.json(updatedMovie);
};

export const removeMovie = async (req: Request, res: Response) => {
  await deleteMovie(req.params.id);
  res.status(204).send();
};
