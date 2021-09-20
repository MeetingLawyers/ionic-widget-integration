import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IframeExamplePage } from './iframe-example.page';

const routes: Routes = [
  {
    path: '',
    component: IframeExamplePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IframeExamplePageRoutingModule {}
