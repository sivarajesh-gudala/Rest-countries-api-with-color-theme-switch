import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-ip-address-tracker',
  templateUrl: './ip-address-tracker.component.html',
  styleUrls: ['./ip-address-tracker.component.scss'],
})
export class IpAddressTrackerComponent implements OnInit {
  map: any;
  longitudePosition: any;
  latitudePosition: any;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    // this.apiService.getMapLocation().subscribe((res) => {
    //   console.log(res);
    // });
    this.getLocation();
    this.getMap();
  }

  getMap() {}

  getLocation(): void {
    if (!navigator.geolocation) {
      console.log('no location ');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      this.longitudePosition = position.coords.longitude;
      this.latitudePosition = position.coords.latitude;
      console.log(this.longitudePosition, this.latitudePosition);
      this.map = L.map('map').setView(
        [this.latitudePosition, this.longitudePosition],
        13
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 18,
      }).addTo(this.map);

      var LeafIcon = new L.Icon({
        // iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
        iconUrl: '../../../assets/ip-address/icon-location.svg',
        iconSize: [20, 20],
      });
      L.marker([this.latitudePosition, this.longitudePosition], {
        icon: LeafIcon,
      })
        .addTo(this.map)
        .openPopup();
    });
    // this.watchPosition();
  }

  // watchPosition() {
  //   let desLat = 0;
  //   let desLong = 0;
  //   let id = navigator.geolocation.watchPosition(
  //     (position) => {
  //       console.log(position.coords.latitude, position.coords.longitude);
  //       if (position.coords.latitude === desLat) {
  //         navigator.geolocation.clearWatch(id);
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 5000,
  //       maximumAge: 0,
  //     }
  //   );
  // }
}
