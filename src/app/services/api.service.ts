import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiCountries = `${environment.apiCountriesList}`;
  apiMap = `${environment.geoAPI}`;
  // mapUrl =
  // 'https://geo.ipify.org/api/v1?apiKey=at_Y6YoKAMjsUQEY3KHyEH7vZ8oCVvAp&ipAddress=8.8.8.8';
  constructor(private http: HttpClient) {}

  /**
   * Get All the Countries List
   */
  getAllCountriesData(): Observable<any> {
    return this.http.get<any>(`${this.apiCountries}all`).pipe(
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
    return this.http.get<any>(`${this.apiCountries}region/${region}`).pipe(
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
    return this.http.get<any>(`${this.apiCountries}name/${name}`).pipe(
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
      .get<any>(`${this.apiCountries}name/${fullName}?fullText=true`)
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
    return this.http.get<any>(`${this.apiCountries}alpha/${code}`).pipe(
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
    return this.http.get<any>(`${this.apiCountries}currency/${currency}`).pipe(
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
    return this.http.get<any>(`${this.apiCountries}lang/${langCode}`).pipe(
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
      .get<any>(`${this.apiCountries}capital/${capitalCity}`)
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
      .get<any>(`${this.apiCountries}callingcode/${callingcode}`)
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
      .get<any>(`${this.apiCountries}regionalbloc/${regionalBloc}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getMapLocation(ipadress): Observable<any> {
    return this.http.get<any>(`${this.apiMap}&ipAddress=${ipadress}`).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
