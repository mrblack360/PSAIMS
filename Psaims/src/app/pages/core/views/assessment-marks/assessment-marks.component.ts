import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AssessmentMarksService } from 'src/app/shared/services/assessment-marks/assessment-marks.service';

@Component({
  selector: 'app-assessment-marks',
  templateUrl: './assessment-marks.component.html',
  styleUrls: ['./assessment-marks.component.css'],
})
export class AssessmentMarksComponent implements OnInit, AfterViewInit {
  assessment: any = {};
  marks: any = [];
  displayedColumns: string[] = [
    'sno',
    'first-name',
    'middle-name',
    'last-name',
    'marks',
  ];
  dataSource = new MatTableDataSource<any>(this.marks);
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  constructor(
    public assessmentMarksService: AssessmentMarksService,
    public dialogRef: MatDialogRef<AssessmentMarksComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.body) {
      this.assessment = data.body;
      this.assessmentMarksService
        .getAssessmentMarks(this.assessment.id)
        .subscribe(
          (data) => {
            this.marks = data;
            this.dataSource = new MatTableDataSource<any>(this.marks);
            this.dataSource.paginator = this.paginator;
          },
          (fail) => {
            this.marks = [];
          }
        );
    }
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<any>(this.marks);
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {}

  updateAssessmentMarks(index: number) {
    this.assessmentMarksService
      .updateAssessmentMarks({
        student: this.marks[index].id,
        assessment: this.assessment.id,
        marks: this.marks[index].marks,
      })
      .subscribe(
        (data) => console.log('Saved ' + this.marks[index].marks),
        (err) => console.log('Failed to save marks ' + this.marks[index].marks)
      );
  }
}
