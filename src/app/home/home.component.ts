import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public searchFields: FormGroup;

  search(searchFields: FormGroup): void {
    this.searchFields = searchFields;
  }

  reset(): void {
    this.searchFields = null;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
