import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.css'],
})
export class ViewDialogComponent implements OnInit {
  student: {
    id?: number;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    gender?: string;
    class?: number;
  } = {};
  constructor(
    public dialogRef: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.body) this.student = data.body;
  }

  ngOnInit(): void {}
  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}
