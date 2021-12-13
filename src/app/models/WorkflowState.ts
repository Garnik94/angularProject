export class WorkflowStates {

  constructor(
    private _WFSTATEID: number,
    private _name: { "3": string; "4": string }) {
  }

  get WFSTATEID(): number {
    return this._WFSTATEID;
  }

  set WFSTATEID(value: number) {
    this._WFSTATEID = value;
  }

  get name(): { "3": string; "4": string } {
    return this._name;
  }

  set name(value: { "3": string; "4": string }) {
    this._name = value;
  }
}

