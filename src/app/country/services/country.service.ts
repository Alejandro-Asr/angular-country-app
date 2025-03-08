import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((countries) => {
        return CountryMapper.mapRestCountryArrayToCountryArray(countries);
      }),
      catchError((error) => {
        console.log('error', error);
        return throwError(
          () =>
            new Error(`No se pudo encontrar la capital con esta query ${query}`)
        );
      })
    );
  }
}
