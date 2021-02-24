import { resolve } from "path";

import csvtojson from 'csvtojson';

const csv = csvtojson();

export class MoviesService {
    private readonly _csvFilePath = resolve(__dirname, '../data', 'movies22.csv');
    private _movies: IMovie[];
    private _genres: string[];

    public async start(): Promise<void> {
        this._setMoviesData();
    }

    public read(): IMovie[] {
        return this._movies;
    }

    public sortByYears(info: string): IMovie[] {
        try {
            this._movies.sort((a, b) => {
                const first = a.year;
                const second = b.year;

                if (typeof first === 'string' && typeof second === 'string') {
                    switch (info) {
                        case 'descending':
                            return second.localeCompare(first);
                        case 'ascending':
                            return first.localeCompare(second);
                        default: throw new Error("Invalid sorting info");
                    }
                }
                if (typeof first === 'number' && typeof second === 'number') {
                    switch (info) {
                        case 'descending':
                            return second - first;
                        case 'ascending':
                            return first - second;
                        default: throw new Error("Invalid sorting info");
                    }
                }
            })
            return this._movies;

        } catch(err) {
            if (err instanceof Error) throw err;
            else throw new Error("Error during sorting");
        }
    }

    public filterByYear(year: string): IMovie[] {
        try {
            const filmes = this._movies.filter((movie: IMovie) => movie.year === year)

            if (filmes.length === 0) throw new Error("Invalin films year");

            return filmes;

        } catch(err) {
            if (err instanceof Error) throw err;
            else throw new Error("Error during filtering");
        }
    }

    public filterByGenre() {
        
    }

    private _setMoviesData(): void {
        csv
            .fromFile(this._csvFilePath)
            .then((jsonData) => {
                const filteredJsonData = jsonData.filter(i => i.id && i.name && i.genre && i.year);
                this._movies = filteredJsonData;
                return filteredJsonData;
            })
            .then((movies: IMovie[]) => {
                this._genres = movies.reduce((acc, curr) => {
                    const genres = curr.genre.split(',').map((item) => item.trim()).filter((item) => !acc.includes(item));
                    return [...acc, ...genres];
	            }, []);
            })
    }
}

export interface IMovie {
    id: string;
    name: string;
    genre: string;
    year: string;
}

export type SortKey = keyof IMovie;