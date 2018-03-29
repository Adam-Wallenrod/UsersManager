import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators';

import { Country } from './country';


@Injectable()
export class CountryService {

  countiesUrl = "https://restcountries.eu/rest/v2/all?fields=name";

  constructor(private http: HttpClient) {}

  getCountries (): Observable<Country[]> {
    return this.http.get<Country[]>(this.countiesUrl)
      .pipe(

      );
  }


}
