import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DarkModeService } from 'angular-dark-mode';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';
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
  mapForm: FormGroup;
  darkModeStatus: boolean;
  ipAddress: any;
  country: any;
  timeZone: any;
  isp: any;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private tostr: ToastrService,
    private darkModeService: DarkModeService
  ) {
    this.mapForm = this.fb.group({
      ipaddress: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  ngOnInit(): void {
    this.getLocation();
    this.getDarkModeStatus();
  }

  /** storing Dark mode status */
  getDarkModeStatus(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.darkModeStatus = val;
    });
  }

  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position, position.timestamp);
        console.log(new Date());

        this.longitudePosition = position.coords.longitude;
        this.latitudePosition = position.coords.latitude;
        // console.log(this.longitudePosition, this.latitudePosition);
        this.mapLayer(
          position.coords.latitude,
          position.coords.longitude,
          '',
          ''
        );

        // this.watchPosition();
      });
    } else {
      this.tostr.error('Please switch on your GPS Location', '', {
        timeOut: 5000,
      });
      console.log('No Location');
    }
  }

  // setting Map Layer based on latitude and longitude
  mapLayer(latPos, longPos, region, city): void {
    // map initialization
    this.map = L.map('map').setView([latPos, longPos], 13);

    // console.log(this.map);
    // console.log(this.map._lastCenter.lat, this.map._lastCenter.lng);
    // console.log(
    //   this.map.NewClass.lastCenter.LatLng.lng,
    //   this.map.NewClass.lastCenter.LatLng.lat
    // );

    // Map Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // marker Icon
    var LeafIcon = new L.Icon({
      // iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
      iconUrl: '../../../assets/ip-address/icon-location.svg',
      iconSize: [30, 40],
    });

    //Marker
    var marker = L.marker([latPos, longPos], {
      icon: LeafIcon,
      draggable: true,
    });

    var popUp = marker.bindPopup('' + marker.getLatLng()).openPopup();
    popUp.addTo(this.map);

    var my_map = document.getElementById('map');
    this.map.on('mousemove', (e) => {
      document.getElementsByClassName(
        'coordinate'
      )[0].innerHTML = `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`;
      // console.log(e);
      // console.log(
      //   'Lat' + '---->' + e.latlng.lat,
      //   'Lng' + '---->' + e.latlng.lng
      // );
    });
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

  // setCoordinate(gps_lat, gps_long) {
  //   this.map = L.map('map').setView([gps_lat, gps_long], 13);
  // }

  /** Search Location by ip address with IP Geolocation API */
  searchAddress(): void {
    if (this.mapForm.valid) {
      console.log('invalid');
      const ipAddress = this.mapForm.value.ipaddress;
      const regex =
        /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
      if (regex.test(ipAddress)) {
        console.log('valid');

        this.apiService.getMapLocation(ipAddress).subscribe((res) => {
          console.log(res);
          this.map.remove();
          this.mapLayer(
            res.location.lat,
            res.location.lng,
            res.location.region,
            res.location.city
          );
          this.ipAddress = res.ip;
          this.country = res.location.country;
          this.timeZone = res.location.timezone;
          this.isp = res.isp;
          // this.latitudePosition = res.location.lat;
          // this.longitudePosition = res.location.lng;
          // console.log(this.latitudePosition, this.longitudePosition);
        });
      } else {
        this.tostr.error('Please enter a valid ip address', '', {
          timeOut: 5000,
        });
      }
    } else {
      this.tostr.error('Please enter a valid ip address', '', {
        timeOut: 5000,
      });
    }
  }
}
