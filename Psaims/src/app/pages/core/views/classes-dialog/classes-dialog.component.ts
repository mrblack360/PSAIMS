import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-classes-dialog',
  templateUrl: './classes-dialog.component.html',
  styleUrls: ['./classes-dialog.component.css'],
})
export class ClassesDialogComponent implements OnInit {
  _class: any = {};
  constructor(
    public dialogRef: MatDialogRef<ClassesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.body) this._class = data.body;
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}
