import request from "supertest";
import app from "../../app";
import { Movie } from "../../models/movie.model";
import mongoose from "mongoose";

beforeAll(async () => {
  const url = "mongodb://localhost:27017/movieLobbyTest";
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(url);
  }
});

afterEach(async () => {
  await Movie.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Movies API", () => {
  // Test GET /movies - List all movies

  beforeEach(async () => {
    await Movie.deleteMany({});
  });
  it("should list all movies", async () => {
    const movie = new Movie({
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      streamingLink: "https://example.com/inception",
    });
    await movie.save();

    const response = await request(app).get("/movies");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("Inception");
  });

  // Test GET /search?q={query} - Search for movies by title or genre
  it("should search for movies by title or genre", async () => {
    const movie = new Movie({
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      streamingLink: "https://example.com/inception",
    });
    await movie.save();

    const response = await request(app).get("/search?q=Sci-Fi");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe("Inception");
  });

  // Test POST /movies - Add a new movie (admin required)
  it("should add a new movie when user is admin", async () => {
    const newMovie = {
      title: "Interstellar",
      genre: "Sci-Fi",
      rating: 9.0,
      streamingLink: "https://example.com/interstellar",
    };

    const response = await request(app)
      .post("/movies")
      .set("x-role", "admin")
      .send(newMovie);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Interstellar");
  });

  it("should return 403 if user is not admin", async () => {
    const newMovie = {
      title: "Interstellar",
      genre: "Sci-Fi",
      rating: 9.0,
      streamingLink: "https://example.com/interstellar",
    };

    const response = await request(app)
      .post("/movies")
      .set("x-role", "user")
      .send(newMovie);

    expect(response.status).toBe(403);
  });

  // Test PUT /movies/:id - Update movie details
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

    const response = await request(app)
      .put(`/movies/${movie._id}`)
      .set("x-role", "admin")
      .send(updatedMovieData);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Inception Updated");
  });

  // Test DELETE /movies/:id - Delete a movie
  it("should delete a movie", async () => {
    const movie = new Movie({
      title: "Inception",
      genre: "Sci-Fi",
      rating: 8.8,
      streamingLink: "https://example.com/inception",
    });
    await movie.save();

    const response = await request(app)
      .delete(`/movies/${movie._id}`)
      .set("x-role", "admin");

    expect(response.status).toBe(204);
  });
});
