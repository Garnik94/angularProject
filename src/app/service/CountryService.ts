import * as countries from "../files/Countries.json";
import {Country} from "../models/Country";
import {Injectable} from "@angular/core";

@Injectable()
export class CountryService {
  public getAllCountriesList() {
    return countries;
  }

  public getCountries() {
    return this.getAllCountriesList().data
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

  public getCountryById(countryId: number): Country {
    return this.getCountries().find(currentCountry => currentCountry.countryId === countryId);
  }

  public getCountryName(country: Country): string {
    return country.name["3"];
  }
}
