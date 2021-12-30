import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CreateNewInterventionComponent} from "./create-new-intervention.component";

const routes: Routes = [
  {path: "", component: CreateNewInterventionComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CreateNewInterventionModule {
}
