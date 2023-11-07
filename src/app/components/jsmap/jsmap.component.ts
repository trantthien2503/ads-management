import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
} from '@angular/core';
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
  @ViewChild('map') mapDiv?: ElementRef;
  @ViewChild('infoWindow') infoWindow?: ElementRef;

  private map?: H.Map;
  public keyAPI = hereMapAPI;
  public zoom = 12; //  Chỉ số zoom map
  // Khai báo mảng lưu các marker
  public markers: H.map.Marker[] = [];
  public address =
    '64/7 Đường số 2, Phường 3, Quận Gò Vấp, Thành phố Hồ Chí Minh';
  public resultAddress: any;
  public selectedMarker: any;
  public infoWindowContent: string = '';
  private isDragging = false; // Khai báo biến lưu trạng thái kéo chuột
  constructor(private geocodingService: GeocodingService) {}

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
          // Tạo bản đồ
          const map = new H.Map(
            this.mapDiv.nativeElement,
            (layers as any).vector.normal.map,
            {
              pixelRatio: window.devicePixelRatio || 1,
              center: { lat: 49.6107, lng: 6.1314 },
              zoom: this.zoom,
            }
          );
          const landmarks = [
            { name: 'Notre-Dame Cathedral', lat: 49.610364, lng: 6.129416 },
            { name: 'Grand Ducal Palace', lat: 49.611204, lng: 6.13072 },
            { name: 'Casemates du Bock', lat: 49.611847, lng: 6.131925 },
            { name: 'Adolphe Bridge', lat: 49.6083, lng: 6.127109 },
          ];

          landmarks.forEach((landmark) => {
            const marker = new H.map.Marker({
              lat: landmark.lat,
              lng: landmark.lng,
            });
            marker.setData(landmark.name);
            map.addObject(marker);
          });

          onResize(this.mapDiv.nativeElement, () => {
            map.getViewPort().resize();
          });

          new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
          this.map = map;
        }
      });
  }

  /**hàm áp dụng zoom lên bản đồ
   *
   * @param zoom
   */
  setZoom(zoom: number) {
    // cập nhật zoom level trên bản đồ
    this.map?.setZoom(zoom);
  }

  /** Hàm chuyển số âm thành dương và ngược lại
   *
   * @param num
   * @returns
   */
  invertSign(num: number) {
    if (num < 0) {
      return -num;
    } else {
      return -1 * num;
    }
  }

  /** Sựu hiện scroll zoom bản đồ
   *
   * @param event
   */
  @HostListener('wheel', ['$event']) // for window scroll events
  onScroll(event: any) {
    if (this.zoom > 0 && this.zoom <= 100) {
      const delta = Math.sign(event.deltaY);
      this.zoom += this.invertSign(delta);
      this.setZoom(this.zoom);
    }
  }

  // Hàm bắt sự kiện kéo chuột
  @HostListener('mousedown') onMouseDown() {
    this.isDragging = true;
  }

  // Hàm bắt sự kiện thả chuột
  @HostListener('mouseup') onMouseUp() {
    this.isDragging = false;
  }

  // Hàm di chuyển bản đồ khi kéo chuột
  @HostListener('mousemove') onMouseMove(e: MouseEvent) {
    if (this.isDragging && e) {
      const map = this.map;
      const viewport: any = map?.getViewPort();

      map?.setCenter({
        lat: e.clientY + viewport?.center.lat,
        lng: e.clientX + viewport?.center.lng,
      });
    }
  }

  // Xử lý sự kiện click chuột phải đồng thời tạo 1 marker
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    if (event && this.map) {
      // Lấy vị trí
      const position = this.map.screenToGeo(event.clientX, event.clientY);
      if (position) {
        // Tạo marker
        const marker = new H.map.Marker(position);
        // var bearsIcon = new H.map.Icon(svgMarkup);
        // marker.setIcon(bearsIcon);
        // Thêm vào mảng và bản đồ
        this.markers.push(marker);
        this.map.addObject(marker);

        // Đánh dấu là đang chọn
        this.selectMarker(marker);
      }
    }
  }

  selectMarker(marker: any) {
    this.selectedMarker = marker;
  }

  // Hàm xóa tất cả marker
  clearMarkers() {
    this.markers.forEach((marker) => {
      this.map?.removeObject(marker);
    });
    this.markers = [];
  }

  @HostListener('click', ['$event'])
  onMarkerClick(event: MouseEvent) {
    // Lấy marker được click

    const marker = this.getClickedMarker(event);
    // if (marker) {
    //   // Đánh dấu là marker đang được chọn
    //   this.selectedMarker = marker;
    //   // Lấy nội dung thông tin
    //   this.infoWindowContent = marker.getData();
    //   // Render lại thông tin
    //   this.renderInfoWindow();
    // }
  }

  renderInfoWindow() {
    // Nếu chưa chọn marker thì dừng
    if (!this.selectedMarker || !this.infoWindow) return;

    // Lấy thông tin của marker đang chọn
    const info = this.selectedMarker.getData();

    // Xoá nội dung cũ
    this.infoWindow.nativeElement.innerHTML = '';
    // Tạo div chứa thông tin mới
    const content = `
    <div>
      <h3>${info.name}</h3>
      <p>${info.address}</p>
    </div>
  `;

    // Thêm nội dung vào div
    this.infoWindow.nativeElement.innerHTML = content;

    // Vị trí hiển thị
    const pos = this.selectedMarker.getGeometry().getBoundingBox().getCenter();

    // Cập nhật vị trí
    this.infoWindow.nativeElement.style.left = pos.x + 'px';
    this.infoWindow.nativeElement.style.top = pos.y + 'px';

    // Hiển thị div
    this.infoWindow.nativeElement.classList.add('show');
  }

  getClickedMarker(event: MouseEvent) {
    if (event && this.map) {
      const coords = this.map.screenToGeo(event.clientX, event.clientY);

      // var coords =  this.map.screenToGeo(event.currentPointer.viewportX, event.currentPointer.viewportY);
      let minDist = 1000;
      let nearest_text = '*None*';
      let markerDist;
      let objects: any = this.map.getObjects();
      let len = this.map.getObjects().length;
      let i;
      // iterate over objects and calculate distance between them
      for (i = 0; i < len; i += 1) {
        markerDist = objects[i].getGeometry().distance(coords);

        if (markerDist < minDist) {
          minDist = markerDist;
          nearest_text = objects[i].getData();
          console.log('---nearest_text', nearest_text);
        }
      }
      // Reset lựa chọn
      return null;
    }
    // Nếu không trùng thì trả về undefined
    return undefined;
  }
}
