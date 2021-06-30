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
   * setting Map based on latitude and longitude
   */
  mapLayer(latPos, longPos, region, city): void {
    // map initialization
    this.map = L.map('map').setView([latPos, longPos], 13);

    //Setting Map Layer
    this.darkModeService.darkMode$.subscribe((val) => {
      this.modeStatus = val;
      if (this.modeStatus) {
        L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 20,
            attribution:
              '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          }
        ).addTo(this.map);
      } else {
        L.tileLayer(
          'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
          {
            maxZoom: 20,
            attribution:
              '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
          }
        ).addTo(this.map);
      }
    });

    // marker Icon
    var LeafIcon = new L.Icon({
      iconUrl: '../../../assets/ip-address/icon-location.svg',
      iconSize: [20, 25],
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
