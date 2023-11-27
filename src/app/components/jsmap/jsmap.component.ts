import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { GeocodingService } from 'src/app/services/geocoding.service';
import { Map, LngLat, Marker, Popup } from 'mapbox-gl';
import {
  DataMarker,
  MarkerAndColor,
  PlainMarker,
} from 'src/app/interface/interfaces';

@Component({
  selector: 'app-jsmap',
  templateUrl: './jsmap.component.html',
  styleUrls: ['./jsmap.component.css'],
})
export class JsmapComponent implements OnInit {
  @Input() markers: MarkerAndColor[] = [];
  @Output() outputChooseMarker: EventEmitter<any> = new EventEmitter();
  @ViewChild('map') divMap?: ElementRef;

  public zoom = 16; //  Chỉ số zoom map
  public address = 'Quận Gò Vấp, Thành phố Hồ Chí Minh';
  public resultAddress: any;
  public selectedMarker: any;
  public positionMarker: any; // Dùng để lưu vị trí mới chọn
  public infoWindowContent: string = '';
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 0;
  lng = 0;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(
    -74.10380784179445,
    4.651165392795477
  );

  constructor(private geocodingService: GeocodingService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.geocodingService
      .getLocation(this.address)
      .subscribe((response: any) => {
        this.resultAddress = response.items[0].position;
        const { lng, lat } = this.resultAddress;
        this.currentLngLat = new LngLat(lng, lat);
        if (!this.divMap) throw 'El elemento HTML no fue encontrado';
        this.map = new Map({
          container: this.divMap.nativeElement, // container ID
          style: this.style, // style URL
          center: this.currentLngLat,
          zoom: this.zoom,
        });

        if (this.markers) {
          this.readMarkers();
        }
      });
  }

  selectedMarkerFn(dataMarker: any) {
    this.selectedMarker = dataMarker;
    this.outputChooseMarker.emit(dataMarker);
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  readMarkers() {
    this.markers.forEach((marker, index) => {
      if (marker && marker.data) {
        const dataM = marker.data;
        const coords = new LngLat(marker.lngLat.lng, marker.lngLat.lat);
        const advertising_form = dataM.advertising_form.length
          ? `<span> <b>Hình thức:</b> ${dataM.advertising_form}</span><br>`
          : '';
        const position_type = dataM.advertising_form.length
          ? `<span> <b>Loại vị trí:</b> ${dataM.advertising_form}</span><br>`
          : '';
        const type_of_billboard = dataM.type_of_billboard.length
          ? `<span class="p-0 m-0" style="font-size: 16px;"> ${dataM.type_of_billboard}</span><br>`
          : '<span class="p-0 m-0" style="font-size: 16px;">Chưa đăng kí</span><br>';
        const popupContent = document.createElement('div');
        popupContent.innerHTML = `
          ${type_of_billboard}
          <span> <b>Địa chỉ:</b> ${dataM.address}</span><br>
          <span> <b>Kích thước:</b> ${dataM.width}m x ${
          dataM.height
        }m</span><br>
          ${advertising_form}
          ${position_type}
          <span>${
            dataM.is_zoning
              ? '<b class="text-success">Đã huy hoạch</b>'
              : '<b class="text-danger">Chưa huy hoach</b>'
          }</span><br>
        `;

        const atag = document.createElement('div');
        atag.innerHTML = `<a class="text-warning" id="${marker.id}">Chi tiết <i class="bi bi-arrow-right-circle"></i></a>`;
        popupContent.appendChild(atag);
        atag.addEventListener('click', (e) => {
          this.selectedMarkerFn(marker);
        });

        let popup = new Popup({}).setDOMContent(popupContent);

        if (this.map) {
          new Marker({
            color: marker.color,
            draggable: false,
          })
            .setLngLat(coords)
            .setPopup(popup)
            .addTo(this.map);
        }
      }
    });
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    if (!this.map) return;

    // const color = '#xxxxxx'.replace(/x/g, (y) =>
    //   ((Math.random() * 16) | 0).toString(16)
    // );
    // const lngLat = this.map.getCenter();

    // const popup = new Popup({ closeOnClick: false })
    //   .setLngLat(lngLat)
    //   .setHTML('<h1>Hello World!</h1>')
    //   .addTo(this.map);
    // const marker = new Marker({
    //   color: color,
    //   draggable: true,
    // })
    //   .setLngLat(lngLat)
    //   .setPopup(popup)
    //   .addTo(this.map);

    // this.markers.push({ color, marker, lngLat, ads_code });
    // const plainMarkers: PlainMarker[] = this.markers.map(
    //   ({ color, marker, lngLat }) => {
    //     return {
    //       color,
    //       lngLat: lngLat,
    //     };
    //   }
    // );

    // localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }
}
