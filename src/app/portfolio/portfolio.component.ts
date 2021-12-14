import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {CountryService} from "../service/CountryService";
import {Intervention} from "../models/Intervention";
import {InterventionService} from "../service/InterventionService";
import {WorkflowService} from "../service/WorkflowService";
import {UserService} from "../service/UserService";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnChanges {

  constructor(
    public countryServiceInstance: CountryService,
    public interventionServiceInstance: InterventionService,
    public userServiceInstance: UserService,
    public workflowServiceInstance: WorkflowService,
  ) {
  }

  // @Input()
  interventionList: Intervention[] = this.interventionServiceInstance.getInterventionArray();

  @Input()
  searchOptions: FormGroup;

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
      this.interventionList = this.interventionServiceInstance.getInterventionArray();
      this.onStatusChange();
    } else if (this.searchOptions === null && !this.isSearchMode) {
      this.interventionList = this.interventionServiceInstance.getInterventionArray();
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
      this.interventionList = this.interventionList.filter(currentElement => {
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
      this.interventionList = this.interventionList.filter(intervention =>
        (searchOptions.CodeOfTheIntervention && intervention.InterventionCode.includes(keywordOption)) ||
        (searchOptions.TitleOfTheIntervention && intervention.Title.includes(keywordOption)) ||
        (searchOptions.InterventionShortName && intervention.ShortName.includes(keywordOption)) ||
        (searchOptions.InterventionDescription && intervention.Description.includes(keywordOption)));
    }
  }

  filterByActualDate(): void {
    const searchOptions = this.searchOptions.value;
    if (searchOptions.dateFrom && searchOptions.dateTo) {
      this.interventionList = this.interventionList.filter(intervention => {
          const actualStartDate = new Date(intervention.ActualStartDate);
          return new Date(searchOptions.dateFrom) < actualStartDate &&
            actualStartDate < new Date(searchOptions.dateTo);
        }
      );
    } else if (searchOptions.dateFrom && !searchOptions.dateTo) {
      this.interventionList = this.interventionList.filter(intervention => {
          const actualStartDate = new Date(intervention.ActualStartDate);
          return new Date(searchOptions.dateFrom) < actualStartDate;
        }
      );
    } else if (!searchOptions.dateFrom && searchOptions.dateTo) {
      this.interventionList = this.interventionList.filter(intervention => {
          const actualStartDate = new Date(intervention.ActualStartDate);
          return actualStartDate < new Date(searchOptions.dateTo);
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
      this.countryServiceInstance.getCountryName(this.countryServiceInstance.getCountryById(o1.InterventionCountryID))
        .localeCompare(this.countryServiceInstance.getCountryName(this.countryServiceInstance.getCountryById(o2.InterventionCountryID))))
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
      this.countryServiceInstance.getCountryName(this.countryServiceInstance.getCountryById(o2.InterventionCountryID))
        .localeCompare(this.countryServiceInstance.getCountryName(this.countryServiceInstance.getCountryById(o1.InterventionCountryID))))
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
      this.workflowServiceInstance.getWorkflowName(this.workflowServiceInstance.getWorkflowById(o1.workflowStateId)).localeCompare(
        this.workflowServiceInstance.getWorkflowName(this.workflowServiceInstance.getWorkflowById(o2.workflowStateId))));
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
      this.workflowServiceInstance.getWorkflowName(this.workflowServiceInstance.getWorkflowById(o2.workflowStateId)).localeCompare(
        this.workflowServiceInstance.getWorkflowName(this.workflowServiceInstance.getWorkflowById(o1.workflowStateId))));
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
      this.userServiceInstance.getUserName(this.userServiceInstance.getUserById(o1.UpdatedUserID)).localeCompare(
        this.userServiceInstance.getUserName(this.userServiceInstance.getUserById(o2.UpdatedUserID))));
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
      this.userServiceInstance.getUserName(this.userServiceInstance.getUserById(o2.UpdatedUserID)).localeCompare(
        this.userServiceInstance.getUserName(this.userServiceInstance.getUserById(o1.UpdatedUserID))));
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

  getDate(seconds: number): string {
    return new Date(seconds).toLocaleDateString();
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
