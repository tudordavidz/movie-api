import express from "express";
import {
  getAllMovies,
  searchMovie,
  createMovie,
  modifyMovie,
  removeMovie,
} from "../controllers/movie.controller";
import { requireAdmin } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/search", searchMovie);
router.post("/movies", requireAdmin, createMovie);
router.put("/movies/:id", requireAdmin, modifyMovie);
router.delete("/movies/:id", requireAdmin, removeMovie);

export default router;
