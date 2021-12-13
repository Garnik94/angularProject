import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from "../models/Country";
import {CountryService} from "../service/CountryService";
import {Intervention} from "../models/Intervention";
import {PortfolioComponent} from "../portfolio/portfolio.component";
import {InterventionService} from "../service/InterventionService";
import {SearchFieldsInterface} from "../models/SearchFieldsInterface";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output()
  onSearch = new EventEmitter<SearchFieldsInterface>();
  @Output()
  onReset = new EventEmitter<void>();

  title: string = "Search";
  searchFields: SearchFieldsInterface = {
    countryOption: 0,
    keywordOption: "",
    checkboxOption: {
      CodeOfTheIntervention: false,
      TitleOfTheIntervention: false,
      InterventionShortName: false,
      InterventionDescription: false,
    },
    dateFrom: "",
    dateTo: ""
  }

  search(): void {
    this.onSearch.emit({...this.searchFields});
  }

  reset(): void {
    this.searchFields = {
      countryOption: 0,
      keywordOption: "",
      checkboxOption: {
        CodeOfTheIntervention: false,
        TitleOfTheIntervention: false,
        InterventionShortName: false,
        InterventionDescription: false,
      },
      dateFrom: "",
      dateTo: ""
    }
    this.onReset.emit();
  }

  public getCountries(): Country[] {
    return CountryService.getCountryArray();
  }

  constructor() {
  }

  // ngOnInit(): void {
  //   this.sendSearchFields();
  // }

}
