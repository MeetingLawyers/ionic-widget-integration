import { Component } from '@angular/core';

declare var meetinglawyers: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  async ngOnInit() {
    
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
