import { Router } from "express";
import { MoviesService } from "../services//MoviesServise";

const moviesService = new MoviesService();
moviesService.start();

export const MoviesController = Router()
    .get('/', (req, res) => {
        const json = moviesService.read();
        res.status(200).send(json);
    })