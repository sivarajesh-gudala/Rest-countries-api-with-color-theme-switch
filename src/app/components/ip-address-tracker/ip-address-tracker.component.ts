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
  mapForm: FormGroup;
  darkModeStatus: boolean;
  ipAddress: any;
  country: any;
  timeZone: any;
  isp: any;
  locationDetails: any;
  invalidIpAddr: boolean = true;
  ipRegex =
    /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private tostr: ToastrService,
    private darkModeService: DarkModeService
  ) {
    this.mapForm = this.fb.group({
      ipaddress: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getLocation();
    this.getDarkModeStatus();
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
      if (this.ipRegex.test(ipAddress)) {
        this.apiService.getMapLocation(ipAddress).subscribe((res) => {
          this.invalidIpAddr = false;
          console.log(res);
          this.locationDetails = res;
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
        });
      } else {
        this.invalidIpAddr = true;
        this.tostr.error('Please enter a valid IP Address', '', {
          timeOut: 5000,
        });
      }
    } else {
      this.invalidIpAddr = true;
      this.tostr.error('Please enter a valid IP address', '', {
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
}
