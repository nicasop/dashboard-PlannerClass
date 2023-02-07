import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerDashboardComponent } from './pages/ver-dashboard/ver-dashboard.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VerDashboardComponent
  ],
  exports: [
    VerDashboardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class DashboardModule { }
