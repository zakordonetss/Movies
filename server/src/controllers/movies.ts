import { Router } from "express";
import { MoviesService } from "../services//MoviesServise";

const moviesService = new MoviesService();
moviesService.start();

export const MoviesController = Router()
    .get('/movies', (req, res) => {
        const result = moviesService.getMovies(req.query);
        res.status(200).send(result);
    })