import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-licensing-required',
  templateUrl: './licensing-required.component.html',
  styleUrls: ['./licensing-required.component.css']
})
export class LicensingRequiredComponent implements OnInit {
  public loading = false;
  selectedIndex = 0
  constructor() {}

  ngOnInit() {
    this.loading = true;
  }

}
