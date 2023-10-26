import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import { hereMapAPI } from 'src/apis/hereMapAPI';
@Component({
  selector: 'app-jsmap',
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css'],
})
export class JsmapComponent implements OnInit {
  private map?: H.Map;
  public keyAPI = hereMapAPI;
  @ViewChild('map') mapDiv?: ElementRef;
  constructor() {}

  ngOnInit() {}
  ngAfterViewInit(): void {
    if (!this.map && this.mapDiv) {
      // Instantiate a platform, default layers and a map as usual.
      const platform = new H.service.Platform({
        apikey: this.keyAPI.apiKey,
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.mapDiv.nativeElement,
        (layers as any).vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: { lat: 0, lng: 0 },
          zoom: 2,
        }
      );
      onResize(this.mapDiv.nativeElement, () => {
        map.getViewPort().resize();
      });
      this.map = map;
    }
  }
}
