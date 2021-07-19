import { Component } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

declare var meetinglawyers: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private androidPermissions: AndroidPermissions) { }

  async ngOnInit() {
    
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => this.initWidget(),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    );

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
      result => this.initWidget(),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS]);

    this.initWidget()
  }

  initWidget() {
    meetinglawyers.initialize({
      apiKey: '<API_KEY>',
      displayMode: 'contained',
      containerId: "meetingLawyersRender",
      language: 'es',
      template: 'beauty',
      jwt: '<AUTHENTICATION_JWT>',
    });
  }
}
