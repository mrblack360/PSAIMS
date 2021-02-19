import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { CoreRoutingModule } from './core-routing.module';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// NgChartjsModule
import { NgChartjsModule } from 'ng-chartjs';

import { DashboardComponent } from './views/dashboard/dashboard.component';
import { StudentsComponent } from './views/students/students.component';
import { TeachersComponent } from './views/teachers/teachers.component';
import { ClassesComponent } from './views/classes/classes.component';
import { SubjectsComponent } from './views/subjects/subjects.component';
import { AssessmentsComponent } from './views/assessments/assessments.component';
import { ReportsComponent } from './views/reports/reports.component';
import { ViewDialogComponent } from './views/view-dialog/view-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { TeacherViewDialogComponent } from './views/teacher-view-dialog/teacher-view-dialog.component';
import { ClassesDialogComponent } from './views/classes-dialog/classes-dialog.component';
import { SubjectsDialogComponent } from './views/subjects-dialog/subjects-dialog.component';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    StudentsComponent,
    TeachersComponent,
    ClassesComponent,
    SubjectsComponent,
    AssessmentsComponent,
    ReportsComponent,
    ViewDialogComponent,
    TeacherViewDialogComponent,
    ClassesDialogComponent,
    SubjectsDialogComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgChartjsModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSortModule,
    FormsModule,
    MatDialogModule,
  ],
})
export class CoreModule {}
