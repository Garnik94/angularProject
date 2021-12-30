import {Routes} from "@angular/router";
import {InterventionDetailsComponent} from "./intervention-details/intervention-details.component";
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {CreateNewInterventionComponent} from "./create-new-intervention/create-new-intervention.component";

export const routes: Routes = [

  {
    path: "",
    redirectTo: "interventions",
    pathMatch: "full"
  },

  {
    path: "interventions", children: [
      {path: "", component: HomeComponent},
      {path: "id", component: InterventionDetailsComponent}
    ]

  },

  // // TODO: Use lazy load
  // {
  //   path: "intervention/:id",
  //   component: InterventionDetailsComponent
  // },

  {
    path: "createNewIntervention",
    component: CreateNewInterventionComponent
  },

  {
    path: "**",
    component: PageNotFoundComponent
  }

];
