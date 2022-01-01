import {WorkflowStates} from "../models/WorkflowState";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable()
export class WorkflowService {

  private _workflowStates$: Observable<WorkflowStates[]>;

  constructor(private http: HttpClient) {
    this._workflowStates$ = this.http.get("/assets/data/WorkflowStates.json")
      .pipe(
        map((data: any) =>data.data),
        shareReplay({bufferSize: 1, refCount: true})
      )
  }

  get workflowStates$(): Observable<WorkflowStates[]> {
    return this._workflowStates$;
  }

  public getWorkflowById(workflowId: number, workflowStates: WorkflowStates[]): WorkflowStates {
    return workflowStates.find(currentWorkflow => currentWorkflow.WFSTATEID === workflowId);
  }

  public getWorkflowName(workflowId: number, workflowStates: WorkflowStates[]): string {
    return this.getWorkflowById(workflowId, workflowStates).name["3"];
  }

}
