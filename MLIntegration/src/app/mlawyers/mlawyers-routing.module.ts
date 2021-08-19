import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MlawyersPage } from './mlawyers.page';

const routes: Routes = [
  {
    path: '',
    component: MlawyersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MlawyersPageRoutingModule {}
