import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { NotFoundComponent } from '../not-found/not-found.component';
import { AssessmentsComponent } from './views/assessments/assessments.component';
import { ClassesComponent } from './views/classes/classes.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HomeComponent } from './views/home/home.component';
import { ReportsComponent } from './views/reports/reports.component';
import { StudentsComponent } from './views/students/students.component';
import { SubjectsComponent } from './views/subjects/subjects.component';
import { TeachersComponent } from './views/teachers/teachers.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'teachers', component: TeachersComponent },
      { path: 'classes', component: ClassesComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'assessments', component: AssessmentsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
