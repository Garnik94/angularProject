import {WorkflowStates} from "../models/WorkflowState";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WorkflowStateInterface} from "../interfaces/WorkflowStateInterface";
import {map} from "rxjs/operators";

@Injectable()
export class WorkflowService {

  workflowStates: WorkflowStates[] = [];

  constructor(private http: HttpClient) {
    this.http.get("/assets/data/WorkflowStates.json")
      .pipe(
        map((data: any) => {
          return data.data.map((currentWorkflow: any) =>
            new WorkflowStates(
              (currentWorkflow as WorkflowStateInterface).WFSTATEID,
              (currentWorkflow as WorkflowStateInterface).name
            ));
        })
      ).subscribe(workflowStates => this.workflowStates = workflowStates);
  }

  // public getWorkflowStates() {
  //   return this.http.get("/assets/data/WorkflowStates.json")
  //     .pipe(
  //       map((data: any) => {
  //         return data.data.map((currentWorkflow: any) =>
  //           new WorkflowStates(
  //             (currentWorkflow as WorkflowStateInterface).WFSTATEID,
  //             (currentWorkflow as WorkflowStateInterface).name
  //         ));
  //       })
  //     )
  // }

  public getWorkflowById(workflowId: number): WorkflowStates {
    return this.workflowStates.find(currentWorkflow => currentWorkflow.WFSTATEID === workflowId);
  }

  public getWorkflowName(workflowId: number): string {
    return this.getWorkflowById(workflowId).name["3"];
  }
}
