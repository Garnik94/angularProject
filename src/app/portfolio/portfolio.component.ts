import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Intervention} from "../models/Intervention";
import {InterventionService} from "../service/InterventionService";
import {WorkflowService} from "../service/WorkflowService";
import {UserService} from "../service/UserService";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {CountryService} from "../service/CountryService";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnChanges {

  @Input()
  searchOptions: FormGroup;

  tempInterventionsBeforeSearch$: Observable<Intervention[]>;

  countOfVisibleData: FormControl = new FormControl(this.interventionService.filteredInterventions$
    .subscribe(interventions => interventions.length));

  countOfPages: number[];
  totalLength: number;
  page: number = 1;

  selectedStatus: FormControl = new FormControl(0);

  constructor(
    public interventionService: InterventionService,
    public countryService: CountryService,
    public userService: UserService,
    public workflowService: WorkflowService,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.selectedStatus.valueChanges.subscribe(selectedValue => {
      this.interventionService.onStatusChange(selectedValue);
    })
    this.tempInterventionsBeforeSearch$ = this.interventionService.allInterventions$;
    this.countOfPages = Array(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.interventionService.searchOptions = this.searchOptions;
    if (this.tempInterventionsBeforeSearch$ !== undefined) {
      this.interventionService.filteredInterventions$ = this.tempInterventionsBeforeSearch$;
    }
    this.interventionService.generalSearch(this.selectedStatus);
  }

  sliceFilteredData(): Observable<Array<Intervention[]>> {
    return this.interventionService.filteredInterventions$
      .pipe(
        map((interventions: any) => {
          let startIndex = 0;
          let endIndex = Number(this.countOfVisibleData.value);
          this.countOfPages.length = Math.ceil(interventions.length / Number(this.countOfVisibleData.value));
          let slicedArray: Array<Intervention[]> = [];
          for (let i = 0; i < this.countOfPages.length; i++) {
            slicedArray.push(interventions.slice(startIndex, endIndex));
            startIndex = endIndex;
            endIndex += Number(this.countOfVisibleData.value);
          }
          return slicedArray;
        })
      )
  }

  InterventionsBeforePaging$: Observable<Intervention[]>;

  getCurrentPage(currentPage: number) {
    if (!this.interventionService.isPagingMode) {
      this.InterventionsBeforePaging$ = this.interventionService.filteredInterventions$;
    }
    this.interventionService.filteredInterventions$ = this.InterventionsBeforePaging$;
    // this.interventionService.filteredInterventions$ = this.tempInterventionsBeforeSearch$;
    this.interventionService.filteredInterventions$ = this.sliceFilteredData()
      .pipe(
        map(slicedInterventions => {
            this.interventionService.isPagingMode = true;
            return slicedInterventions[currentPage]
          }
        ));
  }
}
