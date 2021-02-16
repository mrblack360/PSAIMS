import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { MatSort } from '@angular/material/sort';
import { ClassesService } from 'src/app/shared/services/classes/classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css'],
})
export class ClassesComponent implements OnInit, AfterViewInit {
  classes: any = [];
  displayedColumns: string[] = [
    'sno',
    'name',
    'teacher',
    'studentsNo',
    'action',
  ];
  dataSource = new MatTableDataSource<any>(ELEMENT_DATA);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    public title: Title,
    private _snackbar: MatSnackBar,
    public classesService: ClassesService
  ) {
    this.title.setTitle('PSAIMS - Classes');
    this.classesService.getClasses().subscribe(
      (data) => {
        this.classes = data;
        this.dataSource = new MatTableDataSource<any>(this.classes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.classes = [];
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.classes);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.classesService.getClasses().subscribe(
      (data) => {
        this.classes = data;
        this.dataSource = new MatTableDataSource<any>(this.classes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.classes = [];
      }
    );
  }
  addClass() {
    this._snackbar.open('Can not add Class at a moment', 'OK', {
      duration: 3000,
      horizontalPosition: 'right',
    });
  }
  viewClass(index: number) {
    this._snackbar.open(
      'Can not view ' + ELEMENT_DATA[index].name + ' at a moment',
      'OK',
      {
        duration: 3000,
        horizontalPosition: 'right',
      }
    );
  }
  editClass(index: number) {
    this._snackbar.open(
      'Can not edit ' + ELEMENT_DATA[index].name + ' at a moment',
      'OK',
      {
        duration: 3000,
        horizontalPosition: 'right',
      }
    );
  }
  deleteClass(index: number) {
    this._snackbar.open(
      'Can not delete ' + ELEMENT_DATA[index].name + ' at a moment',
      'OK',
      {
        duration: 3000,
        horizontalPosition: 'right',
      }
    );
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
];
