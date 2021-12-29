import {Intervention} from "../models/Intervention";
import {Country} from "../models/Country";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {InterventionInterface} from "../interfaces/InterventionInterface";
import {map, shareReplay} from "rxjs/operators";
import {CountryService} from "./CountryService";
import {UserService} from "./UserService";
import {WorkflowService} from "./WorkflowService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {Observable} from "rxjs";

@Injectable()
export class InterventionService {

  // allInterventions: Intervention[] = [];
  //
  // filteredInterventions: Intervention[] = [];

  // tempInterventionsBeforeStatusChange: Intervention[];

  isPagingMode: boolean = false;

  searchOptions: FormGroup;

  // TODO: Move to component
  selectStatus: FormControl = new FormControl(0);

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
        map((data: any) => {
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
        }),
        shareReplay({bufferSize: 1, refCount: true})
      )
      this.allInterventions$ = this.filteredInterventions$;
  }

  public getInterventions() {
    return this.filteredInterventions$;
  }

  public getInterventionById(interventionId: number): Observable<Intervention> {
    return this.filteredInterventions$
      .pipe(
        map(interventions => interventions
          .find(currentIntervention => currentIntervention.InterventionInstanceId === interventionId)))
  }

  onStatusChange(): void {
    if (!this.isSearchMode) {
      this.tempInterventionsBeforeStatusChange$ = this.filteredInterventions$;
    }
    if (Number(this.selectStatus.value) === 0) {
      this.filteredInterventions$ = this.tempInterventionsBeforeStatusChange$;
      this.isSearchMode = false;
      return;
    } else {
      this.filteredInterventions$ = this.tempInterventionsBeforeStatusChange$
        .pipe(
          map(interventions => interventions
            .filter(currentIntervention => {
              return currentIntervention.workflowStateId === Number(this.selectStatus.value);
            })
          )
        )
      this.isSearchMode = true;
    }
  }

  /**-------------Filter By Search Fields--------------*/

  generalSearch(): void {
    this.isPagingMode = false;
    if (this.searchOptions === null && this.isSearchMode) {
      this.isSearchMode = false;
      this.filteredInterventions$ = this.allInterventions$;
      this.onStatusChange();
    } else if (this.searchOptions === null && !this.isSearchMode) {
      this.filteredInterventions$ = this.allInterventions$;
    } else {
      this.filterBYCountry();
      this.filterByKeywordOption();
      this.filterByActualDate();
    }
  }

  filterBYCountry(): void {
    const searchOptions = this.searchOptions?.value;
    this.onStatusChange();
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

  sortByCountry(isAsc: boolean): void {
    if (isAsc) {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            this.countryService.getCountryName(o1.InterventionCountryID)
              .localeCompare(this.countryService.getCountryName(o2.InterventionCountryID)))));
    } else {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            this.countryService.getCountryName(o2.InterventionCountryID)
              .localeCompare(this.countryService.getCountryName(o1.InterventionCountryID)))));
    }
  }

  sortByStatus(isAsc: boolean): void {
    if (isAsc) {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            this.workflowService.getWorkflowName(o1.workflowStateId).localeCompare(
              this.workflowService.getWorkflowName(o2.workflowStateId)))));
    } else {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            this.workflowService.getWorkflowName(o2.workflowStateId).localeCompare(
              this.workflowService.getWorkflowName(o1.workflowStateId)))));
    }
  }

  sortByUsers(isAsc: boolean): void {
    if (isAsc) {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            this.userService.getUserName(o1.UpdatedUserID)
              .localeCompare(this.userService.getUserName(o2.UpdatedUserID)))));
    } else {
      this.filteredInterventions$ = this.filteredInterventions$
        .pipe(
          map(interventions => interventions.sort((o1, o2) =>
            this.userService.getUserName(o2.UpdatedUserID)
              .localeCompare(this.userService.getUserName(o1.UpdatedUserID)))));
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
