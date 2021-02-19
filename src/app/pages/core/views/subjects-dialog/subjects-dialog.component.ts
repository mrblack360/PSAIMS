import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-subjects-dialog',
  templateUrl: './subjects-dialog.component.html',
  styleUrls: ['./subjects-dialog.component.css'],
})
export class SubjectsDialogComponent implements OnInit {
  subject: any = {};

  constructor(
    public dialogRef: MatDialogRef<SubjectsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.body) this.subject = data.body;
  }

  ngOnInit(): void {}
  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}
