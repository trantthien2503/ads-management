import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import H from '@here/maps-api-for-javascript';
import onResize from 'simple-element-resize-detector';
import { hereMapAPI } from 'src/apis/hereMapAPI';
import { GeocodingService } from 'src/app/services/geocoding.service';

@Component({
  selector: 'app-jsmap',
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css'],
})
export class JsmapComponent implements OnInit {
  private map?: H.Map;
  public keyAPI = hereMapAPI;
  @ViewChild('map') mapDiv?: ElementRef;
  address = 'Invalidenstr 117 Berlin';
  resultAddress: any;
  constructor(private geocodingService: GeocodingService) {
    this.geocodingService
      .getLocation(this.address)
      .subscribe((response: any) => {
        this.resultAddress = response.items[0];
        console.log('---resultAddress', this.resultAddress);
      });
  }

  ngOnInit() {}
  ngAfterViewInit(): void {
    this.geocodingService
      .getLocation(this.address)
      .subscribe((response: any) => {
        this.resultAddress = response.items[0];
        if (!this.map && this.mapDiv) {
          // Instantiate a platform, default layers and a map as usual.
          const center = this.resultAddress
            ? this.resultAddress.position
            : { lat: 0, lng: 0 };
          const platform = new H.service.Platform({
            apikey: this.keyAPI.apiKey,
          });
          const layers = platform.createDefaultLayers();
          const map = new H.Map(
            this.mapDiv.nativeElement,
            (layers as any).vector.normal.map,
            {
              pixelRatio: window.devicePixelRatio,
              center: center,
              zoom: 2,
            }
          );
          onResize(this.mapDiv.nativeElement, () => {
            map.getViewPort().resize();
          });
          this.map = map;
        }
      });
  }
}
