import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/shared/services/student/student.service';
import { user } from '../../../../shared/global-variable';
import { ViewDialogComponent } from '../view-dialog/view-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit, AfterViewInit {
  user: { username?: string; role?: string } = {};
  students: any = [];
  displayedColumns: string[] = [
    'roll',
    'firstname',
    'middlename',
    'lastname',
    'gender',
    'class',
    'year',
    'action',
  ];
  dataSource = new MatTableDataSource<any>(this.students);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private _snackbar: MatSnackBar,
    public studentsService: StudentService,
    public dialog: MatDialog
  ) {
    this.studentsService.getStudents().subscribe(
      (data) => {
        this.students = data;
        this.dataSource = new MatTableDataSource<any>(this.students);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.students = [];
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.students);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.studentsService.getStudents().subscribe(
      (data) => {
        this.students = data;
        this.dataSource = new MatTableDataSource<any>(this.students);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        this.students = [];
      }
    );

    this.dataSource.paginator = this.paginator;
    this.user = user;
  }
  addStudent() {
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'Add Student',
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
        this.studentsService.addStudent(result).subscribe(
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
  viewStudent(index: number) {
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      width: '70%',
      disableClose: false,
      data: {
        title: 'View Student',
        body: this.students[index],
        editable: false,
        success: 'OK',
        cancel: 'BACK',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result)
        this._snackbar.open(
          'Viewed ' +
            this.students[index].firstName +
            ' ' +
            this.students[index].lastName,
          'OK',
          { horizontalPosition: 'right', duration: 2500 }
        );
    });
  }
  editStudent(index: number) {
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      width: '70%',
      disableClose: false,
      data: {
        title: 'Update Student Details',
        body: this.students[index],
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
        this.studentsService.editStudent(result).subscribe(
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
  deleteStudent(index: number) {
    this.studentsService.deleteStudent(this.students[index].id).subscribe(
      (data) => {
        this.ngOnInit();
        this._snackbar.open(
          'Deleting ' + this.students[index].firstName + ' details ',
          'OK',
          { horizontalPosition: 'right', duration: 2500 }
        );
      },
      (err) => {
        this._snackbar.open(
          'Deleting ' + this.students[index].firstName + ' failed ',
          'OK',
          { horizontalPosition: 'right', duration: 2500 }
        );
      }
    );
  }
}
