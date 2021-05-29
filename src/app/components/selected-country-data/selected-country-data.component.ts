import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-selected-country-data',
  templateUrl: './selected-country-data.component.html',
  styleUrls: ['./selected-country-data.component.scss'],
})
export class SelectedCountryDataComponent implements OnInit {
  countryInfo: any;
  currencies: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getCountryData();
  }

  getCountryData(): void {
    this.route.queryParams.subscribe((params) => {
      console.log(params, params.name);

      this.apiService
        .getCountriesByName(params.name.toLowerCase())
        .subscribe((data) => {
          console.log('countries by name', data);
          this.countryInfo = data;
          this.currencies = data.currencies;
        });
    });
  }
}
