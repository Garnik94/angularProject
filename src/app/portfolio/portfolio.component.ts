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

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnChanges {

  tempInterventionsBeforeSearch: Intervention[];

  constructor(
    public interventionService: InterventionService,
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
        }
      )
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.interventionService.searchOptions = this.searchOptions;
    this.interventionService.filteredInterventions = this.tempInterventionsBeforeSearch;
    this.interventionService.generalSearch();
  }
}
