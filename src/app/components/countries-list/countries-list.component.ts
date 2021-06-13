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
  regionSelected: boolean = false;
  srchDataValue: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private fbBuilder: FormBuilder,
    private spinnerService: NgxSpinnerService,
    private darkModeService: DarkModeService
  ) {
    this.coutriesForm();
  }

  coutriesForm(): void {
    this.countryListForm = this.fbBuilder.group({
      country: [''],
      filterOptions: ['Name'],
      region: ['allregions'],
    });
  }

  ngOnInit(): void {
    this.getQueryParams();
    this.getAllCounriesInfo();
    this.updatedSearchValue();
    this.getDarkModeStatus();
  }

  /** Displaying all Countries Data  for all regions*/
  displayingAllCountries(): void {
    if (this.countryListForm.get('region').value === 'allregions') {
      this.apiService.getAllCountriesData().subscribe((res) => {
        this.listOfCountries = res;
        this.allCountriesList = res;
        this.regionSelected = false;
        this.spinnerService.show();
        setTimeout(() => {
          this.spinnerService.hide();
        }, 2000);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: null,
        });
      });
    }
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
    this.spinnerService.show();
    this.apiService.getAllCountriesData().subscribe((data) => {
      this.allCountriesList = data;
      this.totalLength = data.length;
      const oldRegArr = data.map((item, i, arr) => {
        return arr[i].region;
      });
      const regArr = [...new Set(oldRegArr)];
      this.newRegArr = regArr.slice(0, -1);
      if (this.countryListForm.get('region').value !== 'allregions') {
        this.getDataByRegion(this.countryListForm.get('region').value);
      } else {
        this.listOfCountries = data;
        this.allCountriesList = data;
      }
      setTimeout(() => {
        this.spinnerService.hide();
      }, 3000);
    });
  }

  getDataByRegion(region: any): void {
    this.spinnerService.show();
    this.regionSelected = true;
    this.regionValue = region;
    this.apiService.getCountriesByRegion(region).subscribe((data) => {
      this.regionCountriesList = data;
      this.listOfCountries = data;
      this.allCountriesList = data;
      this.totalLength = data.length;
      if (region) {
        setTimeout(() => {
          this.spinnerService.hide();
        }, 3000);
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
    this.regionSelected = true;
    if (this.regionValue === 'allregions') {
      this.displayingAllCountries();
    } else {
      this.getDataByRegion(this.regionValue);
    }
  }

  // searching entries
  search(value): void {
    this.srchDataValue = value;
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
    if (this.countryListForm.get('region').value !== 'allregions') {
      this.listOfCountries = filterData;
    }
  }

  searchFilter(event): void {
    this.commonSearchFilter();
  }

  countrySelected(event): void {
    if (event.target.value === 'allcountries') {
      this.router.navigate(['/all-countries'], {
        relativeTo: this.route,
        queryParams: null,
      });
      if (this.countryListForm.get('region').value !== 'allregions') {
        this.getDataByRegion(this.countryListForm.get('region').value);
      } else {
        this.getAllCounriesInfo();
      }
    } else {
      this.apiService
        .getCountriesByName(event.target.value)
        .subscribe((res) => {
          this.listOfCountries = res;
          this.router.navigate(['/all-countries'], {
            relativeTo: this.route,
            queryParams: {
              country: event.target.value,
            },
          });
        });
    }
  }
}
