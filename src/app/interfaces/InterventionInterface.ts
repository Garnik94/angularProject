export interface InterventionInterface {

  ActualEndDate: string,
  InterventionCode: string,
  Description: string,
  InterventionProgrammeInstanceID: any,
  InterventionID: number,
  DateUpdated: number,
  Title: string,
  ShortName: string,
  ActualStartDate: string,
  interventionPartnerInstitutions: { PartnerInstitutionOrganisationID: number }[],
  lastActionComment: { "3": any; "4": any },
  workflowStateId: number,
  InterventionCountryID: number,
  ExternalReferenceNumber: any,
  InterventionInstanceId: number,
  SAEndDate: string,
  CommericalName: string,
  UpdatedUserID: number,
  MasterID: number

}
