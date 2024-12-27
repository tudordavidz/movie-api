import {
  addMovie,
  updateMovie,
  deleteMovie,
  listMovies,
  searchMovies,
} from "../../../src/services/movie.service";
import { Movie } from "../../../src/models/movie.model";
import mongoose from "mongoose";

beforeAll(async () => {
  const url = "mongodb://localhost:27017/movieLobbyTest";
  await mongoose.connect(url);
});

afterEach(async () => {
  await Movie.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Movie Service", () => {
  // Test addMovie function
  it("should add a new movie", async () => {
    const newMovie = {
      title: "Interstellar",
      genre: "Sci-Fi",
      rating: 9.0,
      streamingLink: "https://example.com/interstellar",
    };

    const movie = await addMovie(newMovie);
    expect(movie.title).toBe("Interstellar");
    expect(movie.genre).toBe("Sci-Fi");
  });

  // Test updateMovie function
  it("should update an existing movie", async () => {
    const movie = new Movie({
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      streamingLink: "https://example.com/inception",
    });
    await movie.save();

    const updatedMovieData = {
      title: "Inception Updated",
      genre: "Sci-Fi",
      rating: 9.0,
      streamingLink: "https://example.com/inception-updated",
    };

    const updatedMovie = await updateMovie(
      movie._id.toString(),
      updatedMovieData
    );
    expect(updatedMovie).not.toBeNull();
  });

  // Test listMovies function
  it("should list all movies", async () => {
    const movie = new Movie({
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      streamingLink: "https://example.com/inception",
    });
    await movie.save();

    const movies = await listMovies();
    expect(movies).toHaveLength(1);
    expect(movies[0].title).toBe("Inception");
  });

  // Test searchMovies function
  it("should search for movies by title or genre", async () => {
    const movie = new Movie({
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      streamingLink: "https://example.com/inception",
    });
    await movie.save();

    const result = await searchMovies("Sci-Fi");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Inception");
  });

  // Test deleteMovie function
  it("should delete a movie", async () => {
    const movie = new Movie({
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      streamingLink: "https://example.com/inception",
    });
    await movie.save();

    await deleteMovie(movie._id.toString());

    const deletedMovie = await Movie.findById(movie._id);
    expect(deletedMovie).toBeNull();
  });
});
