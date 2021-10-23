import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { Path, RoutePath } from 'src/app/shared/enums/route-path.enum';
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private darkModeService: DarkModeService,
    private spinnerService: NgxSpinnerService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getCountryData();
    this.getDarkModeStatus();
  }

  keys(obj) {
    return Object.keys(obj);
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
      this.countryName = params.name;
      this.apiService.getCountriesByName(params.name).subscribe(
        (data) => {
          this.spinnerService.hide();
          this.countryInfo = data;
          this.currencies = data.currencies;
        },
        (err) => {
          this.router.navigate([Path.PAGENOTFOUND]);
        }
      );
    });
  }

  /** Events  */

  /** Back to previous screen */
  back(): void {
    const regParam = sessionStorage.getItem('region');
    console.log(regParam);
    if (regParam) {
      this.router.navigate([RoutePath.ALLCOUNTRIES], {
        queryParams: { region: regParam },
      });
    } else {
      this.router.navigate([Path.ALLCOUNTRIES]);
    }
  }

  /** Redirect to border Countries */
  borderCountry(val): void {
    this.apiService.getCountriesByCode(val.target.innerText).subscribe(
      (res) => {
        this.router.navigate([RoutePath.COUNTRY], {
          relativeTo: this.route,
          queryParams: { name: res[0].name.common },
        });
      },
      (err) => {
        this.router.navigate([Path.PAGENOTFOUND]);
      }
    );
  }

  /** Get Location of the country based on
   * Latitude and Longitude
   * @param latlng
   */
  getLocation(latlng: any): void {
    if (latlng || latlng.length == 2) {
      const [lat, lng] = latlng;
      this.router.navigate([RoutePath.IPADDRESS], {
        queryParams: { Lat: lat, Lng: lng },
      });
    }
  }
}
