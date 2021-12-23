import {Routes} from "@angular/router";
import {InterventionDetailsComponent} from "./intervention-details/intervention-details.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [

  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },

  {
    path: "home",
    component: HomeComponent
  },

  {
    path: "intervention/:id",
    component: InterventionDetailsComponent
  },

];
