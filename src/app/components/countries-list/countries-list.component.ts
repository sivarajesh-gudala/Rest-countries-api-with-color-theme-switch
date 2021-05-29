import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  // regions: any[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  listOfCountries: any[];
  countryName: any;
  countryOptions: any;
  filterByCountry: Observable<string[]>;
  countryListForm: FormGroup;
  totalLength: any;
  page: number = 1;
  newRegArr: any[];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fbBuilder: FormBuilder
  ) {
    this.countryListForm = this.fbBuilder.group({
      country: [''],
      region: [''],
    });
    this.getAllCounriesInfo();
  }

  ngOnInit(): void {}

  /** Filter methods */

  filterCountryOptions(): void {
    this.filterByCountry = this.countryListForm
      .get('country')
      .valueChanges.pipe(
        startWith(''),
        map((val) => this.filterByCountryName(val))
      );
  }

  filterByCountryName(country: string): string[] {
    if (country) {
      return this.countryOptions.filter(
        (con) => con.value.toLowerCase().indexOf(country.toLowerCase()) === 0
      );
    } else {
      return this.countryOptions;
    }
  }

  /** API'S */
  getAllCounriesInfo(): void {
    this.apiService.getAllCountriesData().subscribe((data) => {
      this.listOfCountries = data;
      console.log(data);
      this.totalLength = data.length;

      const oldRegArr = this.listOfCountries.map((item, i, arr) => {
        return arr[i].region;
      });
      const regArr = [...new Set(oldRegArr)];
      // console.log(regArr);
      // console.log(regArr.slice(0, -1));
      this.newRegArr = regArr.slice(0, -1);
      // this.newRegArr = regArr;
      // this.newRegArr = regArr.map(function (item) {
      //   return item == '' ? 'No-Region' : item;
      // });
    });
  }

  getDataByRegion(region: any): void {
    this.apiService.getCountriesByRegion(region).subscribe((data) => {
      this.countryOptions = data;
      this.listOfCountries = this.countryOptions;
      this.filterCountryOptions();
      this.totalLength = data.length;
    });
  }

  getDataByName(name): void {
    this.apiService.getCountriesByName(name).subscribe((val) => {
      this.countryOptions = val;
      this.listOfCountries = this.countryOptions;
      this.filterCountryOptions();
    });
  }

  getDataByFullName(fullName): void {
    this.apiService.getCountriesByFullName(fullName).subscribe((val) => {
      this.countryOptions = val;
      this.listOfCountries = this.countryOptions;
      this.filterCountryOptions();
    });
  }

  getDataByCurrency(currency): void {
    this.apiService.getCountriesByCurrency(currency).subscribe((val) => {
      this.countryOptions = val;
      this.listOfCountries = this.countryOptions;
      this.filterCountryOptions();
    });
  }

  getDataByCapitalCity(capital): void {
    this.apiService.getCountriesbyCapital(capital).subscribe((val) => {
      this.countryOptions = val;
      this.listOfCountries = this.countryOptions;
      this.filterCountryOptions();
    });
  }

  getDataByLanguage(language): void {
    this.apiService.getCountriesByLanguage(language).subscribe((val) => {
      console.log(val);
      this.countryOptions = val;
      this.listOfCountries = this.countryOptions;
      this.filterCountryOptions();
    });
  }

  getDataByCallingCode(callingcode): void {
    this.apiService.getCountriesByLanguage(callingcode).subscribe((val) => {
      this.countryOptions = val;
      this.listOfCountries = this.countryOptions;
      this.filterCountryOptions();
    });
  }

  getDataByRegionalbloc(regbloc): void {
    this.apiService.getCountriesByLanguage(regbloc).subscribe((val) => {
      this.countryOptions = val;
      this.listOfCountries = this.countryOptions;
      this.filterCountryOptions();
    });
  }

  search(value): void {
    this.getDataByName(value);
    this.getDataByFullName(value);
    this.getDataByCurrency(value);
    this.getDataByCapitalCity(value);
    this.getDataByLanguage(value);
    this.getDataByCallingCode(value);
    this.getDataByRegionalbloc(value);
  }

  regionsList(value): void {
    this.getDataByRegion(value);

    console.log(value);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { region: value },
      queryParamsHandling: 'merge',
    });
  }

  countryData(name): void {
    this.countryName = name;
    console.log(this.countryName);
  }
}
