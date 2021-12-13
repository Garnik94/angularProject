import * as interventions from "../files/response.json";
import {Intervention} from "../models/Intervention";
import {Country} from "../models/Country";

export class InterventionService {

  public static getAllInterventionsList() {
    return interventions;
  }

  public static getInterventionArray() {
    return InterventionService.getAllInterventionsList().data
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
