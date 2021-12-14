import * as workflows from "../files/WorkflowStates.json";
import {WorkflowStates} from "../models/WorkflowState";
import {Injectable} from "@angular/core";

Injectable()
export class WorkflowService {

  public getAllWorkflowList() {
    return workflows;
  }

  public getWorkflowArray() {
    return this.getAllWorkflowList().data
      .map(currentWorkflow =>
        new WorkflowStates(
          currentWorkflow.WFSTATEID,
          currentWorkflow.name)
      );
  }

  public getWorkflowById(workflowId: number): WorkflowStates {
    return this.getWorkflowArray().find(currentWorkflow => currentWorkflow.WFSTATEID === workflowId);
  }

  public getWorkflowName(workflow: WorkflowStates): string {
    return workflow.name["3"];
  }
}
