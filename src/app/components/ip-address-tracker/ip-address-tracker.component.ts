import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DarkModeService } from 'angular-dark-mode';
import * as L from 'leaflet';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';
import { Path } from 'src/app/shared/enums/route-path.enum';
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
  modeStatus: boolean;
  tileLayer: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private darkModeService: DarkModeService,
    private spinnerService: NgxSpinnerService,
    private tostr: ToastrService,
    private apiService: ApiService,
    private sharedService: SharedService
  ) {
    this.mapForm = this.fb.group({
      ipaddress: this.sharedService.valid.ipaddress,
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
   * @description
   * setting Map based on latitude and longitude
   */
  mapLayer(latPos, longPos, region, city): void {
    // map initialization
    this.map = L.map('map').setView([latPos, longPos], 13);

    //Setting Map Layer
    this.darkModeService.darkMode$.subscribe((val) => {
      this.modeStatus = val;
      if (this.modeStatus) {
        this.map.Layer?.remove();
        this.tileLayer = L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
          }
        );
      } else {
        this.map.Layer?.remove();
        this.tileLayer = L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }
        );
      }
      this.tileLayer.addTo(this.map);
    });

    // marker Icon
    const leafIcon = L.icon({
      iconUrl: '../../../assets/ip-address/marker-icon-2x-yellow.png',
      iconSize: [20, 30],
    });

    //changing position of Marker
    const marker = L.marker([latPos, longPos], {
      icon: leafIcon,
      draggable: true,
    });

    const popUp = marker.bindPopup(city + ' ' + marker.getLatLng()).openPopup();
    popUp.addTo(this.map);
    this.tileLayer.addTo(this.map);
    this.map.on('mousemove', (e) => {
      document.getElementsByClassName(
        'coordinate'
      )[0].innerHTML = `Lat: ${e.latlng.lat}, Lng: ${e.latlng.lng}`;
    });
  }

  searchValueChanges(): void {
    this.mapForm.get('ipaddress').valueChanges.subscribe((val) => {
      if (val === '') {
        this.invalidIpAddr = true;
      }
    });
  }

  /** Get Location based on country selection */
  getLatLngFromCountry(): void {
    this.route.queryParams.subscribe((val) => {
      if (Object.entries(val).length !== 0 && val.constructor === Object) {
        try {
          this.mapLayer(val.Lat, val.Lng, '', '');
        } catch (err) {
          this.router.navigate([Path.PAGENOTFOUND]);
        }
      } else {
        this.getLocation();
      }
    });
  }

  /** Search Location by ip address with IP Geolocation API */
  searchAddress(): void {
    if (this.mapForm.valid) {
      this.spinnerService.show();
      const ipAddress = this.mapForm.value.ipaddress;
      this.apiService.getMapLocation(ipAddress).subscribe(
        (res) => {
          this.invalidIpAddr = false;
          this.ipAddress = res.ip;
          this.country = res.location.country;
          this.timeZone = res.location.timezone;
          this.isp = res.isp;
          this.locationDetails = res;

          this.map.remove();
          this.mapLayer(
            res.location.lat,
            res.location.lng,
            res.location.region,
            res.location.city
          );
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: null,
          });
          this.spinnerService.hide();
        },
        (err) => {
          this.router.navigate([Path.PAGENOTFOUND]);
        }
      );
    } else {
      this.invalidIpAddr = true;
      this.tostr.error('Please enter a valid IP Address', '', {
        timeOut: 3000,
      });
    }
  }
}
