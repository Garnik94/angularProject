import {Country} from "../models/Country";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryInterface} from "../interfaces/CountryInterface";
import {map, shareReplay} from "rxjs/operators";
import {Intervention} from "../models/Intervention";

@Injectable()
export class CountryService {

  countries: Country[] = [];

  // public countries$: Observable<Country[]>;

  constructor(private http: HttpClient) {
    // this.countries$ =
    this.http.get("/assets/data/Countries.json")
      .pipe(
        map((data: any) => {
          return data.data.map((currentCountry: CountryInterface) =>
            new Country(
              currentCountry.CountryId,
              currentCountry.DeletedBy,
              currentCountry.ISOcode,
              currentCountry.name,
              currentCountry.DeletedOn,
              currentCountry.Level,
              currentCountry.HasSpecificZone)
          );
        }),
        shareReplay({bufferSize: 1, refCount: true})
      ).subscribe(countries => this.countries = countries)
  }

  public getCountryById(countryId: number): Country {
    return this.countries
      .find(currentCountry => currentCountry.countryId === countryId)
  }

  public getCountryName(countryId: number): string {
    return this.getCountryById(countryId).name["3"]
  }

  // public getCountryById(countryId: number): Observable<Country> {
  //   return this.countries$
  //     .pipe(
  //       map(countries => countries
  //         .find(currentCountry => currentCountry.countryId === countryId)))
  // }
  //
  // public getCountryName(countryId: number): Observable<string> {
  //   return this.getCountryById(countryId)
  //     .pipe(
  //       map(country => country.name["3"]))
  // }

}
