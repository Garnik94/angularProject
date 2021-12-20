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

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PortfolioComponent,
    HoverDirective,
    GetNamePipe,
    GetNamePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
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
