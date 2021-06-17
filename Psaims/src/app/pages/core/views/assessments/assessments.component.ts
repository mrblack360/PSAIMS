import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AssessmentsService } from 'src/app/shared/services/assessments/assessments.service';
import { AssessmentDialogComponent } from '../assessment-dialog/assessment-dialog.component';
import { AssessmentMarksComponent } from '../assessment-marks/assessment-marks.component';

@Component({
  selector: 'app-assessments',
  templateUrl: './assessments.component.html',
  styleUrls: ['./assessments.component.css'],
})
export class AssessmentsComponent implements OnInit, AfterViewInit {
  assessments: any = [];
  displayedColumns: string[] = [
    'sno',
    'name',
    'type',
    'subject',
    'date_created',
    'last_modified',
    'action',
  ];
  dataSource = new MatTableDataSource<any>(this.assessments);

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    public title: Title,
    private _snackbar: MatSnackBar,
    public assessmentService: AssessmentsService,
    public dialog: MatDialog
  ) {
    this.title.setTitle('PSAIMS - Assessments');
    this.assessmentService.getAssessments().subscribe(
      (data) => {
        this.assessments = data;
        this.dataSource = new MatTableDataSource<any>(this.assessments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.assessments = [];
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.assessments);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.assessmentService.getAssessments().subscribe(
      (data) => {
        this.assessments = data;
        this.dataSource = new MatTableDataSource<any>(this.assessments);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        this.assessments = [];
      }
    );
  }
  addAssessment() {
    const dialogRef = this.dialog.open(AssessmentDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'Add Assessment',
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
        this.assessmentService.addAssessment(result).subscribe(
          (data) => {
            this.ngOnInit();
            this._snackbar.open('Creating assessment' + result.name, 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
            });
          },
          (err) => {
            this._snackbar.open('Creating assesment failled', 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
            });
            console.log(err);
          }
        );
      }
    });
  }
  viewAssessment(index: number) {
    const dialogRef = this.dialog.open(AssessmentDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'View Assessment',
        body: this.assessments[index],
        editable: false,
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
        this._snackbar.open('Viewed assessment' + result.name, 'OK', {
          horizontalPosition: 'right',
          duration: 2500,
        });
      }
    });
  }
  editAssessment(index: number) {
    const dialogRef = this.dialog.open(AssessmentDialogComponent, {
      width: '70%',
      disableClose: true,
      data: {
        title: 'Edit Assessment',
        body: this.assessments[index],
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
        this.assessmentService.editAssessment(result).subscribe(
          (data) => {
            this.ngOnInit();
            this._snackbar.open('Updating assessment' + result.name, 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
            });
          },
          (err) => {
            this._snackbar.open('Updating assesment failled', 'OK', {
              horizontalPosition: 'right',
              duration: 2500,
            });
            console.log(err);
          }
        );
      }
    });
  }
  deleteAssessment(index: number) {
    this.assessmentService
      .deleteAssessment(this.assessments[index].id)
      .subscribe(
        (data) => {
          this.ngOnInit();
          this._snackbar.open('Deleted assessment successfully', 'OK', {
            horizontalPosition: 'right',
            duration: 2500,
          });
        },
        (err) => {
          this._snackbar.open('Deleting assesment failled', 'OK', {
            horizontalPosition: 'right',
            duration: 2500,
          });
          console.log(err);
        }
      );
  }
  addAssessmentMarks(index: number) {
    const dialogRef = this.dialog.open(AssessmentMarksComponent, {
      width: '100%',
      height: '80%',
      disableClose: true,
      data: {
        body: this.assessments[index],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this._snackbar.open(
        'Saving updated assessment marks for ' + result.name,
        'OK',
        {
          horizontalPosition: 'right',
          duration: 2500,
        }
      );
    });
  }
}
