import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

// Reports
import { assessmentReports, periodicReports } from './reports';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  reports!: any[2][];
  constructor(private _title: Title, private _snackbar: MatSnackBar) {
    this._title.setTitle('PSAIMS - Reports');
    this.reports = [0, 1];
    this.reports[0] = [];
    this.reports[1] = [];
    this.reports[0] = assessmentReports;
    this.reports[1] = periodicReports;
  }

  ngOnInit(): void {}
  viewReport(array: number, index: number) {
    this._snackbar.open(
      'Can not view ' + this.reports[array][index].name + ' at a moment',
      'OK',
      {
        duration: 3000,
        horizontalPosition: 'right',
      }
    );
  }
  printReport(array: number, index: number) {
    this._snackbar.open(
      'Can not print ' + this.reports[array][index].name + ' at a moment',
      'OK',
      {
        duration: 3000,
        horizontalPosition: 'right',
      }
    );
  }
  exportReport(array: number, index: number) {
    this._snackbar.open(
      'Can not export ' + this.reports[array][index].name + ' at a moment',
      'OK',
      {
        duration: 3000,
        horizontalPosition: 'right',
      }
    );
  }
}
