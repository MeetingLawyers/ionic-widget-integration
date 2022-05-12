import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  // CHANGE FIRST PAGE:
  {
    path: '',
    redirectTo: 'iframe-example',
    pathMatch: 'full'
  },
  {
    path: 'iframe-example',
    loadChildren: () => import('./iframe-example/iframe-example.module').then( m => m.IframeExamplePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
