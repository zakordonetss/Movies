import { Router } from "express";
import { MoviesService } from "../services//MoviesServise";

const moviesService = new MoviesService();
moviesService.start();

export const MoviesController = Router()
    .get('/', (req, res) => {
        const movies = moviesService.read();
        res.status(200).send(movies);
    })
    .put('/sort/year/:info', (req, res) => {
        // info === descending or ascending
        const { info } = req.params;
        const movies = moviesService.sortByYears(info);
        res.status(201).send(movies);
    })
    .put('/filter/years/:year', (req, res) => {
        const { year } = req.params;
        const movies = moviesService.filterByYear(year);
        res.status(201).send(movies);
    })
    .put('/filter/gener/:gener', (req, res) => {
        const { gener } = req.params;
        const movies = moviesService.filterByGenre(gener);
        res.status(201).send(movies);
    })
    // .put('/filter/genres/:gener1.:gener2', (req, res) => {
    //     const { genres } = req.params;
    //     const movies = moviesService.filterByGenres(genres);
    //     res.status(201).send(movies);
    // })