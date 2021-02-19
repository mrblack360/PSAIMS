import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { SubjectsService } from 'src/app/shared/services/subjects/subjects.service';
import { SubjectsDialogComponent } from '../subjects-dialog/subjects-dialog.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css'],
})
export class SubjectsComponent implements OnInit, AfterViewInit {
  subjects: any = [];
  displayedColumns: string[] = [
    'sno',
    'name',
    'class',
    'subject-teacher',
    'action',
  ];
  dataSource = new MatTableDataSource<any>(this.subjects);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    public title: Title,
    private _snackbar: MatSnackBar,
    public subjectsService: SubjectsService,
    public dialog: MatDialog
  ) {
    this.title.setTitle('PSAIMS - Subjects');
    this.subjectsService.getSubjects().subscribe(
      (data) => {
        this.subjects = data;
        this.dataSource = new MatTableDataSource<any>(this.subjects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.subjects = [];
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.subjects);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  addSubject() {
    const dialogRef = this.dialog.open(SubjectsDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'Add Subject',
        body: '',
        editable: true,
        success: 'ADD',
        cancel: 'CANCEL',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'cancel')
        this._snackbar.open('Discarded...', 'OK', {
          horizontalPosition: 'right',
          duration: 2500,
        });
      else {
        this.subjectsService.addSubject(result).subscribe(
          (data) => {
            this.ngOnInit();
            this._snackbar.open('Creating ' + result.name + ' subject ', 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
            });
          },
          (err) => {
            console.log('Creating  failled');
          }
        );
      }
    });
  }
  viewSubject(index: number) {
    const dialogRef = this.dialog.open(SubjectsDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'View Subject',
        body: '',
        editable: false,
        success: 'OK',
        cancel: 'CANCEL',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'cancel')
        this._snackbar.open('Discarded...', 'OK', {
          horizontalPosition: 'right',
          duration: 2500,
        });
      else {
        this._snackbar.open('Viewed ' + result.name + ' subject ', 'OK', {
          horizontalPosition: 'right',
          duration: 2500,
        });
      }
    });
  }
  editSubject(index: number) {
    const dialogRef = this.dialog.open(SubjectsDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'Edit Subject',
        body: this.subjects[index],
        editable: true,
        success: 'EDIT',
        cancel: 'CANCEL',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'cancel')
        this._snackbar.open('Discarded...', 'OK', {
          horizontalPosition: 'right',
          duration: 2500,
        });
      else {
        this.subjectsService.addSubject(result).subscribe(
          (data) => {
            this.ngOnInit();
            this._snackbar.open('Updating ' + result.name + ' subject ', 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
            });
          },
          (err) => {
            console.log('Updating  failled');
          }
        );
      }
    });
  }
  deleteSubject(index: number) {
    this._snackbar.open(
      'Can not delete ' + this.subjects[index].name + ' at a moment',
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
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
