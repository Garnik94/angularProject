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
import {FormGroup} from "@angular/forms";
import {zip} from "rxjs";
import {CountryService} from "../service/CountryService";

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnChanges {

  tempInterventionsBeforeSearch: Intervention[];

  countOfVisibleData: number;

  countOfPages: number[];

  isCreateButtonPressed: boolean = false;

  shawInterventionDetails = false;

  interventionDetails: string;

  constructor(
    public interventionService: InterventionService,
    public countryService: CountryService,
    public userService: UserService,
    public workflowService: WorkflowService,
  ) {
  }

  @Input()
  searchOptions: FormGroup;

  ngOnInit(): void {
    zip(
      this.userService.getUsers(),
      this.workflowService.getWorkflowStates(),
      this.interventionService.getInterventions())
      .subscribe(allResponses => {
          this.userService.users = allResponses[0];
          this.workflowService.workflowStates = allResponses[1];
          this.interventionService.allInterventions = allResponses[2];
          this.interventionService.filteredInterventions = allResponses[2];
          this.tempInterventionsBeforeSearch = this.interventionService.allInterventions;

          this.countOfVisibleData = this.interventionService.filteredInterventions.length;
          this.countOfPages = Array(1);
        }
      )
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.interventionService.searchOptions = this.searchOptions;
    this.interventionService.filteredInterventions = this.tempInterventionsBeforeSearch;
    this.interventionService.generalSearch();
  }

  sliceFilteredData() {
    let startIndex = 0;
    let endIndex = Number(this.countOfVisibleData);
    this.countOfPages.length = Math.ceil(this.interventionService.filteredInterventions.length / Number(this.countOfVisibleData));
    let slicedArray: Array<Array<Intervention>> = [];
    console.log("length " + this.countOfPages.length);
    for (let i = 0; i < this.countOfPages.length; i++) {
      slicedArray.push(this.interventionService.filteredInterventions.slice(startIndex, endIndex));
      startIndex = endIndex;
      endIndex += startIndex;
    }
    return slicedArray;
  }

  getCurrentPage(currentPage: number) {
    this.interventionService.filteredInterventions = Array.from(this.tempInterventionsBeforeSearch);
    this.interventionService.filteredInterventions = this.sliceFilteredData()[currentPage];
  }

  clickRow(intervention: Intervention){
    this.shawInterventionDetails = true;
    this.interventionDetails = `
       ActualEndDate: ${intervention.ActualEndDate}
       InterventionCode: ${intervention.InterventionCode}
       Description: ${intervention.Description}
       InterventionProgrammeInstanceID: ${intervention.InterventionProgrammeInstanceID}
       InterventionID: ${intervention.InterventionID}
       DateUpdated: ${intervention.DateUpdated}
       Title: ${intervention.Title}
       ShortName: ${intervention.ShortName}
       ActualStartDate: ${intervention.ActualStartDate}
       interventionPartnerInstitutions: ${intervention.interventionPartnerInstitutions}
       lastActionComment: ${intervention.lastActionComment}
       workflowStateId: ${intervention.workflowStateId}
       InterventionCountryID: ${intervention.InterventionCountryID}
       ExternalReferenceNumber: ${intervention.ExternalReferenceNumber}
       InterventionInstanceId: ${intervention.InterventionInstanceId}
       SAEndDate: ${intervention.SAEndDate}
       CommericalName: ${intervention.CommericalName}
       UpdatedUserID: ${intervention.UpdatedUserID}
       MasterID: ${intervention.MasterID}`
  }

}
