import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { DarkModeService } from 'angular-dark-mode';
import { ApiService } from 'src/app/services/api.service';
import { Path, RoutePath } from 'src/app/shared/enums/route-path.enum';
import { FilterItems } from 'src/app/shared/enums/filter-items.enum';
@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss'],
})
export class CountriesListComponent implements OnInit {
  searchFilterOptions: any = Object.values(FilterItems);
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
  countryParams: any;
  selectedCountry: any;
  hidesearchFilters: boolean = false;

  constructor(
    private fbBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService,
    private darkModeService: DarkModeService,
    private apiService: ApiService
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

  /**
   * @description - subscribing api's
   * @method Get
   * @type {void}
   */
  getAllCounriesInfo(): void {
    this.spinnerService.show();
    this.apiService.getAllCountriesData().subscribe((data) => {
      this.showSelecetdCountry(this.countryListForm.get('countries').value);
      this.totalLength = data.length;
      const oldRegArr = data.map(({ region }) => region);
      const regArr = [...new Set(oldRegArr)];
      this.newRegArr = regArr.slice(0, -1);
      this.allCountriesList = data;
      this.listOfCountries = data;
      this.spinnerService.hide();
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
          this.spinnerService.hide();
          this.router.navigate([RoutePath.ALLCOUNTRIES], {
            relativeTo: this.route,
            queryParams: { region: region },
          });
        }
      },
      (err) => {
        this.router.navigate([Path.PAGENOTFOUND]);
      }
    );
  }

  getDataByName(name: any): void {
    this.spinnerService.show();
    this.apiService.getCountriesByName(name).subscribe(
      (result) => {
        this.listOfCountries = result;
        this.filterItemsInRegion(result);
        this.spinnerService.hide();
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
        this.router.navigate([Path.PAGENOTFOUND]);
      }
    );
  }

  getDataByFullName(fullName: any): void {
    this.apiService.getCountriesByFullName(fullName).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByCurrency(currency: any): void {
    this.apiService.getCountriesByCurrency(currency).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByCode(code: any): void {
    this.apiService.getCountriesByCode(code).subscribe((val) => {
      this.filterItemsInRegion(val);
    });
  }

  getDataByCapitalCity(capital: any): void {
    this.apiService.getCountriesbyCapital(capital).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByLanguage(language: any): void {
    this.apiService.getCountriesByLanguage(language).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByCallingCode(callingcode: any): void {
    this.apiService.getCountriesByLanguage(callingcode).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  getDataByRegionalbloc(regbloc: any): void {
    this.apiService.getCountriesByLanguage(regbloc).subscribe((val) => {
      this.listOfCountries = val;
      this.filterItemsInRegion(val);
    });
  }

  /** Functions */

  /**
   * @description - search country based on selected
   * value from drop down
   * @type {any} */
  commonSearchFilter(): any {
    if (this.searchedData !== '' || this.countryListForm.get('country').value) {
      switch (this.searchFilterOption) {
        case FilterItems.NAME:
          return this.getDataByName(this.searchedData);
        case FilterItems.FULLNAME:
          return this.getDataByFullName(this.searchedData);
        case FilterItems.CODE:
          return this.getDataByCode(this.searchedData);
        case FilterItems.CURRENCY:
          return this.getDataByCurrency(this.searchedData);
        case FilterItems.LANGUAGE:
          return this.getDataByLanguage(this.searchedData);
        case FilterItems.CAPITALCITY:
          return this.getDataByCapitalCity(this.searchedData);
        case FilterItems.CALLINGCODE:
          return this.getDataByCallingCode(this.searchedData);
        case FilterItems.REGIONALBLOC:
          return this.getDataByRegionalbloc(this.searchedData);
      }
    }
  }

  /** @description - filter items only if particular country
   * exists in the list of selected region
   * @type {void}
   */
  filterItemsInRegion(data: any): void {
    let filterData = data.filter((item, i, arr) => {
      if (arr[i].region == this.countryListForm.get('region').value) {
        return true;
      }
    });
    if (this.countryListForm.get('region').value !== 'allregions') {
      this.listOfCountries = filterData;
    }
  }

  /**
   * @description Based on query params setting region value*/
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

  /**
  * @description storing Dark mode status */
  getDarkModeStatus(): void {
    this.darkModeService.darkMode$.subscribe((val) => {
      this.darkModeStatus = val;
    });
  }

  /**
   * @description storing searched value and
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
    if (!value) {
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
    this.spinnerService.show();
    this.apiService.getAllCountriesData().subscribe((data) => {
      this.totalLength = data.length;
      this.allCountriesList = data;
      this.listOfCountries = data;
      this.router.navigate([Path.ALLCOUNTRIES]);
      this.spinnerService.hide();
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
    this.router.navigate([Path.COUNTRY], { queryParams: { name: name } });
  }
}
