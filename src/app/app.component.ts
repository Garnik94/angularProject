import {Component, OnInit} from '@angular/core';
import {Intervention} from "./models/Intervention";
import {InterventionService} from "./service/InterventionService";
import {SearchFieldsInterface} from "./models/SearchFieldsInterface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // TODO: move in portfolio
  // DONE
  // public interventionList: Intervention[] = InterventionService.getInterventionArray();

  public searchFields: SearchFieldsInterface;

  search(searchFields: SearchFieldsInterface): void {
    this.searchFields = searchFields;
  }

  reset(): void {
    this.searchFields = null;
  }
}
