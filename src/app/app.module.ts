import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SearchComponent} from './search/search.component';
import {PortfolioComponent} from './portfolio/portfolio.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HoverDirective} from './hover.directive';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    PortfolioComponent,
    HoverDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
