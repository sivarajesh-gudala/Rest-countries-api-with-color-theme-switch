import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() changeColor = false;
  constructor() {}

  ngOnInit(): void {}

  onChange(): void {
    this.changeColor = !this.changeColor;
  }
}
