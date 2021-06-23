import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';
import { RoutePath } from 'src/app/shared/enums/route-path.enum';
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
  showSpinner: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private darkModeService: DarkModeService,
    private spinnerService: NgxSpinnerService
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
    this.showSpinner = false;
    this.spinnerService.show();
    this.route.queryParams.subscribe((params) => {
      this.apiService.getCountriesByName(params.name).subscribe(
        (data) => {
          this.showSpinner = true; // why do you have two variables to control the spinner's visibility>?
          this.spinnerService.show(); // not needed

          // this map creates a new array and it is not used anywhere
          // flagImage, countryName will always be reassigned for each country
          // so below snippet is same as doing 
          // this.flagImage = data[data.length-1].flag
          // this.countryName = data[data.length-1].name
          data.map((country) => {
            this.flagImage = country.flag;
            this.countryName = country.name;
          });

          setTimeout(() => {
            this.spinnerService.hide(); // extra 3 seconds time waste aa? user ki?
          }, 3000); 
          this.countryInfo = data;
          this.currencies = data.currencies;
        },
        (err) => {
          this.router.navigate([RoutePath.PAGENOTFOUND]);
        }
      );
    });
  }

  /** Events  */

  /** Back to previous screen */
  back(): void {
    const regParam = sessionStorage.getItem('region');
    if (regParam !== 'undefined') { // if region is not present in the sessionStorage it will return null, not a string
      this.router.navigate([RoutePath.ALLCOUNTRIES], {
        queryParams: { region: regParam },
      });
    } else {
      this.router.navigate([RoutePath.ALLCOUNTRIES]);
    }
  }

  /** Redirect to border Countries */
  borderCountry(val): void {
    this.showSpinner = false; // do you really need this?
    this.spinnerService.show();
    this.apiService.getCountriesByCode(val.target.innerText).subscribe(
      (res) => {
        this.flagImage = res.flag;
        this.countryName = res.name;
        this.spinnerService.show(); // not needed
        setTimeout(() => {
          this.spinnerService.hide();        //  why are you showing the spinner for an additional 3 seconds
        }, 3000);                      
        this.router.navigate([RoutePath.COUNTRY], {
          relativeTo: this.route,
          queryParams: { name: res.name },
        });
      },
      (err) => {
        this.router.navigate([RoutePath.PAGENOTFOUND]);
      }
    );
  }

  /** Get Location of the country based on
   * Latitude and Longitude
   * @param latlng
   */
  getLocation(latlng): void { // give type
    if (latlng) { // also check the length because `[]` is also truthy 
      this.router.navigate([RoutePath.IPADDRESS], {
        queryParams: { Lat: latlng[0], Lng: latlng[1] }, // can use array destructuring to avoid using indexes
      });
    }
  }
}
