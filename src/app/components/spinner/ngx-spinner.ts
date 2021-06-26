import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  template: `
    <ngx-spinner
      bdOpacity="0.9"
      bdColor="rgba(51, 51, 51,1)"
      size="default"
      type="ball-spin-clockwise"
    >
      <p class="">Please Wait...</p>
    </ngx-spinner>
  `,
})
export class NgxSpinnerComonent {
  constructor(private ngxspinner: NgxSpinnerService) {}
}
