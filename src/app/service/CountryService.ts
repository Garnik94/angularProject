import {Country} from "../models/Country";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryInterface} from "../interfaces/CountryInterface";
import {map, shareReplay} from "rxjs/operators";
import {Intervention} from "../models/Intervention";

@Injectable()
export class CountryService {

  private _countries$: Observable<Country[]>;

  constructor(private _http: HttpClient) {
    this._countries$ = this._http.get("/assets/data/Countries.json")
      .pipe(
        map((data: any) => {
          return data.data
            .map((currentCountry: Country) =>
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
      )
  }


  get countries$(): Observable<Country[]> {
    return this._countries$;
  }

  public getCountryById(countryId: number, countries: Country[]): Country {
    return countries.find(currentCountry => currentCountry.CountryId === countryId)
  }

  public getCountryName(countryId: number, countries: Country[]): string {
    return this.getCountryById(countryId, countries).name["3"]
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
