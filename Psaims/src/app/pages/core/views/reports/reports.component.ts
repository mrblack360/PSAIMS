import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { AssessmentMarksService } from 'src/app/shared/services/assessment-marks/assessment-marks.service';

// Reports
import { assessmentReports, periodicReports } from './reports';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  reports!: any[2][];
  body: any[][] = [];

  constructor(
    private _title: Title,
    private _snackbar: MatSnackBar,
    public assessmentMarksService: AssessmentMarksService
  ) {
    this._title.setTitle('PSAIMS - Reports');
    this.reports = [0, 1];
    this.reports[0] = assessmentReports;
    this.reports[1] = periodicReports;
    this.populateAssessmentTableData(1);
  }

  ngOnInit(): void {}
  viewReport(array: number, index: number) {
    if (array === 0) {
      // Checking if it's assessment report
      switch (index) {
        case 0:
          {
            pdfMake.createPdf(this.contentDefinition(0)).open();
          }
          break;

        default:
          {
            this._snackbar.open(
              'Can not print ' +
                this.reports[array][index].name +
                ' at a moment',
              'OK',
              {
                duration: 3000,
                horizontalPosition: 'right',
              }
            );
          }
          break;
      }
    }
  }
  printReport(array: number, index: number) {
    if (array === 0) {
      // Checking if it's assessment report
      switch (index) {
        case 0:
          {
            pdfMake.createPdf(this.contentDefinition(0)).print();
          }
          break;

        default:
          {
            this._snackbar.open(
              'Can not print ' +
                this.reports[array][index].name +
                ' at a moment',
              'OK',
              {
                duration: 3000,
                horizontalPosition: 'right',
              }
            );
          }
          break;
      }
    }
  }
  exportReport(array: number, index: number) {
    if (array === 0) {
      // Checking if it's assessment report
      switch (index) {
        case 0:
          {
            pdfMake.createPdf(this.contentDefinition(0)).download();
          }
          break;

        default:
          {
            this._snackbar.open(
              'Can not export ' +
                this.reports[array][index].name +
                ' at a moment',
              'OK',
              {
                duration: 3000,
                horizontalPosition: 'right',
              }
            );
          }
          break;
      }
    }
  }
  populateAssessmentTableData(index: number) {
    this.body[0] = [
      'Student ID',
      'Fist Name',
      'Middle Name',
      'Last Name',
      'Marks (%)',
      'Grade',
    ];
    this.assessmentMarksService.getAssessmentMarks(index).subscribe(
      (data) => {
        for (let i = 0; i < data.length; i++) {
          let row = [];
          row[0] = data[i].id;
          row[1] = data[i].firstName;
          row[2] = data[i].middleName;
          row[3] = data[i].lastName;
          row[4] = data[i].marks;
          if (data[i].mark >= 80) row[5] = 'A';
          else if (data[i].marks >= 60) row[5] = 'B';
          else if (data[i].marks >= 40) row[5] = 'C';
          else if (data[i].marks >= 20) row[5] = 'D';
          else if (data[i].marks > 0) row[5] = 'F';
          else row[5] = 'INC';
          this.body[i + 1] = row;
        }
      },
      (err) => {}
    );
  }

  setSubtitle(assessment: any): string {
    return 'Assessment Report for History Test One Done On';
  }
  contentDefinition(index: number) {
    return {
      info: {
        title: this.setSubtitle('Report'),
        author: 'Maswi, MR <maswimrtz@gmail.com>',
      },
      content: [
        {
          text:
            'Primary School Academic Information Management Information System',
          style: 'header',
        },
        {
          text: this.setSubtitle('Report'),
          style: 'subheader',
        },
        {
          svg: '<svg width="300" height="25"></svg>',
          width: 150,
        },
        {
          table: {
            headerRows: 1,
            width: '1000',
            body: this.body,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 15,
          bold: true,
        },
        subheader: {
          fontSize: 13,
          bold: true,
        },
      },
      watermark: { text: 'PSAIMS', opacity: 0.2 },
    };
  }
}
