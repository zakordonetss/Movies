import {Component, OnInit, ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MOVIES_PATH, GENRES_PATH } from 'src/app/units/config';
import { IMovie, TableDataService } from '../services/table-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit {
    public dataSource: MatTableDataSource<IMovie> = new MatTableDataSource();
    public displayedColumns: string[] = ['id', 'name', "genre", 'year'];
    public pageEvent: PageEvent;
    public pageSize = 10;
    public currentPage = 0;
    public totalSize;
    public genresReq = new FormControl();
    
    private _movies: IMovie[];
    private _genres: string[];

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(public tableDataService: TableDataService) {}

    public async ngOnInit() {
        this._movies = await this.tableDataService.getMovies(MOVIES_PATH);
        this._genres = await this.tableDataService.getGenres(GENRES_PATH);
        this._iterator()
    }

    public async filterHandle() {
        const reqPath = this.tableDataService.getReqPath(MOVIES_PATH);
        const reqpPathWithGenres = this._getReqPathWithGenres(reqPath)
        this._movies = await this.tableDataService.getMovies(reqpPathWithGenres);
        this._iterator();
    }

    public get moviesGenres() {
        return this._genres;
    }

    public handlePage(e: any): PageEvent {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this._iterator();
        return
    }

    private _getReqPathWithGenres (reqPath: string): string {
        const reqGenres: string[] = this.genresReq.value;

        if (reqGenres) {
            reqGenres.forEach((item) => reqPath = reqPath + '&genres=' + item.toLowerCase())
        }

        return reqPath;
    }

    private _iterator() {
        const end = (this.currentPage + 1) * this.pageSize;
        const start = this.currentPage * this.pageSize;
        const part = this._movies.slice(start, end);
        this.totalSize = this._movies.length;
        this.dataSource.data = part;
    }
};
