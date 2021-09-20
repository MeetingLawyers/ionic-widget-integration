import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMLIframeTracking]'
})
export class MLIframeTrackingDirective {

  element: ElementRef

  constructor(el: ElementRef) {
    this.element = el;
  }

  @HostListener('load')
  onIframeIsLoaded() {
    // add meetinglawyers event listener
    this.element.nativeElement.contentDocument.addEventListener("meetingLawyers", e => this.meetingLawyersEventHandler(e), false);
  }

  meetingLawyersEventHandler(event) {
    // send event to parent
    var newEvent = new CustomEvent(event.type, { 'detail': event.detail })
    document.dispatchEvent(newEvent);
  }

  setWidgetPermissions(audioVideoValue: string) {
    this.element.nativeElement.contentWindow.meetinglawyers.setWidgetPermissions({audioVideo : audioVideoValue})
  }
}
