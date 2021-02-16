import { Component, Inject, OnInit } from '@angular/core';
import { Teacher } from '../teachers/teachers.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-teacher-view-dialog',
  templateUrl: './teacher-view-dialog.component.html',
  styleUrls: ['./teacher-view-dialog.component.css'],
})
export class TeacherViewDialogComponent implements OnInit {
  teacher: Teacher = {};

  constructor(
    public dialogRef: MatDialogRef<TeacherViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.body) this.teacher = data.body;
  }

  ngOnInit(): void {}

  onCancelClick(): void {
    this.dialogRef.close('cancel');
  }
}
