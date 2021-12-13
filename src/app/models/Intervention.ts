export class Intervention {

  constructor(
    private _ActualEndDate: string,
    private _InterventionCode: string,
    private _Description: string,
    private _InterventionProgrammeInstanceID: any,
    private _InterventionID: number,
    private _DateUpdated: number,
    private _Title: string,
    private _ShortName: string,
    private _ActualStartDate: string,
    private _interventionPartnerInstitutions: { PartnerInstitutionOrganisationID: number }[],
    private _lastActionComment: { "3": any; "4": any },
    private _workflowStateId: number,
    private _InterventionCountryID: number,
    private _ExternalReferenceNumber: any,
    private _InterventionInstanceId: number,
    private _SAEndDate: string,
    private _CommericalName: string,
    private _UpdatedUserID: number,
    private _MasterID: number) {
  }


  get ActualEndDate(): string {
    return this._ActualEndDate;
  }

  set ActualEndDate(value: string) {
    this._ActualEndDate = value;
  }

  get InterventionCode(): string {
    return this._InterventionCode;
  }

  set InterventionCode(value: string) {
    this._InterventionCode = value;
  }

  get Description(): string {
    return this._Description;
  }

  set Description(value: string) {
    this._Description = value;
  }

  get InterventionProgrammeInstanceID(): any {
    return this._InterventionProgrammeInstanceID;
  }

  set InterventionProgrammeInstanceID(value: any) {
    this._InterventionProgrammeInstanceID = value;
  }

  get InterventionID(): number {
    return this._InterventionID;
  }

  set InterventionID(value: number) {
    this._InterventionID = value;
  }

  get DateUpdated(): number {
    return this._DateUpdated;
  }

  set DateUpdated(value: number) {
    this._DateUpdated = value;
  }

  get Title(): string {
    return this._Title;
  }

  set Title(value: string) {
    this._Title = value;
  }

  get ShortName(): string {
    return this._ShortName;
  }

  set ShortName(value: string) {
    this._ShortName = value;
  }

  get ActualStartDate(): string {
    return this._ActualStartDate;
  }

  set ActualStartDate(value: string) {
    this._ActualStartDate = value;
  }

  get interventionPartnerInstitutions(): { PartnerInstitutionOrganisationID: number }[] {
    return this._interventionPartnerInstitutions;
  }

  set interventionPartnerInstitutions(value: { PartnerInstitutionOrganisationID: number }[]) {
    this._interventionPartnerInstitutions = value;
  }

  get lastActionComment(): { "3": any; "4": any } {
    return this._lastActionComment;
  }

  set lastActionComment(value: { "3": any; "4": any }) {
    this._lastActionComment = value;
  }

  get workflowStateId(): number {
    return this._workflowStateId;
  }

  set workflowStateId(value: number) {
    this._workflowStateId = value;
  }

  get InterventionCountryID(): number {
    return this._InterventionCountryID;
  }

  set InterventionCountryID(value: number) {
    this._InterventionCountryID = value;
  }

  get ExternalReferenceNumber(): any {
    return this._ExternalReferenceNumber;
  }

  set ExternalReferenceNumber(value: any) {
    this._ExternalReferenceNumber = value;
  }

  get InterventionInstanceId(): number {
    return this._InterventionInstanceId;
  }

  set InterventionInstanceId(value: number) {
    this._InterventionInstanceId = value;
  }

  get SAEndDate(): string {
    return this._SAEndDate;
  }

  set SAEndDate(value: string) {
    this._SAEndDate = value;
  }

  get CommericalName(): string {
    return this._CommericalName;
  }

  set CommericalName(value: string) {
    this._CommericalName = value;
  }

  get UpdatedUserID(): number {
    return this._UpdatedUserID;
  }

  set UpdatedUserID(value: number) {
    this._UpdatedUserID = value;
  }

  get MasterID(): number {
    return this._MasterID;
  }

  set MasterID(value: number) {
    this._MasterID = value;
  }
}
