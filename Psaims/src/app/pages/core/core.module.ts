import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { CoreRoutingModule } from './core-routing.module';

// Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// NgChartjsModule
import { NgChartjsModule } from 'ng-chartjs';

import { DashboardComponent } from './views/dashboard/dashboard.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    NgChartjsModule,
    MatButtonModule,
    MatCardModule,
  ],
})
export class CoreModule {}
