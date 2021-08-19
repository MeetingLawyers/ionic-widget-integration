import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MlawyersPageRoutingModule } from './mlawyers-routing.module';

import { MlawyersPage } from './mlawyers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MlawyersPageRoutingModule
  ],
  declarations: [MlawyersPage]
})
export class MlawyersPageModule {}
