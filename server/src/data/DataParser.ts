import { MoviesService } from "../services//MoviesServise";

const moviesService = new MoviesService();

export function dataParser() {
    console.log('start parser');

    moviesService.start();
}