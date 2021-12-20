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
    this.userService.getUsers()
      .subscribe((users: any) => {
        this.userService.users = users;
      });
    this.workflowService.getWorkflowStates()
      .subscribe((workflowStates: any) => {
        this.workflowService.workflowStates = workflowStates;
      });
    this.interventionService.getInterventions()
      .subscribe((interventions: any) => {
        this.interventionService.allInterventions = interventions;
        this.interventionService.filteredInterventions = interventions;
        this.tempInterventionsBeforeSearch = this.interventionService.allInterventions;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.interventionService.searchOptions = this.searchOptions;
    this.interventionService.filteredInterventions = this.tempInterventionsBeforeSearch;
    this.interventionService.generalSearch();
  }
}
