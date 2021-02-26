import { HttpClient } from '@angular/common/http';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, OnDestroy {
    public dataSource: MatTableDataSource<IMovie> = new MatTableDataSource();
    private _movies: IMovie[];
    private _genres: string[];
    private _sub: Subscription;

    public get moviesGenres() {
        return this._genres;
    }

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this._sub = this.http.get<IMovie[]>('http://localhost:3535/movies')
            .subscribe(data => {
                this._movies = data;
                this._iterator();
            });

        this._sub = this.http.get<string[]>('http://localhost:3535/genres')
            .subscribe(data => {
                this._genres = data.map(item => item = item[0].toUpperCase() + item.slice(1, item.length));
            })
    }

    ngOnDestroy() {
        this._sub.unsubscribe()
    }

    public genresReq = new FormControl();
    public startYear: string = '';
    public lastYear: string = '';

    public filterHandle() {
        let reqPath: string = 'http://localhost:3535/movies?'
        const reqGenres: string[] = this.genresReq.value;

        if (reqGenres) {
            reqGenres.forEach((item) => reqPath = reqPath + '&genres=' + item.toLowerCase())
        }

        if (this.startYear) {
            reqPath = reqPath + '&start=' + this.startYear;
        }

        if (this.lastYear) {
            reqPath = reqPath + '&end=' + this.lastYear;
        }

        this._sub.unsubscribe();
        return this._sub = this.http.get<IMovie[]>(reqPath)
            .subscribe(data => {
                this._movies = data;
                this._iterator()
            })
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['id', 'name', "genre", 'year'];

    public pageEvent: PageEvent;
    public pageSize = 10;
    public currentPage = 0;
    public totalSize;

    public handlePage(e: any): PageEvent {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this._iterator();
        return
    }

    private _iterator() {
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        const part = this._movies.slice(start, end);
        this.totalSize = this._movies.length;
        this.dataSource.data = part;
    }
};

export interface IMovie {
    id: string;
    name: string;
    genre: string;
    year: string;
    genres: string[];
}
