import { Router } from "express";
import { MoviesService } from "../services//MoviesServise";

const moviesService = new MoviesService();
moviesService.start();

export const MoviesController = Router()
    .get('/', (req, res) => {
        const movies = moviesService.read();
        res.status(200).send(movies);
    })
    .get('/sort/year/:info', (req, res) => {
        // info === descending or ascending
        const { info } = req.params;
        const movies = moviesService.sortByYears(info);
        if (movies) res.status(200).send(movies);
        else res.status(404).send('Movies not found');
    })
    .get('/filter/years/:year', (req, res) => {
        const { year } = req.params;
        const movies = moviesService.filterByYear(year);
        if (movies) res.status(200).send(movies);
        else res.status(404).send('Movies not found');
    })
    .get('/filter/gener/:gener', (req, res) => {
        const { gener } = req.params;
        const movies = moviesService.filterByGenre(gener);
        if (movies) res.status(200).send(movies);
        else res.status(404).send('Movies not found');
    })
    .get('/filter/genres', (req, res) => {
        const genres: string[] = Object.values(req.query).toString().split(',');
        const movies = moviesService.filterByGenres(genres);
        if (movies) res.status(200).send(movies);
        else res.status(404).send('Movies not found');
    })