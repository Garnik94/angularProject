export class Country {

  constructor(
    private _countryId: number,
    private _deletedBy: any,
    private _isoCode: string,
    private _name: { "3": string; "4": string },
    private _deletedOn: any,
    private _level: number,
    private _hasSpecificZone: boolean) {
  }


  get countryId(): number {
    return this._countryId;
  }

  set countryId(value: number) {
    this._countryId = value;
  }

  get deletedBy(): any {
    return this._deletedBy;
  }

  set deletedBy(value: any) {
    this._deletedBy = value;
  }

  get isoCode(): string {
    return this._isoCode;
  }

  set isoCode(value: string) {
    this._isoCode = value;
  }

  get name(): { "3": string; "4": string } {
    return this._name;
  }

  set name(value: { "3": string; "4": string }) {
    this._name = value;
  }

  get deletedOn(): any {
    return this._deletedOn;
  }

  set deletedOn(value: any) {
    this._deletedOn = value;
  }

  get level(): number {
    return this._level;
  }

  set level(value: number) {
    this._level = value;
  }

  get hasSpecificZone(): boolean {
    return this._hasSpecificZone;
  }

  set hasSpecificZone(value: boolean) {
    this._hasSpecificZone = value;
  }
}
