import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiCountries = `${environment.apiCountriesList}`;

  constructor(private http: HttpClient) {}

  getAllCountriesData(): Observable<any> {
    return this.http.get<any>(`${this.apiCountries}all`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getCountriesByRegion(region): Observable<any> {
    return this.http.get<any>(`${this.apiCountries}region/${region}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getCountriesByName(name): Observable<any> {
    return this.http.get<any>(`${this.apiCountries}name/${name}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getCountriesByFullName(fullname): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}name/${fullname}?fullText=true`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getCountriesByCode(code): Observable<any> {
    return this.http.get<any>(`${this.apiCountries}alpha/${code}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getCountriesByCurrency(currency): Observable<any> {
    return this.http.get<any>(`${this.apiCountries}currency/${currency}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getCountriesByLanguage(langCode): Observable<any> {
    return this.http.get<any>(`${this.apiCountries}lang/${langCode}`).pipe(
      map((res) => {
        return res;
      })
    );
  }

  getCountriesbyCapital(capitalCity): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}capital/${capitalCity}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getCountriesByCallingCode(callingcode): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}callingcode/${callingcode}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  getCountriesByRegionalbloc(regionalbloc): Observable<any> {
    return this.http
      .get<any>(`${this.apiCountries}regionalbloc/${regionalbloc}`)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
