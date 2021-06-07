import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from 'src/app/services/api.service';

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
  regionParam: any;
  borders: any;
  alphaCode: any[] = [];
  borderNames: any[] = [];
  countryName: any;
  bordersList: any;
  flagImage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private darkModeService: DarkModeService,
    private spinnerService: NgxSpinnerService
  ) {
    this.getCountryData();
  }

  ngOnInit(): void {
    this.getDarkModeStatus();
  }

  getDarkModeStatus(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.darkModeStatus = val;
    });
  }

  /** Get All Countries  API */

  getCountryData(): void {
    this.route.queryParams.subscribe((params) => {
      this.spinnerService.show();

      this.apiService.getCountriesByName(params.name).subscribe((data) => {
        // console.log(data);
        data
          .map((country) => {
            this.flagImage = country.flag;
            this.countryName = country.name;
          })
          .join('');
        // console.log(this.flagImage);
        setTimeout(() => {
          this.spinnerService.hide();
        }, 3000);
        this.countryInfo = data;
        this.currencies = data.currencies;
      });
    });
  }

  /** Events  */
  back(): void {
    const regParam = sessionStorage.getItem('region');
    console.log(regParam);
    if (regParam !== 'undefined') {
      this.router.navigate(['/countries'], {
        queryParams: { region: regParam },
      });
    } else {
      this.router.navigate(['/countries']);
    }
  }

  /** Redirect to border Countries */
  borderCountry(val): void {
    // console.log(val.target.innerText);
    this.spinnerService.show();
    this.apiService
      .getCountriesByCode(val.target.innerText)
      .subscribe((res) => {
        // console.log(res);
        this.flagImage = res.flag;
        this.countryName = res.name;

        setTimeout(() => {
          this.spinnerService.hide();
        }, 3000);
        // console.log(res, res.name);
        this.router.navigate(['/country'], {
          relativeTo: this.route,
          queryParams: { name: res.name },
        });
      });
  }
}
