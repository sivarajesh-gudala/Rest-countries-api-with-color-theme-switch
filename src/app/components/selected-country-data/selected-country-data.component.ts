import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-selected-country-data',
  templateUrl: './selected-country-data.component.html',
  styleUrls: ['./selected-country-data.component.scss'],
})
export class SelectedCountryDataComponent implements OnInit {
  countryInfo: any;
  currencies: any;
  darkMode$ = this.darkModeService.darkMode$;
  darkModeStatus: boolean;
  countryName: any;
  flagImage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private darkModeService: DarkModeService,
    private spinnerService: NgxSpinnerService,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.getCountryData();
    this.getDarkModeStatus();
  }

  getDarkModeStatus(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.darkModeStatus = val;
    });
  }

  /** subscribing Get All Countries  API */
  getCountryData(): void {
    this.route.queryParams.subscribe((params) => {
      this.spinnerService.show();

      this.apiService.getCountriesByName(params.name).subscribe((data) => {
        data.map((country) => {
          this.flagImage = country.flag;
          this.countryName = country.name;
        });

        setTimeout(() => {
          this.spinnerService.hide();
        }, 3000);
        this.countryInfo = data;
        this.currencies = data.currencies;
      });
    });
  }

  /** Events  */

  /** Back to previous screen */
  back(): void {
    const regParam = sessionStorage.getItem('region');
    if (regParam !== 'undefined') {
      this.router.navigate(['/all-countries'], {
        queryParams: { region: regParam },
      });
    } else {
      this.router.navigate(['/all-countries']);
    }
  }

  /** Redirect to border Countries */
  borderCountry(val): void {
    this.apiService
      .getCountriesByCode(val.target.innerText)
      .subscribe((res) => {
        this.flagImage = res.flag;
        this.countryName = res.name;
        this.spinnerService.show();

        setTimeout(() => {
          this.spinnerService.hide();
        }, 3000);
        this.router.navigate(['/country'], {
          relativeTo: this.route,
          queryParams: { name: res.name },
        });
      });
  }

  /** Get Location of the country based on
   * Latitude and Longitude
   * @param latlng
   */
  getLocation(latlng): void {
    if (latlng) {
      this.sharedService.subject.next(latlng);
      this.router.navigate(['/ip-address-tracker'], {
        queryParams: { Lat: latlng[0], Lng: latlng[1] },
      });
    }
  }
}
