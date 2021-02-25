import { HttpClient } from '@angular/common/http';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})


export class TableComponent implements OnInit, OnDestroy {

    public dataSource: MatTableDataSource<IMovie> = new MatTableDataSource();
    private _movies: IMovie[];
    private _sub: Subscription;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this._sub = this.http.get<IMovie[]>('http://localhost:3535/movies')
            .subscribe(data => {
                this._movies = data;
                this.iterator();
            })
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

    public yearValue: string = ''

    public filterYears(event: Event) {
        console.log(event);
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    displayedColumns: string[] = ['id', 'name', "genre", 'year'];

    public pageEvent: PageEvent;
    public pageSize = 10;
    public currentPage = 1;
    public totalSize;

    public handlePage(e: any): PageEvent {
        this.currentPage = e.pageIndex;
        this.pageSize = e.pageSize;
        this.iterator();
        return
    }

    private iterator() {
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
};
