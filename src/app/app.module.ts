import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HoverDirective} from './directives/hover.directive';
import {CountryService} from "./service/CountryService";
import {InterventionService} from "./service/InterventionService";
import {UserService} from "./service/UserService";
import {WorkflowService} from "./service/WorkflowService";
import {GetNamePipe} from './pipes/get-name.pipe';
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {InterventionDetailsComponent} from './intervention-details/intervention-details.component';
import {HomeComponent} from './home/home.component';
import {NgxPaginationModule} from "ngx-pagination";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import { PagingButtonDirective } from './directives/paging-button.directive';
import { CreateNewInterventionComponent } from './create-new-intervention/create-new-intervention.component';

const routes: Routes = [

  {
    path: "",
    redirectTo: "interventions",
    pathMatch: "full"
  },

  {
    path: "interventions",
    loadChildren: () => import("./home/home.module")
      .then(response => response.HomeModule)
  },

  {
    path: "intervention/:id",
    loadChildren: () => import ("./intervention-details/intervention-details.module")
      .then(response => response.InterventionDetailsModule)
  },

  {
    path: "createNewIntervention",
    loadChildren: () => import("./create-new-intervention/create-new-intervention.module")
      .then(response => response.CreateNewInterventionModule)
  },

  {
    path: "**",
    loadChildren: () => import("./page-not-found/page-not-found.module")
      .then(response => response.PageNotFoundModule)
  }

];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PortfolioComponent,
    HoverDirective,
    GetNamePipe,
    GetNamePipe,
    InterventionDetailsComponent,
    HomeComponent,
    PageNotFoundComponent,
    PagingButtonDirective,
    CreateNewInterventionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxPaginationModule
  ],
  providers: [
    CountryService,
    InterventionService,
    UserService,
    WorkflowService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
