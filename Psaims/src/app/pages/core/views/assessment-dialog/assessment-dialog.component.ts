import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-assessment-dialog',
  templateUrl: './assessment-dialog.component.html',
  styleUrls: ['./assessment-dialog.component.css'],
})
export class AssessmentDialogComponent implements OnInit {
  assessment: any = {};
  constructor(
    public dialogRef: MatDialogRef<AssessmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.body) this.assessment = data.body;
  }

  ngOnInit(): void {}
  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}
