import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {Intervention} from "../models/Intervention";
import {InterventionService} from "../service/InterventionService";
import {WorkflowService} from "../service/WorkflowService";
import {UserService} from "../service/UserService";
import {FormControl, FormGroup} from "@angular/forms";
import {zip} from "rxjs";
import {CountryService} from "../service/CountryService";
import {Router} from "@angular/router";

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnChanges {

  @Input()
  searchOptions: FormGroup;

  tempInterventionsBeforeSearch: Intervention[];
  countOfVisibleData: FormControl = new FormControl(this.interventionService.filteredInterventions.length);
  countOfPages: number[];
  totalLength: number;
  page: number = 1;

  constructor(
    public interventionService: InterventionService,
    public countryService: CountryService,
    public userService: UserService,
    public workflowService: WorkflowService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    // this.interventionService.getInterventions();
    // this.countryService.getCountries();
    zip(
      // this.userService.getUsers(),
      // this.workflowService.getWorkflowStates(),
      // this.interventionService.getInterventions()
    )
      .subscribe(allResponses => {
          // this.userService.users = allResponses[0];
          // this.workflowService.workflowStates = allResponses[0];
          // this.interventionService.allInterventions = allResponses[2];
          // this.interventionService.filteredInterventions = allResponses[2];
          this.tempInterventionsBeforeSearch = this.interventionService.allInterventions;

          this.totalLength = this.interventionService.filteredInterventions.length;
          this.countOfPages = [1];
        }
      )
    // this.interventionService.getInterventions().subscribe(interventions => {
    //   this.interventionService.filteredInterventions = interventions;
    // })
  }

  logInterventions(){
    // console.log(this.interventionService.interventions$);
    return this.interventionService.getInterventions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.interventionService.searchOptions = this.searchOptions;
    this.interventionService.filteredInterventions = this.tempInterventionsBeforeSearch;
    this.interventionService.generalSearch();
  }

  sliceFilteredData() {
    let startIndex = 0;
    let endIndex = Number(this.countOfVisibleData.value);
    this.countOfPages.length = Math.ceil(this.interventionService.filteredInterventions.length / Number(this.countOfVisibleData.value));
    let slicedArray: Array<Array<Intervention>> = [];
    for (let i = 0; i < this.countOfPages.length; i++) {
      slicedArray.push(this.interventionService.filteredInterventions.slice(startIndex, endIndex));
      startIndex = endIndex;
      endIndex += Number(this.countOfVisibleData.value);
    }
    return slicedArray;
  }

  InterventionsBeforePaging: Intervention[];

  getCurrentPage(currentPage: number) {
    if (!this.interventionService.isPagingMode){
      this.InterventionsBeforePaging = Array.from(this.interventionService.filteredInterventions);
    }
    this.interventionService.filteredInterventions = Array.from(this.InterventionsBeforePaging);
    // console.log(this.interventionService.filteredInterventions);
    // this.interventionService.filteredInterventions = Array.from(this.tempInterventionsBeforeSearch);
    this.interventionService.filteredInterventions = this.sliceFilteredData()[currentPage];
    this.interventionService.isPagingMode = true;
  }

}
