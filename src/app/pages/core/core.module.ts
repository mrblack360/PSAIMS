import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, CoreRoutingModule],
})
export class CoreModule {}
