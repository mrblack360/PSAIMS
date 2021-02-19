import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { MatSort } from '@angular/material/sort';
import { ClassesService } from 'src/app/shared/services/classes/classes.service';
import { MatDialog } from '@angular/material/dialog';
import { ClassesDialogComponent } from '../classes-dialog/classes-dialog.component';

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
  dataSource = new MatTableDataSource<any>(this.classes);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    public title: Title,
    private _snackbar: MatSnackBar,
    public classesService: ClassesService,
    public dialog: MatDialog
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
    const dialogRef = this.dialog.open(ClassesDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'Add Class',
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
        this.classesService.addClass(result).subscribe(
          (data) => {
            this.ngOnInit();
            this._snackbar.open('Creating class' + result.name, 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
              panelClass: ['mat-accent', 'mat-warn'],
            });
          },
          (err) => {
            this._snackbar.open('Creating class failled', 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
            });
            console.log(err);
          }
        );
      }
    });
  }
  viewClass(index: number) {
    const dialogRef = this.dialog.open(ClassesDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'View Class',
        body: this.classes[index],
        editable: false,
        success: 'BACK',
        cancel: 'CANCEL',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'cancel')
        this._snackbar.open('Aborting view', 'OK', {
          horizontalPosition: 'right',
          duration: 2500,
        });
      else {
        this._snackbar.open('Viewed class' + result.name, 'OK', {
          horizontalPosition: 'right',
          duration: 2500,
        });
      }
    });
  }
  editClass(index: number) {
    const dialogRef = this.dialog.open(ClassesDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'Edit Class',
        body: this.classes[index],
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
        this.classesService.editClass(result).subscribe(
          (data) => {
            this.ngOnInit();
            this._snackbar.open('Creating class' + result.name, 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
              panelClass: ['mat-accent', 'mat-warn'],
            });
          },
          (err) => {
            this._snackbar.open('Editing class failled', 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
            });
            console.log(err);
          }
        );
      }
    });
  }
  // deleteClass(index: number) {
  //   this._snackbar.open(
  //     'Can not delete ' + ELEMENT_DATA[index].name + ' at a moment',
  //     'OK',
  //     {
  //       duration: 3000,
  //       horizontalPosition: 'right',
  //     }
  //   );
  // }
}
