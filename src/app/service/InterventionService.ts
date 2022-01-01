import {Intervention} from "../models/Intervention";
import {Country} from "../models/Country";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, shareReplay} from "rxjs/operators";
import {CountryService} from "./CountryService";
import {UserService} from "./UserService";
import {WorkflowService} from "./WorkflowService";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {Observable, zip} from "rxjs";
import {WorkflowStates} from "../models/WorkflowState";

@Injectable()
export class InterventionService {

  isPagingMode: boolean = false;

  searchOptions: FormGroup;

  isSearchMode = false;

  public filteredInterventions$: Observable<Intervention[]>;
  public allInterventions$: Observable<Intervention[]>;
  public tempInterventionsBeforeStatusChange$: Observable<Intervention[]>;

  constructor(private http: HttpClient,
              public countryService: CountryService,
              public userService: UserService,
              public workflowService: WorkflowService,
              public router: Router) {

    this.filteredInterventions$ = this.http.get("/assets/data/response.json")
      .pipe(
        map((data: any) => data.data),
        shareReplay({bufferSize: 1, refCount: true})
      )
    this.allInterventions$ = this.filteredInterventions$;
  }

  public getInterventionById(interventionId: number): Observable<Intervention> {
    return this.filteredInterventions$
      .pipe(
        map(interventions => interventions
          .find(currentIntervention => currentIntervention.InterventionInstanceId === interventionId)))
  }

  onStatusChange(selectedStatus: FormControl): void {
    // this.isPagingMode = false;
    if (!this.isSearchMode) {
      this.tempInterventionsBeforeStatusChange$ = this.filteredInterventions$;
    }
    if (Number(selectedStatus.value) === 0) {
      this.filteredInterventions$ = this.tempInterventionsBeforeStatusChange$;
      this.isSearchMode = false;
      return;
    } else {
      this.filteredInterventions$ = this.tempInterventionsBeforeStatusChange$
        .pipe(
          map(interventions => interventions
            .filter(currentIntervention => {
              return currentIntervention.workflowStateId === Number(selectedStatus.value);
            })
          )
        )
      this.isSearchMode = true;
    }
  }

  /**-------------Filter By Search Fields--------------*/

  generalSearch(selectedStatus: FormControl): void {
    this.isPagingMode = false;
    if (this.searchOptions === null && this.isSearchMode) {
      this.isSearchMode = false;
      this.filteredInterventions$ = this.allInterventions$;
      this.onStatusChange(selectedStatus);
    } else if (this.searchOptions === null && !this.isSearchMode) {
      this.filteredInterventions$ = this.allInterventions$;
    } else {
      this.onStatusChange(selectedStatus);
      this.filterBYCountry();
      this.filterByKeywordOption();
      this.filterByActualDate();
    }
  }

  filterBYCountry(): void {
    const searchOptions = this.searchOptions?.value;
    if (searchOptions?.countryOption && searchOptions?.countryOption !== 0) {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.filter(currentIntervention => {
            return currentIntervention.InterventionCountryID === Number(searchOptions.countryOption);
          })));
    }
  }

  filterByKeywordOption(): void {
    const searchOptions = this.searchOptions?.value;
    if (searchOptions?.keywordOption && (
      searchOptions?.CodeOfTheIntervention ||
      searchOptions?.TitleOfTheIntervention ||
      searchOptions?.InterventionShortName ||
      searchOptions?.InterventionDescription)) {

      const keywordOption: string = searchOptions.keywordOption.trim();

      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(intervention =>
            intervention.filter(currentIntervention => {
              return (searchOptions.CodeOfTheIntervention && currentIntervention.InterventionCode.includes(keywordOption)) ||
                (searchOptions.TitleOfTheIntervention && currentIntervention.Title.includes(keywordOption)) ||
                (searchOptions.InterventionShortName && currentIntervention.ShortName.includes(keywordOption)) ||
                (searchOptions.InterventionDescription && currentIntervention.Description.includes(keywordOption))
            })));
    }
  }

  filterByActualDate(): void {
    const searchOptions = this.searchOptions?.value;
    if (searchOptions?.dateFrom && searchOptions?.dateTo) {
      this.filterByFromDate(searchOptions);
      this.filterByToDate(searchOptions);
    } else if (searchOptions?.dateFrom && !searchOptions?.dateTo) {
      this.filterByFromDate(searchOptions);
    } else if (!searchOptions?.dateFrom && searchOptions?.dateTo) {
      this.filterByToDate(searchOptions);
    }
  }

  filterByFromDate(searchOptions: any) {
    this.filteredInterventions$ = this.filteredInterventions$.pipe(
      map(interventions => interventions.filter(intervention => {
        const actualStartDate = new Date(intervention.ActualStartDate);
        return new Date(searchOptions.dateFrom) < actualStartDate;
      })))
  }

  filterByToDate(searchOptions: any) {
    this.filteredInterventions$ = this.filteredInterventions$.pipe(
      map(interventions => interventions.filter(intervention => {
        const actualStartDate = new Date(intervention.ActualStartDate);
        return actualStartDate < new Date(searchOptions.dateTo);
      })))
  }


  /**------------------------------------------------------------------------------------------------------------*/

  public sortInterventions(fieldName: string, isAsc: boolean) {
    zip(
      this.countryService.countries$,
      this.workflowService.workflowStates$,
      this.userService.users$
    ).subscribe(allResponse => {
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
            this.sortByCountry(isAsc, allResponse[0]);
            break;
          case "Status":
            this.sortByStatus(isAsc, allResponse[1]);
            break;
          case "User":
            this.sortByUsers(isAsc, allResponse[2]);
            break;
          case "UpdateOn":
            this.sortByDate(isAsc);
            break;
        }
      })
  }

  sortByCode_ShortName_CommericalName(isAsc: boolean, propertyName: string): void {
    if (isAsc) {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            (o1 as any)[propertyName].localeCompare((o2 as any)[propertyName]))))
    } else {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            (o2 as any)[propertyName].localeCompare((o1 as any)[propertyName]))));
    }
  }

  sortByCountry(isAsc: boolean, countries: Country[]): void {
      if (isAsc) {
        this.filteredInterventions$ = this.filteredInterventions$
          .pipe(
            map(interventions => interventions.sort((o1, o2) =>
              this.countryService.getCountryName(o1.InterventionCountryID, countries)
                .localeCompare(this.countryService.getCountryName(o2.InterventionCountryID, countries))
            )));
      } else {
        this.filteredInterventions$ = this.filteredInterventions$
          .pipe(
            map(interventions => interventions.sort((o1, o2) =>
              this.countryService.getCountryName(o2.InterventionCountryID, countries)
                .localeCompare(this.countryService.getCountryName(o1.InterventionCountryID, countries)))));
      }
  }

  sortByStatus(isAsc: boolean, workflowStates: WorkflowStates[]): void {
        if (isAsc) {
          this.filteredInterventions$ = this.filteredInterventions$
            .pipe(
              map(interventions => interventions.sort((o1, o2) =>
                this.workflowService.getWorkflowName(o1.workflowStateId, workflowStates).localeCompare(
                  this.workflowService.getWorkflowName(o2.workflowStateId, workflowStates)))));
        } else {
          this.filteredInterventions$ = this.filteredInterventions$
            .pipe(
              map(interventions => interventions.sort((o1, o2) =>
                this.workflowService.getWorkflowName(o2.workflowStateId, workflowStates).localeCompare(
                  this.workflowService.getWorkflowName(o1.workflowStateId, workflowStates)))));
        }
  }

  sortByUsers(isAsc: boolean, users: User[]): void {
        if (isAsc) {
          this.filteredInterventions$ = this.filteredInterventions$
            .pipe(
              map(interventions => interventions.sort((o1, o2) =>
                this.userService.getUserName(o1.UpdatedUserID, users)
                  .localeCompare(this.userService.getUserName(o2.UpdatedUserID, users)))));
        } else {
          this.filteredInterventions$ = this.filteredInterventions$
            .pipe(
              map(interventions => interventions.sort((o1, o2) =>
                this.userService.getUserName(o2.UpdatedUserID, users)
                  .localeCompare(this.userService.getUserName(o1.UpdatedUserID, users)))));
        }
  }

  sortByDate(isAsc: boolean): void {
    if (isAsc) {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            o1.DateUpdated - o2.DateUpdated)));
    } else {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            o2.DateUpdated - o1.DateUpdated)));
    }
  }

  /**-------------------------------------------------------------------------*/

  onSelectCreateNewIntervention() {
    this.router.navigate(["createNewIntervention"]);
  }

  // public getInterventions(sortingOption: { fieldName: string, isAsc: boolean }) {
  //   return this.http.get("/assets/data/response.json")
  //     .pipe(
  //       map((data: any) => {
  //         //
  //         return data.data;
  //       })
  //     )
  // }
  //
  // public getInterventions(sortingOption: { fieldName: string, isAsc: boolean }, filterData: any, statusId: number) {
  //   return this.http.get("/assets/data/response.json")
  //     .pipe(
  //       map((data: any) => {
  //         //
  //         return data.data;
  //       })
  //     )
  // }

}
