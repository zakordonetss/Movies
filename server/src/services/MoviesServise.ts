import { resolve } from "path";

import csvtojson from 'csvtojson';

const csv = csvtojson();

export class MoviesService {
    private readonly _csvFilePath = resolve(__dirname, '../data', 'movies22.csv');
    private _movies: IMovie[];

    public start(): void {
        this._parserFiterCsv();
    }

    public read(): IMovie[] {
        return this._movies;
    }

    private _parserFiterCsv(): void {
        csv
            .fromFile(this._csvFilePath)
            .then((jsonData) => {
                const filteredJsonData = jsonData.filter(i => i.id && i.name && i.genre && i.year);
                this._movies = filteredJsonData;
            })
    }
}

export interface IMovie {
    id: string;
    name: string;
    genre: string;
    year: string;
}