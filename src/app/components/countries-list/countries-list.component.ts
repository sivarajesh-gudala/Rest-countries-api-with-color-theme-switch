import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  searchFilterOptions: any[] = [
    'Name',
    'Full Name',
    'Code',
    'Currency',
    'Language',
    'Capital City',
    'Calling Code',
    'Regional Bloc',
  ];
  listOfCountries: any;
  countryListForm: FormGroup;
  totalLength: any;
  page: number = 1;
  newRegArr: any[];
  regionValue: any;
  darkMode$ = this.darkModeService.darkMode$;
  darkModeStatus: boolean;
  allCountriesList: any;
  regionCountriesList: any;
  regionParams: any;
  searchedData: any;
  searchFilterOption: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fbBuilder: FormBuilder,
    private SpinnerService: NgxSpinnerService,
    private darkModeService: DarkModeService
  ) {
    this.coutriesForm();
  }

  coutriesForm(): void {
    this.countryListForm = this.fbBuilder.group({
      country: [''],
      filterOptions: ['Name'],
      region: [''],
    });
  }

  ngOnInit(): void {
    this.getQueryParams();
    this.getAllCounriesInfo();
    this.updatedSearchValue();
    this.getDarkModeStatus();
  }

  /** based on query params setting region value*/
  getQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.regionParams = params['region'];
      sessionStorage.setItem('region', this.regionParams);
      if (this.regionParams) {
        this.countryListForm.patchValue({
          region: this.regionParams,
        });
      }
    });
  }

  /** storing Dark mode status */
  getDarkModeStatus(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.darkModeStatus = val;
    });
  }

  /** storing searched
   * value and
   * based on that filtering data */
  updatedSearchValue(): void {
    this.countryListForm
      .get('country')
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((changes) => {
        this.searchedData = changes;
      });
    this.countryListForm
      .get('filterOptions')
      .valueChanges.pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((changes) => {
        this.searchFilterOption = changes;
      });
  }

  /** Subscribing API'S
   * method :Get
   */
  getAllCounriesInfo(): void {
    this.SpinnerService.show();
    this.apiService.getAllCountriesData().subscribe((data) => {
      this.allCountriesList = data;
      this.totalLength = data.length;
      if (this.countryListForm.get('region').value) {
        this.getDataByRegion(this.countryListForm.get('region').value);
      } else {
        this.listOfCountries = data;
      }
      const oldRegArr = data.map((item, i, arr) => {
        return arr[i].region;
      });
      const regArr = [...new Set(oldRegArr)];
      this.newRegArr = regArr.slice(0, -1);
      setTimeout(() => {
        this.SpinnerService.hide();
      }, 2000);
    });
  }

  getDataByRegion(region: any): void {
    this.SpinnerService.show();
    this.apiService.getCountriesByRegion(region).subscribe((data) => {
      this.regionCountriesList = data;
      this.listOfCountries = data.slice();
      this.totalLength = data.length;
      if (region) {
        setTimeout(() => {
          this.SpinnerService.hide();
        }, 2000);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { region: region },
        });
      }
    });
  }

  getDataByName(name): void {
    this.apiService.getCountriesByName(name).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByFullName(fullName): void {
    this.apiService.getCountriesByFullName(fullName).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByCurrency(currency): void {
    this.apiService.getCountriesByCurrency(currency).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByCode(code): void {
    this.apiService.getCountriesByCode(code).subscribe((val) => {
      this.filterItemsInRegion(val);
    });
  }

  getDataByCapitalCity(capital): void {
    this.apiService.getCountriesbyCapital(capital).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByLanguage(language): void {
    this.apiService.getCountriesByLanguage(language).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByCallingCode(callingcode): void {
    this.apiService.getCountriesByLanguage(callingcode).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByRegionalbloc(regbloc): void {
    this.apiService.getCountriesByLanguage(regbloc).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  /** search based on selected value from drop down */
  commonSearchFilter(): any {
    if (this.searchedData !== '' || this.countryListForm.get('country').value) {
      switch (this.searchFilterOption) {
        case 'Name':
          return this.getDataByName(this.searchedData);
        case 'Full Name':
          return this.getDataByFullName(this.searchedData);
        case 'Code':
          return this.getDataByCode(this.searchedData);
        case 'Currency':
          return this.getDataByCurrency(this.searchedData);
        case 'Language':
          return this.getDataByLanguage(this.searchedData);
        case 'Capital City':
          return this.getDataByCapitalCity(this.searchedData);
        case 'Calling Code':
          return this.getDataByCallingCode(this.searchedData);
        case 'Regional Bloc':
          return this.getDataByRegionalbloc(this.searchedData);
      }
    }
  }

  /** Events methods and functions */
  regionsList(event): void {
    this.regionValue = event.target.value;
    this.getDataByRegion(this.regionValue);
  }

  // searching entries
  search(value): void {
    if (this.countryListForm.get('filterOptions').value) {
      this.commonSearchFilter();
    }
    if ((value = '')) {
      if (this.countryListForm.get('region').value) {
        this.listOfCountries = this.regionCountriesList;
      } else {
        this.listOfCountries = this.allCountriesList;
      }
    }
  }

  /** filter items only if particular country
   * exists in the list of selected region
   */
  filterItemsInRegion(data): void {
    let filterData = data.filter((item, i, arr) => {
      if (arr[i].region == this.countryListForm.get('region').value) {
        return arr[i];
      }
    });
    if (this.countryListForm.get('region').value !== '') {
      this.listOfCountries = filterData;
    }
  }

  searchFilter(event): void {
    this.commonSearchFilter();
  }
}
