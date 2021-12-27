import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from "../service/UserService";
import {CountryService} from "../service/CountryService";
import {WorkflowService} from "../service/WorkflowService";

@Pipe({
  name: 'getName'
})
export class GetNamePipe implements PipeTransform {

  constructor(private countryService: CountryService,
              private workflowService: WorkflowService,
              private userService: UserService) {
  }

  // TODO: don't use any
  transform(value: any, service: string): any {
    if (service === "Country") {
      return this.countryService.getCountryName(value);
    } else if (service === "Workflow") {
      return this.workflowService.getWorkflowName(value);
    } else if (service === "User") {
      return this.userService.getUserName(value);
    }
  }

}
