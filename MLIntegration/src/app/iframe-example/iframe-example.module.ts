import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IframeExamplePageRoutingModule } from './iframe-example-routing.module';

import { IframeExamplePage } from './iframe-example.page';

import { MLIframeTrackingDirective } from '../directives/mliframe-tracking.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IframeExamplePageRoutingModule
  ],
  declarations: [IframeExamplePage, MLIframeTrackingDirective]
})
export class IframeExamplePageModule {}
