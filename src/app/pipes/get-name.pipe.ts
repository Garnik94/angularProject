import { Pipe, PipeTransform } from '@angular/core';
import {UserService} from "../service/UserService";
import {CountryService} from "../service/CountryService";
import {WorkflowService} from "../service/WorkflowService";

@Pipe({
  name: 'getName'
})
export class GetNamePipe implements PipeTransform {

  constructor(
    private countryServiceInstance: CountryService,
    private workflowServiceInstance: WorkflowService,
    private userServiceInstance: UserService) {
  }

  transform(value: any, service: string): any {
    if (service === "Country") {
      return this.countryServiceInstance.getCountryName(this.countryServiceInstance.getCountryById(value));
    } else if (service === "Workflow"){
      return this.workflowServiceInstance.getWorkflowName(this.workflowServiceInstance.getWorkflowById(value));
    } else if (service === "User"){
      return this.userServiceInstance.getUserName(this.userServiceInstance.getUserById(value));
    }
  }

}
