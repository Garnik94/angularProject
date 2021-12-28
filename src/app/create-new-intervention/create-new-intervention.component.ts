import { Component, OnInit } from '@angular/core';
import {InterventionService} from "../service/InterventionService";
import {CountryService} from "../service/CountryService";
import {UserService} from "../service/UserService";
import {WorkflowService} from "../service/WorkflowService";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Intervention} from "../models/Intervention";

@Component({
  selector: 'app-create-new-intervention',
  templateUrl: './create-new-intervention.component.html',
  styleUrls: ['./create-new-intervention.component.css']
})
export class CreateNewInterventionComponent implements OnInit {

  isSubmitButtonPressed = false;

  constructor(public interventionService: InterventionService,
              public countryService: CountryService,
              public userService: UserService,
              public workflowService: WorkflowService,
              public router: Router) { }

  ngOnInit(): void {
  }

  newInterventionForm: FormGroup = new FormGroup({
      InterventionCode: new FormControl("", Validators.required),
      ShortName: new FormControl("", Validators.required),
      CommericalName: new FormControl("", Validators.required),
      Country: new FormControl(0, Validators.required),
      Status: new FormControl(0, Validators.required),
      User: new FormControl(0, Validators.required),
      LastUpdatedOn: new FormControl(new Date(), Validators.required),
    }
  )

  createNewIntervention() {
    return JSON.stringify({
        ActualEndDate: null,
        InterventionCode: this.newInterventionForm.value["InterventionCode"],
        Description: null,
        InterventionProgrammeInstanceID: null,
        InterventionID: null,
        DateUpdated: this.newInterventionForm.value["LastUpdatedOn"],
        Title: null,
        ShortName: this.newInterventionForm.value["ShortName"],
        ActualStartDate: null,
        interventionPartnerInstitutions: null,
        lastActionComment: null,
        workflowStateId: Number(this.newInterventionForm.value["Status"]),
        InterventionCountryID: Number(this.newInterventionForm.value["Country"]),
        ExternalReferenceNumber: null,
        InterventionInstanceId: null,
        SAEndDate: null,
        CommericalName: this.newInterventionForm.value["CommericalName"],
        UpdatedUserID: Number(this.newInterventionForm.value["User"]),
        MasterID: null
      }
    )
  }

  printNewInterventionJSON() {
    this.isSubmitButtonPressed = true;
    return this.createNewIntervention();
  }

  goToPortfolio() {
    this.router.navigate(["interventions"])
  }

  onSelect(selectedIntervention: Intervention) {
    this.router.navigate(["intervention", selectedIntervention.InterventionInstanceId]);
  }

}
