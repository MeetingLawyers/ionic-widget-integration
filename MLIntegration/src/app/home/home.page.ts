import { Component, HostListener } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Device } from '@ionic-native/device/ngx';


declare var meetinglawyers: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private androidPermissions: AndroidPermissions, 
              public platform: Platform, 
              private device: Device) { }

  async ngOnInit() {
    this.initWidget()
  }

  // *** WIDGET ***

  initWidget() {
    meetinglawyers.initialize({
      apiKey: '<API_KEY>',
      displayMode: 'contained',
      containerId: "meetingLawyersRender",
      // loginEmail: [],
      template: 'beauty',
      language: 'es',
      isEmbeddedApp: true,
      jwt: '<AUTHENTICATION_JWT>',
    });
  }

  // Widget event handler
  @HostListener('document:meetingLawyers', ['$event', '$event.detail.type'])
  meetingLawyersEventHandler(event: CustomEvent, type: string) {
    switch (type) {
      case "videocall-action":
        // Triggered when the widget needs camera permissions
        this.requestCameraPermissions();
        break;
      case "initialized":
        // Triggered when the widget is loaded
        this.checkPermissions();
        break;
      case "register-token":
        // Used in JWT integrations
        this.checkPermissions();
        break;
      default:
        break;
    }
  }

  updateWidgetPermissions(allowed: boolean, suported = true) {
    var audioVideoValue = "not-allowed";
    if (allowed) {
      audioVideoValue = "allowed"
    }
    if (!suported) {
      audioVideoValue = "not-suported"
    }

    meetinglawyers.setWidgetPermissions({audioVideo : audioVideoValue})
  }

  // *** PERMISSIONS ***

  checkPermissions() {
    if (this.platform.is("android")) {
      this.checkAndroidPermissions()
    } else if (this.platform.is("ios")) {
      this.checkIOSPermissions()
    } else {
      this.updateWidgetPermissions(true);
    }
  }

  requestCameraPermissions() {
    if (this.platform.is("android")) {
      this.requestAndroidPermissions()
    } else if (this.platform.is("ios")) {
      this.requestIOSPermissions()
    } else {
      this.updateWidgetPermissions(true);
    }
  }

  // *** ANDROID PERMISSIONS ***

  checkAndroidPermissions() {
    if (!this.platform.is("android")) return;

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => this.updateWidgetPermissions(result.hasPermission),
      err => {}
    );

    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.RECORD_AUDIO).then(
      result => this.updateWidgetPermissions(result.hasPermission),
      err => {}
    );
  }

  requestAndroidPermissions() {
    if (!this.platform.is("android")) return;
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.RECORD_AUDIO, this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS]).then(
      success => {
        this.updateWidgetPermissions(success);
      },
      err => this.updateWidgetPermissions(false)
    ); 
  }

  // *** IOS PERMISSIONS ***

  checkIOSPermissions() {
    if (!this.platform.is("ios")) return;

    if (this.compareVersion(this.device.version, "14.5") >= 0) {
      // iOS permissions
      this.updateWidgetPermissions(true)
    } else {
      // Not suported
      this.updateWidgetPermissions(false, false)
    }
  }

  requestIOSPermissions() {
    this.checkIOSPermissions()
  }

  // *** HELPER ***

  compareVersion(v1, v2) {
    if (typeof v1 !== 'string') return false;
    if (typeof v2 !== 'string') return false;
    v1 = v1.split('.');
    v2 = v2.split('.');
    const k = Math.min(v1.length, v2.length);
    for (let i = 0; i < k; ++ i) {
        v1[i] = parseInt(v1[i], 10);
        v2[i] = parseInt(v2[i], 10);
        if (v1[i] > v2[i]) return 1;
        if (v1[i] < v2[i]) return -1;        
    }
    return v1.length == v2.length ? 0: (v1.length < v2.length ? -1 : 1);
  }
}
