import {Country} from "../models/Country";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryInterface} from "../interfaces/CountryInterface";
import {map} from "rxjs/operators";
import {Intervention} from "../models/Intervention";

@Injectable()
export class CountryService {

  countries: Country[] = [];

  private countries$: Observable<Country>;

  constructor(private http: HttpClient) {
    this.http.get("/assets/data/Countries.json")
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
      .subscribe(countries => this.countries = countries);
  }

  // public getCountries() {
  //   this.countries$.subscribe((countries: any) => this.countries = countries);
  // }

  // public getCountries() {
  //   return this.http.get("/assets/data/Countries.json")
  //     .pipe(
  //       map((data: any) => {
  //         return data.data.map((currentCountry: any) =>
  //           new Country(
  //             (currentCountry as CountryInterface).CountryId,
  //             (currentCountry as CountryInterface).DeletedBy,
  //             (currentCountry as CountryInterface).ISOcode,
  //             (currentCountry as CountryInterface).name,
  //             (currentCountry as CountryInterface).DeletedOn,
  //             (currentCountry as CountryInterface).Level,
  //             (currentCountry as CountryInterface).HasSpecificZone)
  //         );
  //       })
  //     )
  // }

  public getCountryById(countryId: number): Country {
    return this.countries.find(currentCountry => {
      return currentCountry.countryId === countryId
    });
  }

  public getCountryName(countryId: number): string {
    return this.getCountryById(countryId).name["3"];
  }
}
