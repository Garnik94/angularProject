import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CountryService} from "../service/CountryService";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  @Output()
  onSearch = new EventEmitter<FormGroup>();
  @Output()
  onReset = new EventEmitter<void>();
  title: string = "Search";

  constructor(
    public countryService: CountryService) {
  }

  ngOnInit(): void {
    this.countryService.getCountries()
    .subscribe((countries: any) => {this.countryService.countries = countries});
  }

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

}
