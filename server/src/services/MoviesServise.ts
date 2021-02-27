import { resolve } from "path";
import csvtojson from 'csvtojson';
const csv = csvtojson();

export class MoviesService {
    private readonly _csvFilePath = resolve(__dirname, '../data', 'movies_middle.csv');
    private _movies: IMovie[];
    private _genres: string[];

    public async start(): Promise<void> {
        await this._setMoviesData();
    }

    public get movies(): IMovie[] {
        return [...this._movies];
    }

    public get getGenres() {
        return [...this._genres];
    }

    public getMovies({ genres, start, end }: IFilters = { }): IMovie[] {
        let result: IMovie[] = this.movies;

		if (start) {
            result = result.filter((item) => +item.year >= +start)
		}

		if (end) {
			result = result.filter((item) => +item.year <= +end)
		}

		if (genres) {
			result = this._filterByGenres(genres, result);
		}

		return result;
    }

    private _filterByGenres(genres: string[] | string, movies: IMovie[]): IMovie[] {
        let genresList = Array.isArray(genres) ? genres : [genres];
        genresList = genresList.map((item) => item?.toLowerCase().trim());

        try {
            const inExistantGenre = genresList.find((item) => !this._genres.includes(item));
            if (inExistantGenre) throw new Error(`There is now such genre: ${inExistantGenre}`);

            return movies.filter((item) => {
                let isSuitable: boolean = true;
                genresList.forEach((listmGenre) => {
                   if (!item.genres.includes(listmGenre)) isSuitable = false;
                })
                return isSuitable;
            })

        } catch(err) {
            if (err instanceof Error) throw err;
            else throw new Error("Error during filtering");
        }
    }

    private async _setMoviesData(): Promise<void> {
        try {
            this._movies = await csv.fromFile(this._csvFilePath);
            this._movies = this._movies.map((item) => {
                const result = { ...item };
                result.genres = result.genre?.toLowerCase().split(',').map((item) => item.trim());
                return result;
            })
            this._genres = this._movies.reduce((acc, curr) => {
                const genres = curr.genre.toLocaleLowerCase().split(',').map((item) => item.trim()).filter((item) => !acc.includes(item));
                return [...acc, ...genres];
            }, []);
        } catch (err) {
            if (err instanceof Error) throw err;
            else throw new Error("Error retrieving data from file");
        }
    }
}

export interface IMovie {
    id: string;
    name: string;
    genre: string;
    year: string;
    genres: string[];
}

export interface IFilters {
	genres?: string[] | string;
	start?: string;
	end?: string;
}