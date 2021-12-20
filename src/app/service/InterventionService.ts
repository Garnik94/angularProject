import {Intervention} from "../models/Intervention";
import {Country} from "../models/Country";
import {Injectable, Injector} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {InterventionInterface} from "../interfaces/InterventionInterface";
import {map} from "rxjs/operators";
import {CountryService} from "./CountryService";
import {UserService} from "./UserService";
import {WorkflowService} from "./WorkflowService";
import {FormGroup} from "@angular/forms";

@Injectable()
export class InterventionService {

  allInterventions: Intervention[] = [];

  filteredInterventions: Intervention[] = [];

  tempInterventionsBeforeStatusChange: Intervention[];

  searchOptions: FormGroup;

  selectStatus: number = 0;

  isSearchMode = false;

  constructor(
    private http: HttpClient,
    public countryService: CountryService,
    public userService: UserService,
    public workflowService: WorkflowService,
  ) {
  }

  public getInterventions() {
    return this.http.get("/assets/data/response.json")
      .pipe(
        map((data: any) => {
          let responses = data["data"] as Array<Intervention>;
          console.log(responses[0]);
          return data.data.map((currentIntervention: any) =>
            new Intervention(
              (currentIntervention as InterventionInterface).ActualEndDate,
              (currentIntervention as InterventionInterface).InterventionCode,
              (currentIntervention as InterventionInterface).Description,
              (currentIntervention as InterventionInterface).InterventionInstanceId,
              (currentIntervention as InterventionInterface).InterventionID,
              (currentIntervention as InterventionInterface).DateUpdated,
              (currentIntervention as InterventionInterface).Title,
              (currentIntervention as InterventionInterface).ShortName,
              (currentIntervention as InterventionInterface).ActualStartDate,
              (currentIntervention as InterventionInterface).interventionPartnerInstitutions,
              (currentIntervention as InterventionInterface).lastActionComment,
              (currentIntervention as InterventionInterface).workflowStateId,
              (currentIntervention as InterventionInterface).InterventionCountryID,
              (currentIntervention as InterventionInterface).ExternalReferenceNumber,
              (currentIntervention as InterventionInterface).InterventionInstanceId,
              (currentIntervention as InterventionInterface).SAEndDate,
              (currentIntervention as InterventionInterface).CommericalName,
              (currentIntervention as InterventionInterface).UpdatedUserID,
              (currentIntervention as InterventionInterface).MasterID)
          );
        })
      )
  }

  onStatusChange(): void {
    if (!this.isSearchMode) {
      this.tempInterventionsBeforeStatusChange = Array.from(this.filteredInterventions);
    }
    if (Number(this.selectStatus) === 0) {
      this.filteredInterventions = this.tempInterventionsBeforeStatusChange;
      this.isSearchMode = false;
      return;
    } else {
      this.filteredInterventions = this.tempInterventionsBeforeStatusChange.filter(currentIntervention => {
        return currentIntervention.workflowStateId === Number(this.selectStatus);
      });
      this.isSearchMode = true;
    }
  }

  /**-------------Filter By Search Fields--------------*/

  // TODO: reset-i jamanak ete status ka @ntrac filtrel @st status-i
  // DONE
  generalSearch(): void {
    if (this.searchOptions === null && this.isSearchMode) {
      this.isSearchMode = false;
      this.filteredInterventions = this.allInterventions;
      this.onStatusChange();
    } else if (this.searchOptions === null && !this.isSearchMode) {
      this.filteredInterventions = this.allInterventions;
    } else {
      this.filterBYCountry();
      this.filterByKeywordOption();
      this.filterByActualDate();
    }
  }

  filterBYCountry(): void {
    const searchOptions = this.searchOptions.value;
    this.onStatusChange();
    if (searchOptions.countryOption && searchOptions.countryOption !== 0) {
      this.filteredInterventions = this.filteredInterventions
        .filter(currentElement => {
            return currentElement.InterventionCountryID === Number(searchOptions.countryOption);
          }
        );
    }
  }

  filterByKeywordOption(): void {
    const searchOptions = this.searchOptions.value;
    if (searchOptions.keywordOption && (
      searchOptions.CodeOfTheIntervention ||
      searchOptions.TitleOfTheIntervention ||
      searchOptions.InterventionShortName ||
      searchOptions.InterventionDescription)) {

      const keywordOption: string = searchOptions.keywordOption.trim();
      this.filteredInterventions = this.filteredInterventions.filter(intervention =>
        (searchOptions.CodeOfTheIntervention && intervention.InterventionCode.includes(keywordOption)) ||
        (searchOptions.TitleOfTheIntervention && intervention.Title.includes(keywordOption)) ||
        (searchOptions.InterventionShortName && intervention.ShortName.includes(keywordOption)) ||
        (searchOptions.InterventionDescription && intervention.Description.includes(keywordOption)));
    }
  }

  filterByActualDate(): void {
    const searchOptions = this.searchOptions.value;
    if (searchOptions.dateFrom && searchOptions.dateTo) {
      this.filterByFromDate(searchOptions);
      this.filterByToDate(searchOptions);
    } else if (searchOptions.dateFrom && !searchOptions.dateTo) {
      this.filterByFromDate(searchOptions);
    } else if (!searchOptions.dateFrom && searchOptions.dateTo) {
      this.filterByToDate(searchOptions);
    }
  }

  filterByFromDate(searchOptions: any) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention => {
        const actualStartDate = new Date(intervention.ActualStartDate);
        return new Date(searchOptions.dateFrom) < actualStartDate;
      }
    );
  }

  filterByToDate(searchOptions: any) {
    this.filteredInterventions = this.filteredInterventions.filter(intervention => {
        const actualStartDate = new Date(intervention.ActualStartDate);
        return actualStartDate < new Date(searchOptions.dateTo);
      }
    );
  }


  /**------------------------------------------------------------------------------------------------------------*/

  public sortInterventionList(fieldName: string, isAsc: boolean) {
    switch (fieldName) {
      case "InterventionCode":
        this.sortByCode_ShortName_CommericalName(isAsc, fieldName);
        break;
      case "ShortName":
        this.sortByCode_ShortName_CommericalName(isAsc, fieldName);
        break;
      case "CommericalName":
        this.sortByCode_ShortName_CommericalName(isAsc, fieldName);
        break;
      case "Country":
        this.sortByCountry(isAsc);
        break;
      case "Status":
        this.sortByStatus(isAsc);
        break;
      case "User":
        this.sortByUsers(isAsc);
        break;
      case "UpdateOn":
        this.sortByDate(isAsc);
        break;
    }
  }

  sortByCode_ShortName_CommericalName(isAsc: boolean, propertyName: string): void {
    if (isAsc) {
      this.filteredInterventions.sort((o1, o2) =>
        (o1 as any)[propertyName].localeCompare((o2 as any)[propertyName]));
    } else {
      this.filteredInterventions.sort((o1, o2) =>
        (o2 as any)[propertyName].localeCompare((o1 as any)[propertyName]));
    }
  }

  sortByCountry(isAsc: boolean): void {
    if (isAsc) {
      this.filteredInterventions.sort((o1, o2) =>
        this.countryService.getCountryName(o1.InterventionCountryID)
          .localeCompare(this.countryService.getCountryName(o2.InterventionCountryID)))
    } else {
      this.filteredInterventions.sort((o1, o2) =>
        this.countryService.getCountryName(o2.InterventionCountryID)
          .localeCompare(this.countryService.getCountryName(o1.InterventionCountryID)))
    }
  }

  sortByStatus(isAsc: boolean): void {
    if (isAsc) {
      this.filteredInterventions.sort((o1, o2) =>
        this.workflowService.getWorkflowName(o1.workflowStateId).localeCompare(
          this.workflowService.getWorkflowName(o2.workflowStateId)));
    } else {
      this.filteredInterventions.sort((o1, o2) =>
        this.workflowService.getWorkflowName(o2.workflowStateId)
          .localeCompare(this.workflowService.getWorkflowName(o1.workflowStateId)));
    }
  }

  sortByUsers(isAsc: boolean): void {
    if (isAsc) {
      this.filteredInterventions.sort((o1, o2) =>
        this.userService.getUserName(o1.UpdatedUserID)
          .localeCompare(this.userService.getUserName(o2.UpdatedUserID)));
    } else {
      this.filteredInterventions.sort((o1, o2) =>
        this.userService.getUserName(o2.UpdatedUserID)
          .localeCompare(this.userService.getUserName(o1.UpdatedUserID)));
    }
  }

  sortByDate(isAsc: boolean): void {
    if (isAsc) {
      this.filteredInterventions.sort((o1, o2) =>
        o1.DateUpdated - o2.DateUpdated);
    } else {
      this.filteredInterventions.sort((o1, o2) =>
        o2.DateUpdated - o1.DateUpdated);
    }
  }

  // public getInterventions(sortingOption: { fieldName: string, isAsc: boolean }) {
  //   return this.http.get("/assets/data/response.json")
  //     .pipe(
  //       map((data: any) => {
  //         // TODO: sort data
  //         return data.data;
  //       })
  //     )
  // }
  //
  // public getInterventions(sortingOption: { fieldName: string, isAsc: boolean }, filterData: any, statusId: number) {
  //   return this.http.get("/assets/data/response.json")
  //     .pipe(
  //       map((data: any) => {
  //         // TODO: filter and sort data
  //         return data.data;
  //       })
  //     )
  // }

}
