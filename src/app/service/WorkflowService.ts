import * as workflows from "../files/WorkflowStates.json";
import {WorkflowStates} from "../models/WorkflowState";

export class WorkflowService {

  public static getAllWorkflowList() {
    return workflows;
  }

  public static getWorkflowArray() {
    return WorkflowService.getAllWorkflowList().data
      .map(currentWorkflow =>
        new WorkflowStates(
          currentWorkflow.WFSTATEID,
          currentWorkflow.name)
      );
  }

  public static getWorkflowById(workflowId: number): WorkflowStates {
    return this.getWorkflowArray().find(currentWorkflow => currentWorkflow.WFSTATEID === workflowId);
  }

  public static getWorkflowName(workflow: WorkflowStates): string {
    return workflow.name["3"];
  }
}
