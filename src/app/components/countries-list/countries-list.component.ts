import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { DarkModeService } from 'angular-dark-mode';
import { RoutePath } from 'src/app/shared/enums/route-path.enum';
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

  listOfCountries: number;
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
  countryName: any;
  countryParams: any;
  selectedCountry: any;
  hidesearchFilters: boolean = false;

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
      countries: ['allcountries'],
      region: ['allregions'],
    });
    this.getQueryParams();
  }

  ngOnInit(): void {
    this.getAllCounriesInfo();
    this.updatedSearchValue();
    this.getDarkModeStatus();
  }

  /** Subscribing API'S
   * method :Get
   */
  getAllCounriesInfo(): void {
    this.spinnerService.show();
    this.apiService.getAllCountriesData().subscribe((data) => {
      this.showSelecetdCountry(this.countryListForm.get('countries').value);
      this.totalLength = data.length;
      const oldRegArr = data.map((_, i, arr) => {
        return arr[i].region;
      });
      const regArr = [...new Set(oldRegArr)];
      this.newRegArr = regArr.slice(0, -1);
      this.allCountriesList = data;
      this.listOfCountries = data;
      setTimeout(() => {
        this.spinnerService.hide();
      }, 1000);
    });
  }

  getDataByRegion(region: any): void {
    this.regionValue = region;
    this.apiService.getCountriesByRegion(region).subscribe(
      (data) => {
        this.regionCountriesList = data;
        this.listOfCountries = data;
        this.allCountriesList = data;
        this.totalLength = data.length;
        if (region) {
          setTimeout(() => {
            this.spinnerService.hide();
          }, 1000);
          this.router.navigate([RoutePath.ALLCOUNTRIES], {
            relativeTo: this.route,
            queryParams: { region: region },
          });
        }
      },
      (err) => {
        this.router.navigate([RoutePath.PAGENOTFOUND]);
      }
    );
  }

  getDataByName(name): void {
    this.spinnerService.show();
    this.apiService.getCountriesByName(name).subscribe(
      (result) => {
        this.listOfCountries = result;
        this.filterItemsInRegion(result);
        setTimeout(() => {
          this.spinnerService.hide();
        }, 1000);
        if (name) {
          this.router.navigate([RoutePath.ALLCOUNTRIES], {
            relativeTo: this.route,
            queryParams: {
              countryName: name,
            },
          });
        }
      },
      (err) => {
        this.router.navigate([RoutePath.PAGENOTFOUND]);
      }
    );
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

  /** Functions */

  /** search country based on selected value from drop down */
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

  /** based on query params setting region value*/
  getQueryParams(): void {
    this.route.queryParams.subscribe((params) => {
      this.regionParams = params['region'];
      this.countryParams = params['countryName'];
      if (this.regionParams) {
        this.countryListForm.patchValue({
          region: this.regionParams,
        });
      }
      if (this.countryParams) {
        sessionStorage.setItem('country', this.countryParams);
        this.countryListForm.patchValue({
          countries: this.countryParams,
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

  /** Events */

  /** Search for a country... */
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

  /** Search based on selected Type*/
  searchFilter(): void {
    this.commonSearchFilter();
  }

  commonAllCountries(): void {
    this.router.navigate([RoutePath.ALLCOUNTRIES]);
    this.spinnerService.show();
    this.apiService.getAllCountriesData().subscribe((data) => {
      this.totalLength = data.length;
      this.allCountriesList = data;
      this.listOfCountries = data;
      setTimeout(() => {
        this.spinnerService.hide();
      }, 1000);
    });
  }

  /**Filter by region */
  regionsList(event): void {
    this.regionValue = event.target.value;
    this.hidesearchFilters = false;
    if (this.regionValue === 'allregions') {
      sessionStorage.clear();
      this.regionSelected = false;
      this.commonAllCountries();
    } else {
      sessionStorage.setItem('region', this.regionValue);
      this.spinnerService.show();
      this.regionSelected = true;
      this.router.navigate([RoutePath.ALLCOUNTRIES], {
        queryParams: { region: this.regionValue },
      });
      this.getDataByRegion(this.regionValue);
    }
  }

  /** Get Country based on the country selection
   * @param event
   */
  countrySelected(event): void {
    this.selectedCountry = event.target.value;
    this.showSelecetdCountry(event.target.value);
    if (event.target.value === 'allcountries') {
      if (this.countryListForm.get('region').value !== 'allregions') {
        this.getDataByRegion(this.countryListForm.get('region').value);
      } else {
        this.commonAllCountries();
      }
    }
  }

  showSelecetdCountry(countryName): void {
    if (countryName === 'allcountries') {
      this.hidesearchFilters = false;

      if (this.countryListForm.get('region').value !== 'allregions') {
        this.regionSelected = true;
        this.spinnerService.show();
        this.getDataByRegion(this.countryListForm.get('region').value);
      }
    } else {
      this.regionSelected = false;
      this.hidesearchFilters = true;
      this.getDataByName(countryName);
    }
  }

  moreDeatils(name): void {
    this.router.navigate([RoutePath.COUNTRY], { queryParams: { name: name } });
  }
}
