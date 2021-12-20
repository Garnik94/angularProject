import {Country} from "../models/Country";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryInterface} from "../interfaces/CountryInterface";
import {map} from "rxjs/operators";

@Injectable()
export class CountryService {

  countries: Country[] = [];

  constructor(private http: HttpClient) {
  }

  public getCountries() {
    return this.http.get("/assets/data/Countries.json")
      .pipe(
        map((data: any) => {
          return data.data.map((currentCountry: any) =>
            new Country(
              (currentCountry as CountryInterface).CountryId,
              (currentCountry as CountryInterface).DeletedBy,
              (currentCountry as CountryInterface).ISOcode,
              (currentCountry as CountryInterface).name,
              (currentCountry as CountryInterface).DeletedOn,
              (currentCountry as CountryInterface).Level,
              (currentCountry as CountryInterface).HasSpecificZone)
          );
        })
      )
  }

  public getCountryById(countryId: number): Country {
    return this.countries.find(currentCountry => {
      return currentCountry.countryId === countryId
    });
  }

  public getCountryName(country: Country): string {
    return country.name["3"];
  }
}
