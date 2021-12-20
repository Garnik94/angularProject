import {WorkflowStates} from "../models/WorkflowState";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WorkflowStateInterface} from "../interfaces/WorkflowStateInterface";
import {map} from "rxjs/operators";
import {User} from "../models/User";
import {UserInterface} from "../interfaces/UserInterface";

@Injectable()
export class WorkflowService {

  workflowStates: WorkflowStates[] = [];

  constructor(private http: HttpClient) {
  }

  public getWorkflowStates() {
    return this.http.get("/assets/data/WorkflowStates.json")
      .pipe(
        map((data: any) => {
          return data.data.map((currentWorkflow: any) =>
            new WorkflowStates(
              (currentWorkflow as WorkflowStateInterface).WFSTATEID,
              (currentWorkflow as WorkflowStateInterface).name

          ));
        })
      )
  }

  public getWorkflowById(workflowId: number): WorkflowStates {
    return this.workflowStates.find(currentWorkflow => currentWorkflow.WFSTATEID === workflowId);
  }

  public getWorkflowName(workflow: WorkflowStates): string {
    return workflow.name["3"];
  }
}
