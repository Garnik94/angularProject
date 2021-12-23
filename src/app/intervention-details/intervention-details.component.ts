import {Component, OnInit} from '@angular/core';
import {Intervention} from "../models/Intervention";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {InterventionService} from "../service/InterventionService";

@Component({
  selector: 'app-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrls: ['./intervention-details.component.css']
})
export class InterventionDetailsComponent implements OnInit {

  intervention: Intervention;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private interventionService: InterventionService
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = +params["id"];
      this.intervention = this.interventionService.getInterventionById(id);
    })
  }

  goToPortfolio() {
    this.router.navigate(["home"])
  }

}
