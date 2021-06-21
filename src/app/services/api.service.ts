import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiEndPoint } from '../shared/enums/api-end-points.enum';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiCountries = `${environment.apiCountriesList}`;
  apiMap = `${environment.geoAPI}`;

  constructor(private http: HttpClient) {}

  /**
   * Get All the Countries List
   */
  getAllCountriesData(): Observable<any> {
    return this.http.get<any>(`${this.apiCountries}${ApiEndPoint.ALL}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  /**
   * Get countries list based on region
   * @param region
   */
  getCountriesByRegion(region): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}${ApiEndPoint.REGION}/${region}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get countries list based on country name
   * @param name
   */
  getCountriesByName(name): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}${ApiEndPoint.NAME}/${name}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get countries list based on Country full Name
   * @param fullName
   */
  getCountriesByFullName(fullName): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiCountries}${ApiEndPoint.NAME}/${fullName}?${ApiEndPoint.FULLTEXT}=${ApiEndPoint.TRUE}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get countries list based on aplha code
   * @param code
   */
  getCountriesByCode(code): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}${ApiEndPoint.ALPHA}/${code}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get countries list based on currency
   * @param currency
   */
  getCountriesByCurrency(currency): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}${ApiEndPoint.CURRENCY}/${currency}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get countries list based on language codes
   * @param langCode
   */
  getCountriesByLanguage(langCode): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}${ApiEndPoint.LANGUAGE}/${langCode}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get countries list based on capital city
   * @param capitalCity
   */
  getCountriesbyCapital(capitalCity): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}${ApiEndPoint.CAPITAL}/${capitalCity}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get countries list based on calling code
   * @param callingcode
   */
  getCountriesByCallingCode(callingcode): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}${ApiEndPoint.CALLINGCODE}/${callingcode}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get countries list based on regionalbloc
   * @param regionalBloc
   */
  getCountriesByRegionalbloc(regionalBloc): Observable<any> {
    return this.http
      .get<any>(
        `${this.apiCountries}${ApiEndPoint.REGIONALBLOC}/${regionalBloc}`
      )
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  /**
   * Get Location based on IP Address
   * @param ipadress
   */
  getMapLocation(ipadress): Observable<any> {
    return this.http
      .get<any>(`${this.apiMap}&${ApiEndPoint.IPADDRESS}=${ipadress}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
