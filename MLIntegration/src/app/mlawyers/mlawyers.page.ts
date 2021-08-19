import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NavController } from '@ionic/angular';

declare var meetinglawyers: any;

@Component({
  selector: 'app-mlawyers',
  templateUrl: './mlawyers.page.html',
  styleUrls: ['./mlawyers.page.scss'],
})
export class MlawyersPage implements OnInit {

  constructor(private androidPermissions: AndroidPermissions, private navController: NavController) { }

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

  navigate() {
    this.navController.navigateRoot('/home');
  }

}
