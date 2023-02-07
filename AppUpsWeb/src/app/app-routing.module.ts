import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './shared/menu/menu.component';
import { VerDashboardComponent } from './dashboard/pages/ver-dashboard/ver-dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard/:id',
    component: VerDashboardComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard/ddiazupseduec?img=https:%2F%2Fres.cloudinary.com%2Fdsayn9vmk%2Fimage%2Fupload%2Fv1674694275%2Fidpqxmtlsqhcyvv2ufne.jpg'
  },
  // {path: '',redirectTo: 'menu', pathMatch: 'full'},
  // {path: 'menu', component: MenuComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
