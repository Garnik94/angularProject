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
import {RouterModule} from "@angular/router";
import {InterventionDetailsComponent} from './intervention-details/intervention-details.component';
import {routes} from "./app.routes";
import {HomeComponent} from './home/home.component';
import {NgxPaginationModule} from "ngx-pagination";
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

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
    PageNotFoundComponent
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
    WorkflowService,
    PortfolioComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
