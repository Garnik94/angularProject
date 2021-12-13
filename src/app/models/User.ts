export class User {

  constructor(
    private _Email: string,
    private _UserID: number,
    private _name: { "3": string; "4": string },
    private _StatusID: number) {
  }


  get Email(): string {
    return this._Email;
  }

  set Email(value: string) {
    this._Email = value;
  }

  get UserID(): number {
    return this._UserID;
  }

  set UserID(value: number) {
    this._UserID = value;
  }

  get name(): { "3": string; "4": string } {
    return this._name;
  }

  set name(value: { "3": string; "4": string }) {
    this._name = value;
  }

  get StatusID(): number {
    return this._StatusID;
  }

  set StatusID(value: number) {
    this._StatusID = value;
  }
}
