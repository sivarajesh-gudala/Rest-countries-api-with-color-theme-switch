import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  mapForm: FormGroup;
  darkModeStatus: boolean;
  ipAddress: any;
  country: any;
  timeZone: any;
  isp: any;
  locationDetails: any;
  invalidIpAddr: boolean = true;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private tostr: ToastrService,
    private darkModeService: DarkModeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.mapForm = this.fb.group({
      ipaddress: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
          ),
        ],
      ],
    });
  }
  ngOnInit(): void {
    this.getDarkModeStatus();
    this.getLatLngFromCountry();
    this.searchValueChanges();
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
        this.mapLayer(
          position.coords.latitude,
          position.coords.longitude,
          '',
          ''
        );
      });
    } else {
      this.tostr.error('Please switch on your GPS Location', '', {
        timeOut: 5000,
      });
      console.log('No Location');
    }
  }

  /**
   * setting Map based on latitude and longitude
   */
  mapLayer(latPos, longPos, region, city): void {
    // map initialization
    this.map = L.map('map').setView([latPos, longPos], 13);
    //Setting Map Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    // marker Icon
    var LeafIcon = new L.Icon({
      iconUrl: '../../../assets/ip-address/icon-location.svg',
      iconSize: [30, 40],
    });

    //changing position of Marker
    var marker = L.marker([latPos, longPos], {
      icon: LeafIcon,
      draggable: true,
    });

    var popUp = marker.bindPopup(city + ' ' + marker.getLatLng()).openPopup();
    popUp.addTo(this.map);

    this.map.on('mousemove', (e) => {
      document.getElementsByClassName(
        'coordinate'
      )[0].innerHTML = `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`;
    });
  }

  /** Search Location by ip address with IP Geolocation API */
  searchAddress(): void {
    if (this.mapForm.valid) {
      const ipAddress = this.mapForm.value.ipaddress;
      this.apiService.getMapLocation(ipAddress).subscribe((res) => {
        this.invalidIpAddr = false;
        this.ipAddress = res.ip;
        this.country = res.location.country;
        this.timeZone = res.location.timezone;
        this.isp = res.isp;
        this.locationDetails = res;
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            Lat: res.location.lat,
            Lng: res.location.lng,
          },
        });
        this.map.remove();
        this.mapLayer(
          res.location.lat,
          res.location.lng,
          res.location.region,
          res.location.city
        );
      });
    } else {
      this.invalidIpAddr = true;
      this.tostr.error('Please enter a valid IP Address', '', {
        timeOut: 5000,
      });
    }
  }

  searchValueChanges(): void {
    this.mapForm.get('ipaddress').valueChanges.subscribe((val) => {
      if (val === '' || !this.ipRegex.test(val)) {
        this.invalidIpAddr = true;
      }
    });
  }

  getLatLngFromCountry(): void {
    this.route.queryParams.subscribe((val) => {
      if (Object.entries(val).length !== 0 && val.constructor === Object) {
        this.mapLayer(val.Lat, val.Lng, '', '');
      } else {
        this.getLocation();
      }
    });
  }
}
