import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-ip-address-tracker',
  templateUrl: './ip-address-tracker.component.html',
  styleUrls: ['./ip-address-tracker.component.scss'],
})
export class IpAddressTrackerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getMap();
  }

  getMap() {
    // var map = L.map('map').setView([51.505, -0.09], 13);
  }
}
