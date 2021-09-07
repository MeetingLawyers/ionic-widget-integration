import { Component, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';


declare var meetinglawyers: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private androidPermissions: AndroidPermissions, public platform: Platform) { }

  async ngOnInit() {
    this.initWidget()
  }

  initWidget() {
    meetinglawyers.initialize({
      apiKey: '<API_KEY>',
      displayMode: 'contained',
      containerId: "meetingLawyersRender",
      language: 'es',
      template: 'beauty',
      isEmbeddedApp: true,
      jwt: '<AUTHENTICATION_JWT>',
    });

    if (this.platform.is("android")) {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => this.updateWidgetPermissions(result.hasPermission),
        err => {}
      );
  
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
        result => this.updateWidgetPermissions(result.hasPermission),
        err => {}
      );
    }
  }

  @HostListener('document:meetingLawyers', ['$event', '$event.detail.type'])
  onDocumentKeyUp2(event: CustomEvent, type: string) {
    console.log("HOST LISTENER TRES!!! ");
    console.log(event)
    console.log(type)
    switch (type) {
      case "videocall-action":
        this.requestCameraPermissions();
        break;
      default:
        break;
    }
  }

  @HostListener('document:meetinglawyers-initialized', ['$event'])
  onDocumentKeyUp3(event: CustomEvent) {
    console.log("HOST LISTENER CUATRO!!! ");
    console.log(event)
  }

  requestCameraPermissions() {
    if (this.platform.is("android")) {
      // Android permissions
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => this.updateWidgetPermissions(result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
      );
  
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
        result => this.updateWidgetPermissions(result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO)
      );
      
      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS]);
    } else if (this.platform.is("ios")) {
      // iOS permissions
      this.updateWidgetPermissions(true)
    }
  }

  updateWidgetPermissions(allowed: boolean) {
    if (allowed) {
      meetinglawyers.setWidgetPermissions({audioVideo : "allowed"})
    } else {
      meetinglawyers.setWidgetPermissions({audioVideo : "not-allowed"})
    }
  }
}
