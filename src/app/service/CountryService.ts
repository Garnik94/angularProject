import {Country} from "../models/Country";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";

@Injectable()
export class CountryService {

  private _countries$: Observable<Country[]>;

  constructor(private _http: HttpClient) {
    this._countries$ = this._http.get("/assets/data/Countries.json")
      .pipe(
        map((data: any) => data.data),
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

}
