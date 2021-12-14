import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Country} from "../models/Country";
import {CountryService} from "../service/CountryService";

import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(public countryServiceInstance: CountryService) {
  }

  @Output()
  onSearch = new EventEmitter<FormGroup>();
  @Output()
  onReset = new EventEmitter<void>();

  title: string = "Search";

  searchFields: FormGroup = new FormGroup({
      countryOption: new FormControl(0),
      keywordOption: new FormControl(""),
      CodeOfTheIntervention: new FormControl(false),
      TitleOfTheIntervention: new FormControl(false),
      InterventionShortName: new FormControl(false),
      InterventionDescription: new FormControl(false),
      dateFrom: new FormControl(""),
      dateTo: new FormControl("")
    }
  )

  search(): void {
    this.onSearch.emit({...this.searchFields} as FormGroup);
  }

  reset(): void {
    this.searchFields = new FormGroup({
        countryOption: new FormControl(0),
        keywordOption: new FormControl(""),
        CodeOfTheIntervention: new FormControl(false),
        TitleOfTheIntervention: new FormControl(false),
        InterventionShortName: new FormControl(false),
        InterventionDescription: new FormControl(false),
        dateFrom: new FormControl(""),
        dateTo: new FormControl("")
      }
    )
    this.onReset.emit();
  }

  // public getCountries(): Country[] {
  //   return this.countryServiceInstance.getCountryArray();
  // }

  // ngOnInit(): void {
  //   this.sendSearchFields();
  // }

}
