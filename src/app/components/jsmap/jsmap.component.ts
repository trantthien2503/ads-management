import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import H from '@here/maps-api-for-javascript';
@Component({
  selector: 'app-jsmap',
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css']
})
export class JsmapComponent implements OnInit {
  private map?: H.Map;

  @ViewChild('map') mapDiv?: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      // Instantiate a platform, default layers and a map as usual.
      const platform = new H.service.Platform({
        apikey: 'r5vLK2bvhfo9nyS9zPyqocCEUfqz64N6mleOP6sSNEA'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        // Add type assertion to the layers object...
        // ...to avoid any Type errors during compilation.
        (layers as any).vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: 0, lng: 0},
          zoom: 2,
        },
      );
      this.map = map;
    }
  }
}
