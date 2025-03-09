import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRESTCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No spanish name',
      capital: restCountry.capital?.join(', '),
      population: restCountry.population,
      continents: restCountry.continents?.join(', '),
      area: restCountry.area,
      region: restCountry.region,
      timezones: restCountry.timezones,
    };
  }
  static mapRestCountryArrayToCountryArray(
    restCountries: RESTCountry[]
  ): Country[] {
    return restCountries.map(this.mapRESTCountryToCountry);
  }
}
