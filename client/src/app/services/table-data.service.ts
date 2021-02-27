import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
    public startYear: string = '';
    public lastYear: string = '';

    constructor(private http: HttpClient) {}

    public async getMovies(PATH: string): Promise<IMovie[]> {
        try {
            const result = await this.http.get<IMovie[]>(PATH)
                .toPromise()
            return result;

        } catch (err) {
            if (err instanceof Error) throw err;
            else throw new Error("Error during getting movies");
        }
    }

    public async getGenres(PATH: string): Promise<string[]> {
        try {
            const result = await this.http.get<string[]>(PATH)
                .toPromise()
            return result;

        } catch (err) {
            if (err instanceof Error) throw err;
            else throw new Error("Error during getting geners");
        }
    }

    public getReqPath(PATH: string): string {
        let reqPath: string = PATH + '?'

        if (this.startYear) {
            reqPath = reqPath + '&start=' + this.startYear;
        }

        if (this.lastYear) {
            reqPath = reqPath + '&end=' + this.lastYear;
        }

        return reqPath;
    }
}

export interface IMovie {
    id: string;
    name: string;
    genre: string;
    year: string;
    genres: string[];
}
