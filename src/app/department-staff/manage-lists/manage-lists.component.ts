import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-lists',
  templateUrl: './manage-lists.component.html',
  styleUrls: ['./manage-lists.component.css'],
})
export class ManageListsComponent implements OnInit {
  public loading = false;
  selectedIndex = 0
  constructor() {}

  ngOnInit() {
    this.loading = true;
  }

}
