import * as countries from "../files/Countries.json";
import {Country} from "../models/Country";

export class CountryService {
  public static getAllCountriesList() {
    return countries;
  }

  public static getCountryArray() {
    return CountryService.getAllCountriesList().data
      .map(currentCountry =>
        new Country(
          currentCountry.CountryId,
          currentCountry.DeletedBy,
          currentCountry.ISOcode,
          currentCountry["name"],
          currentCountry.DeletedOn,
          currentCountry.Level,
          currentCountry.HasSpecificZone)
      );
  }

  public static getCountryById(countryId: number): Country {
    return this.getCountryArray().find(currentCountry => currentCountry.countryId === countryId);
  }

  public static getCountryName(country: Country): string {
    return country.name["3"];
  }
}
