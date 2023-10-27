import { Component } from '@angular/core';
import { GeocodingService } from './services/geocoding.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  address = 'Invalidenstr 117 Berlin';

  constructor(private geocodingService: GeocodingService) {}

  ngOnInit() {
    this.geocodingService
      .getLocation(this.address)
      .subscribe((response: any) => {
        console.log('---getLocation', response);
      });
  }
}
