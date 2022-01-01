import {Pipe, PipeTransform} from '@angular/core';
import {UserService} from "../service/UserService";
import {CountryService} from "../service/CountryService";
import {WorkflowService} from "../service/WorkflowService";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Pipe({
  name: 'getName'
})
export class GetNamePipe implements PipeTransform {

  constructor(private countryService: CountryService,
              private workflowService: WorkflowService,
              private userService: UserService) {
  }

  transform(value: number, service: string): Observable<any> {
    if (service === "Country") {
      return this.countryService.countries$
        .pipe(
          map(countries => this.countryService.getCountryName(value, countries)
          ));
    } else if (service === "User") {
      return this.userService.users$
        .pipe(
          map(users => this.userService.getUserName(value, users)
          ));
    } else {
      return this.workflowService.workflowStates$
        .pipe(
          map(workflowStates => this.workflowService.getWorkflowName(value, workflowStates)
          ));
    }
  }

}
