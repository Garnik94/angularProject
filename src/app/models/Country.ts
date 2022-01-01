export class Country {

  constructor(
    private _CountryId: number,
    private _DeletedBy: any,
    private _ISOcode: string,
    private _name: { "3": string; "4": string },
    private _DeletedOn: any,
    private _Level: number,
    private _HasSpecificZone: boolean) {
  }


  get CountryId(): number {
    return this._CountryId;
  }

  set CountryId(value: number) {
    this._CountryId = value;
  }

  get DeletedBy(): any {
    return this._DeletedBy;
  }

  set DeletedBy(value: any) {
    this._DeletedBy = value;
  }

  get ISOcode(): string {
    return this._ISOcode;
  }

  set ISOcode(value: string) {
    this._ISOcode = value;
  }

  get name(): { "3": string; "4": string } {
    return this._name;
  }

  set name(value: { "3": string; "4": string }) {
    this._name = value;
  }

  get DeletedOn(): any {
    return this._DeletedOn;
  }

  set DeletedOn(value: any) {
    this._DeletedOn = value;
  }

  get Level(): number {
    return this._Level;
  }

  set Level(value: number) {
    this._Level = value;
  }

  get HasSpecificZone(): boolean {
    return this._HasSpecificZone;
  }

  set HasSpecificZone(value: boolean) {
    this._HasSpecificZone = value;
  }
}
