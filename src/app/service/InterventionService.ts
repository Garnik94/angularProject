import * as interventions from "../files/response.json";
import {Intervention} from "../models/Intervention";
import {Country} from "../models/Country";
import {Injectable} from "@angular/core";

@Injectable()
export class InterventionService {

  public getAllInterventionsList() {
    return interventions;
  }

  public getInterventionArray() {
    return this.getAllInterventionsList().data
      .map(currentIntervention =>
        new Intervention(
          currentIntervention.ActualEndDate,
          currentIntervention.InterventionCode,
          currentIntervention.Description,
          currentIntervention.InterventionInstanceId,
          currentIntervention.InterventionID,
          currentIntervention.DateUpdated,
          currentIntervention.Title,
          currentIntervention.ShortName,
          currentIntervention.ActualStartDate,
          currentIntervention.interventionPartnerInstitutions,
          currentIntervention.lastActionComment,
          currentIntervention.workflowStateId,
          currentIntervention.InterventionCountryID,
          currentIntervention.ExternalReferenceNumber,
          currentIntervention.InterventionInstanceId,
          currentIntervention.SAEndDate,
          currentIntervention.CommericalName,
          currentIntervention.UpdatedUserID,
          currentIntervention.MasterID)
      );
  }
}
