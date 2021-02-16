import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TeacherService } from 'src/app/shared/services/teacher/teacher.service';
import { user } from '../../../../shared/global-variable';
import { TeacherViewDialogComponent } from '../teacher-view-dialog/teacher-view-dialog.component';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css'],
})
export class TeachersComponent implements OnInit, AfterViewInit {
  user: { username?: string; role?: string } = {};
  teachers: Teacher[] = [];
  displayedColumns: string[] = [
    'position',
    'firstname',
    'middlename',
    'lastname',
    'gender',
    'subject',
    'class',
    'action',
  ];
  dataSource = new MatTableDataSource<any>(this.teachers);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private _snackbar: MatSnackBar,
    public teacherService: TeacherService,
    public dialog: MatDialog
  ) {
    this.teacherService.getTeachers().subscribe(
      (data) => {
        this.teachers = data;
        this.dataSource = new MatTableDataSource<any>(this.teachers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.teachers = [];
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.teachers);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(
      (data) => {
        this.teachers = data;
        this.dataSource = new MatTableDataSource<any>(this.teachers);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.teachers = [];
      }
    );

    this.dataSource.paginator = this.paginator;
    this.user = user;
  }
  addTeacher() {
    const dialogRef = this.dialog.open(TeacherViewDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'Add Teacher',
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
        this.teacherService.addTeacher(result).subscribe(
          (data) => {
            this.ngOnInit();
            this._snackbar.open(
              'Enrolling ' + result.firstName + ' to class ' + result.class,
              'OK',
              { horizontalPosition: 'right', duration: 2500 }
            );
          },
          (err) => {
            console.log('Enrolling failled');
          }
        );
      }
    });
  }
  viewTeacher(index: number) {
    const dialogRef = this.dialog.open(TeacherViewDialogComponent, {
      width: '70%',
      disableClose: false,
      data: {
        title: 'View Teacher',
        body: this.teachers[index],
        editable: false,
        success: 'OK',
        cancel: 'BACK',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this._snackbar.open(
          'Viewed ' +
            this.teachers[index].firstName +
            ' ' +
            this.teachers[index].lastName,
          'OK',
          { horizontalPosition: 'right', duration: 2500 }
        );
    });
  }
  editTeacher(index: number) {
    const dialogRef = this.dialog.open(TeacherViewDialogComponent, {
      width: '70%',
      disableClose: false,
      data: {
        title: "Update Teacher's Details",
        body: this.teachers[index],
        editable: true,
        success: 'UPDATE',
        cancel: 'DISCARD',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == 'cancel')
        this._snackbar.open('Discarded...', 'OK', {
          horizontalPosition: 'right',
          duration: 2500,
        });
      else {
        this.teacherService.editTeacher(result).subscribe(
          (data) => {
            this.ngOnInit();
            this._snackbar.open(
              'Updating ' + result.firstName + ' details ',
              'OK',
              { horizontalPosition: 'right', duration: 2500 }
            );
          },
          (err) => {
            console.log('Updating failled');
          }
        );
      }
    });
  }
  deleteTeacher(index: number) {
    this.teacherService
      .deleteTeacher('' + this.teachers[index].userName)
      .subscribe(
        (data) => {
          this.ngOnInit();
          this._snackbar.open(
            'Deleting ' + this.teachers[index].firstName + ' details ',
            'OK',
            { horizontalPosition: 'right', duration: 2500 }
          );
        },
        (err) => {
          this._snackbar.open(
            'Deleting ' + this.teachers[index].firstName + ' failed ',
            'OK',
            { horizontalPosition: 'right', duration: 2500 }
          );
        }
      );
  }
}
export interface Teacher {
  userName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  avatar?: string;
  gender?: string;
  subject?: number;
  id?: number;
  name?: string;
  class?: number;
}
