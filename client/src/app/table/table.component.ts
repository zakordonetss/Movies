import { HttpClient } from '@angular/common/http';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})


export class TableComponent implements OnInit, OnDestroy {

    public dataSource: MatTableDataSource<IMovie> = new MatTableDataSource();
    private _sub: Subscription;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this._sub = this.http.get<IMovie[]>('http://localhost:3535/movies')
            .subscribe(data => {
                this.dataSource.data = data;
            })
    }

    ngOnDestroy() {
        this._sub.unsubscribe();
    }

    displayedColumns: string[] = ['id', 'name', "genre", 'year'];
};

export interface IMovie {
    id: string;
    name: string;
    genre: string;
    year: string;
};
