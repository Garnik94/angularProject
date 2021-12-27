import {Routes} from "@angular/router";
import {InterventionDetailsComponent} from "./intervention-details/intervention-details.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [

  {
    path: "",
    redirectTo: "interventions",
    pathMatch: "full"
  },

  {
    path: "interventions",
    component: HomeComponent
  },

  // TODO: Use lazy load
  {
    path: "intervention/:id",
    component: InterventionDetailsComponent
  },

  {
    path: "**",
    component: PageNotFoundComponent
  }

];
