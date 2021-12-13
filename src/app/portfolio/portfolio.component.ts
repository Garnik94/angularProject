import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Country} from "../models/Country";
import {CountryService} from "../service/CountryService";
import {Intervention} from "../models/Intervention";
import {InterventionService} from "../service/InterventionService";
import {WorkflowStates} from "../models/WorkflowState";
import {WorkflowService} from "../service/WorkflowService";
import {User} from "../models/User";
import {UserService} from "../service/UserService";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnChanges {

  // @Input()
  interventionList: Intervention[] = InterventionService.getInterventionArray();

  @Input()
  searchOptions: FormGroup;

  logSearchOptions() {
    console.log(this.searchOptions);
  }

  logCountryOption(){
    console.log(this.searchOptions.get("countryOption").value);
  }

  // TODO: rename to selectedStatus
  // DONE

  // selectStatus: FormControl;
  selectStatus: number = 0;

  /**---------------Filter By Statues------------------*/

  tempInterventionsBeforeStatusChange: Intervention[];
  isSearchMode = false;

  onStatusChange(): void {
    // this.isSortMode = false;
    this.resetSortAndGetDefaultList();
    if (!this.isSearchMode) {
      this.tempInterventionsBeforeStatusChange = Array.from(this.interventionList);
    }
    if (Number(this.selectStatus) === 0) {
      this.interventionList = this.tempInterventionsBeforeStatusChange;
      this.isSearchMode = false;
      return;
    } else {
      this.interventionList = this.tempInterventionsBeforeStatusChange.filter(currentIntervention => {
        return currentIntervention.workflowStateId === Number(this.selectStatus);
      });
      this.isSearchMode = true;
    }
  }

  /**-------------Filter By Search Fields--------------*/

  resetSortAndGetDefaultList() {
    if (this.isCodeAscPressed || this.isCodeDescPressed || this.isShortNameAscPressed || this.isShortNameDescPressed ||
      this.isOfficialNameAscPressed || this.isOfficialNameDescPressed || this.isCountryAscPressed || this.isCountryDescPressed ||
      this.isStatusAscPressed || this.isStatusDescPressed || this.isUsersAscPressed || this.isUsersDescPressed ||
      this.isDateAscPressed || this.isDateDescPressed) {
      this.interventionList = this.defaultInterventionList;
    }
    this.isSortMode = false;
    this.resetSortOptions();
  }

  resetSortOptions() {
    this.isCodeAscPressed = false;
    this.isCodeDescPressed = false;
    this.isShortNameAscPressed = false;
    this.isShortNameDescPressed = false;
    this.isOfficialNameAscPressed = false;
    this.isOfficialNameDescPressed = false;
    this.isCountryAscPressed = false;
    this.isCountryDescPressed = false;
    this.isStatusAscPressed = false;
    this.isStatusDescPressed = false;
    this.isUsersAscPressed = false;
    this.isUsersDescPressed = false;
    this.isDateAscPressed = false;
    this.isDateDescPressed = false;
  }

  // TODO: reset-i jamanak ete status ka @ntrac filtrel @st status-i
  // DONE
  generalSearch(): void {
    // this.isSortMode = false;
    this.resetSortAndGetDefaultList();
    if (this.searchOptions === null && this.isSearchMode) {
      this.isSearchMode = false;
      this.interventionList = InterventionService.getInterventionArray();
      this.onStatusChange();
    } else if (this.searchOptions === null && !this.isSearchMode) {
      this.interventionList = InterventionService.getInterventionArray();
    } else {
      this.filterBYCountry();
      this.filterByKeywordOption();
      this.filterByActualDate();
    }
  }

  filterBYCountry(): void {
    this.onStatusChange();
    if (this.searchOptions.get("countryOption").value && this.searchOptions.get("countryOption").value !== 0) {
      this.interventionList = this.interventionList.filter(currentElement => {
          return currentElement.InterventionCountryID === Number(this.searchOptions.get("countryOption").value);
        }
      );
    }
  }

  filterByKeywordOption(): void {
    if (this.searchOptions.get("keywordOption").value && (
      this.searchOptions.get("CodeOfTheIntervention").value ||
      this.searchOptions.get("TitleOfTheIntervention").value ||
      this.searchOptions.get("InterventionShortName").value ||
      this.searchOptions.get("InterventionDescription").value)) {

      let keywordOption: string = this.searchOptions.get("keywordOption").value.trim();
      // const checkboxOptions = this.searchOptions.checkboxOption

      this.interventionList = this.interventionList.filter(intervention =>
        (this.searchOptions.get("CodeOfTheIntervention").value && intervention.InterventionCode.includes(keywordOption)) ||
        (this.searchOptions.get("TitleOfTheIntervention").value && intervention.Title.includes(keywordOption)) ||
        (this.searchOptions.get("InterventionShortName").value && intervention.ShortName.includes(keywordOption)) ||
        (this.searchOptions.get("InterventionDescription").value && intervention.Description.includes(keywordOption)));
    }
  }

  filterByActualDate(): void {
    if (this.searchOptions.get("dateFrom").value && this.searchOptions.get("dateTo").value) {
      this.interventionList = this.interventionList.filter(intervention => {
          let actualStartDate = new Date(intervention.ActualStartDate);
          return new Date(this.searchOptions.get("dateFrom").value) < actualStartDate &&
            actualStartDate < new Date(this.searchOptions.get("dateTo").value);
        }
      );
    } else if (this.searchOptions.get("dateFrom").value && !this.searchOptions.get("dateTo").value) {
      this.interventionList = this.interventionList.filter(intervention => {
          let actualStartDate = new Date(intervention.ActualStartDate);
          return new Date(this.searchOptions.get("dateFrom").value) < actualStartDate;
        }
      );
    } else if (!this.searchOptions.get("dateFrom").value && this.searchOptions.get("dateTo").value) {
      this.interventionList = this.interventionList.filter(intervention => {
          let actualStartDate = new Date(intervention.ActualStartDate);
          return actualStartDate < new Date(this.searchOptions.get("dateTo").value);
        }
      );
    }
  }

  /**--------------------------------------------------*/

  /**---------------Sorting------------------*/

    // TODO: use boolean instead of count
    // DONE

  defaultInterventionList: Intervention[];
  isSortMode = false;

  initDefaultInterventionList(): void {
    if (!this.isSortMode) {
      this.defaultInterventionList = Array.from(this.interventionList);
    }
  }

  isCodeAscPressed = false;
  isCodeDescPressed = false;

  sortByCodeInterventionASC(): void {
    this.initDefaultInterventionList();
    if (this.isCodeAscPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isCodeAscPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      o1.InterventionCode.localeCompare(o2.InterventionCode));
    this.resetSortOptions();
    this.isCodeAscPressed = true;
    this.isCodeDescPressed = false;
    this.isSortMode = true;
  }

  sortByCodeInterventionDESC(): void {
    this.initDefaultInterventionList();
    if (this.isCodeDescPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isCodeDescPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      o2.InterventionCode.localeCompare(o1.InterventionCode));
    this.resetSortOptions();
    this.isCodeAscPressed = false;
    this.isCodeDescPressed = true;
    this.isSortMode = true;
  }

  isShortNameAscPressed = false
  isShortNameDescPressed = false

  sortByShortNameASC(): void {
    this.initDefaultInterventionList();
    if (this.isShortNameAscPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isShortNameAscPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      o1.ShortName.localeCompare(o2.ShortName));
    this.resetSortOptions();
    this.isShortNameAscPressed = true;
    this.isShortNameDescPressed = false
    this.isSortMode = true;
  }

  sortByShortNameDESC(): void {
    this.initDefaultInterventionList();
    if (this.isShortNameDescPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isShortNameDescPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      o2.ShortName.localeCompare(o1.ShortName));
    this.resetSortOptions();
    this.isShortNameAscPressed = false
    this.isShortNameDescPressed = true;
    this.isSortMode = true;
  }

  isOfficialNameAscPressed = false
  isOfficialNameDescPressed = false

  sortByOfficialInterventionNameASC(): void {
    this.initDefaultInterventionList();
    if (this.isOfficialNameAscPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isOfficialNameAscPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      o1.CommericalName.localeCompare(o2.CommericalName))
    this.resetSortOptions();
    this.isOfficialNameAscPressed = true;
    this.isOfficialNameDescPressed = false
    this.isSortMode = true;
    return;
  }

  sortByOfficialInterventionNameDESC(): void {
    this.initDefaultInterventionList();
    if (this.isOfficialNameDescPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isOfficialNameDescPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      o2.CommericalName.localeCompare(o1.CommericalName))
    this.resetSortOptions();
    this.isOfficialNameAscPressed = false;
    this.isOfficialNameDescPressed = true;
    this.isSortMode = true;
    return;
  }

  isCountryAscPressed = false;
  isCountryDescPressed = false;

  sortByCountryASC(): void {
    this.initDefaultInterventionList();
    if (this.isCountryAscPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isCountryAscPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      this.getCountryName(this.getCountryById(o1.InterventionCountryID))
        .localeCompare(this.getCountryName(this.getCountryById(o2.InterventionCountryID))))
    this.resetSortOptions();
    this.isCountryAscPressed = true;
    this.isCountryDescPressed = false
    this.isSortMode = true;
    return;
  }

  sortByCountryDESC(): void {
    this.initDefaultInterventionList();
    if (this.isCountryDescPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isCountryDescPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      this.getCountryName(this.getCountryById(o2.InterventionCountryID))
        .localeCompare(this.getCountryName(this.getCountryById(o1.InterventionCountryID))))
    this.resetSortOptions();
    this.isCountryAscPressed = false;
    this.isCountryDescPressed = true
    this.isSortMode = true;
    return;
  }

  isStatusAscPressed = false;
  isStatusDescPressed = false;

  sortByStatusASC(): void {
    this.initDefaultInterventionList();
    if (this.isStatusAscPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isStatusAscPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      this.getWorkflowName(this.getWorkflowById(o1.workflowStateId)).localeCompare(
        this.getWorkflowName(this.getWorkflowById(o2.workflowStateId))));
    this.resetSortOptions();
    this.isStatusAscPressed = true;
    this.isStatusDescPressed = false
    this.isSortMode = true;
    return;
  }

  sortByStatusDESC(): void {
    this.initDefaultInterventionList();
    if (this.isStatusDescPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isStatusDescPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      this.getWorkflowName(this.getWorkflowById(o2.workflowStateId)).localeCompare(
        this.getWorkflowName(this.getWorkflowById(o1.workflowStateId))));
    this.resetSortOptions();
    this.isStatusAscPressed = false;
    this.isStatusDescPressed = true
    this.isSortMode = true;
    return;
  }

  isUsersAscPressed = false;
  isUsersDescPressed = false;

  sortByUsersASC(): void {
    this.initDefaultInterventionList();
    if (this.isUsersAscPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isUsersAscPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      this.getUserName(this.getUserById(o1.UpdatedUserID)).localeCompare(
        this.getUserName(this.getUserById(o2.UpdatedUserID))));
    this.resetSortOptions();
    this.isUsersAscPressed = true;
    this.isUsersDescPressed = false
    this.isSortMode = true;
    return;
  }

  sortByUsersDESC(): void {
    this.initDefaultInterventionList();
    if (this.isUsersDescPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isUsersDescPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      this.getUserName(this.getUserById(o2.UpdatedUserID)).localeCompare(
        this.getUserName(this.getUserById(o1.UpdatedUserID))));
    this.resetSortOptions();
    this.isUsersAscPressed = false;
    this.isUsersDescPressed = true
    this.isSortMode = true;
    return;
  }

  isDateAscPressed = false;
  isDateDescPressed = false;

  sortByDateASC(): void {
    this.initDefaultInterventionList();
    if (this.isDateAscPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isDateAscPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      o1.DateUpdated - o2.DateUpdated);
    this.resetSortOptions();
    this.isDateAscPressed = true;
    this.isDateDescPressed = false
    this.isSortMode = true;
    return;
  }

  sortByDateDESC(): void {
    this.initDefaultInterventionList();
    if (this.isDateDescPressed) {
      this.interventionList = this.defaultInterventionList;
      this.resetSortOptions();
      this.isSortMode = false;
      this.isDateDescPressed = false;
      return;
    }
    this.interventionList.sort((o1, o2) =>
      o2.DateUpdated - o1.DateUpdated);
    this.resetSortOptions();
    this.isDateAscPressed = false;
    this.isDateDescPressed = true
    this.isSortMode = true;
    return;
  }

  /**----------------------------------------*/

  public getCountryById(countryId: number): Country {
    return CountryService.getCountryById(countryId);
  }

  getCountryName(country: Country): string {
    return CountryService.getCountryName(country);
  }

  public getWorkflowArray(): WorkflowStates[] {
    return WorkflowService.getWorkflowArray();
  }

  public getWorkflowById(workflowId: number): WorkflowStates {
    return WorkflowService.getWorkflowById(workflowId);
  }

  getWorkflowName(workflow: WorkflowStates): string {
    return WorkflowService.getWorkflowName(workflow);
  }

  public getUserById(userId: number): User {
    return UserService.getUserById(userId);
  }

  getUserName(user: User): string {
    return UserService.getUserName(user);
  }

  getDate(seconds: number): string {
    return new Date(seconds).toLocaleDateString();
  }

  constructor() {
  }

  ngOnInit(): void {
    // this.selectStatus = new FormControl(0);
  }

  tempInterventionsBeforeSearch = this.interventionList;

  ngOnChanges(changes: SimpleChanges): void {
    this.interventionList = this.tempInterventionsBeforeSearch;
    this.generalSearch();
  }
}
