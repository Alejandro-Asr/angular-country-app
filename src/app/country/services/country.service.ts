import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly queryCacheCapital = new Map<string, Country[]>();
  private readonly queryCacheCountry = new Map<string, Country[]>();
  private readonly queryCacheRegion = new Map<string, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
      catchError((error) => {
        console.log('error', error);
        return throwError(
          () =>
            new Error(`No se pudo encontrar la capital con esta query ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => {
        return CountryMapper.mapRestCountryArrayToCountryArray(resp);
      }),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      delay(2000),
      catchError((error) => {
        console.log('error', error);
        return throwError(
          () =>
            new Error(`No se pudo encontrar el país con esta query ${query}`)
        );
      })
    );
  }

  searchByRegion(region: string): Observable<Country[]> {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      catchError((error) => {
        console.log('error', error);
        return throwError(
          () =>
            new Error(`No se pudo encontrar la region con esta query ${region}`)
        );
      })
    );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | undefined> {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((countries) => {
        return CountryMapper.mapRestCountryArrayToCountryArray(countries);
      }),
      map((countries) => countries.at(0)),
      catchError((error) => {
        console.log('error', error);
        return throwError(
          () =>
            new Error(`No se pudo encontrar el país con este código ${code}`)
        );
      })
    );
  }
}
