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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private darkModeService: DarkModeService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.getDarkModeStatus();
    this.getCountryData();
  }

  getDarkModeStatus(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.darkModeStatus = val;
    });
  }

  /** Get Countries API */

  getCountryData(): void {
    this.route.queryParams.subscribe((params) => {
      this.apiService
        .getCountriesByName(params.name.toLowerCase())
        .subscribe((data) => {
          this.spinnerService.show();
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
}
