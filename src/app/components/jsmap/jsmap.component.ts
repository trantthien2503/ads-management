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
  public zoom = 16; //  Chỉ số zoom map
  // Khai báo mảng lưu các marker
  markers: H.map.Marker[] = [];
  public address =
    '161/3 Ni Sư Huỳnh Liên, phường 10, Tân Bình, Thành phố Hồ Chí Minh';
  public resultAddress: any;
  constructor(private geocodingService: GeocodingService) {}
  public selectedMarker: any;
  public infoWindowContent: string = '';
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
              pixelRatio: window.devicePixelRatio,
              center: center,
              zoom: this.zoom,
            }
          );
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

  // Khai báo biến lưu trạng thái kéo chuột
  private isDragging = false;

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

  // Xử lý sự kiện click chuột phải
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: MouseEvent) {
    if (event) {
      // Lấy tọa độ click
      const position: any = this.map?.screenToGeo(event.clientX, event.clientY);
      // Tạo và thêm marker
      const marker: any = new H.map.Marker(position);

      this.markers.push(marker);
      this.map?.addObject(marker);
    }
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
    if (marker) {
      // Đánh dấu là marker đang được chọn
      this.selectedMarker = marker;
      // Lấy nội dung thông tin
      this.infoWindowContent = marker.getData();
      // Render lại thông tin
      this.renderInfoWindow();
    }
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
    if (event) {
      // Lấy vị trí click
      const clickPos = this.map?.screenToGeo(event.clientX, event.clientY);
      // Duyệt mỗi marker
      if (clickPos) {
        const markerPos = new H.map.Marker(clickPos);

        for (let marker of this.markers) {
          // Kiểm tra xem vị trí click có trùng với marker ko
          if (marker) {
            if (marker.getGeometry() == markerPos.getGeometry()) return marker;
          }
        }
      }
    }
    // Nếu không trùng thì trả về undefined
    return undefined;
  }
}
