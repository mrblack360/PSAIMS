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

@NgModule({
  declarations: [HomeComponent, DashboardComponent, StudentsComponent, TeachersComponent, ClassesComponent, SubjectsComponent],
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
  ],
})
export class CoreModule {}
