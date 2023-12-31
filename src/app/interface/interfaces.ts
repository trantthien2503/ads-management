import { LngLat, Marker } from "mapbox-gl";

export interface MailOptions{
  sender_email: string;
  sender_name: string;
  recipient_email: string|undefined;
  recipient_name: string|undefined;
  subject: string|undefined;
  text_content: string|undefined;
  html_content: string|undefined;
  custom_id: string|undefined;
}


export interface PlainMarker {
  color: string;
  lngLat: LngLat;
}

export interface DataMarker {
  address: string; // Địa chỉ bảng quảng cáo
  district_code: number; // Bảng quảng cáo thuộc Phường nào
  ward_code: number; // Bảng quảng cáo thuộc Quận nào
  position_type:
    | 'Đất công/Công viên/Hành lang an toàn giao thông'
    | 'Đất tư nhân/Nhà ở riêng lẻ'
    | 'Trung tâm thương mại'
    | 'Chợ'
    | 'Cây xăng'
    | 'Nhà chờ xe buýt';
  advertising_form: 'Cổ động chính trị' | 'Quảng cáo thương mại' | 'Xã hội hoá';
  is_zoning: boolean; // Đã được huy hoach chưa
  type_of_billboard:
    | 'Trụ bảng hiflex'
    | 'Trụ màn hình điện tử LED'
    | 'Trụ hộp đèn'
    | 'Bảng hiflex ốp tường'
    | 'Màn hình điện tử ốp tường'
    | 'Trụ treo băng rôn dọc'
    | 'Trụ treo băng rôn ngang'
    | 'Trụ/Cụm pano'
    | 'Cổng chào'
    | 'Trung tâm thương mại';
  width: string;
  height: string;
  images: [];
  expiry_date_of_advertising_contract: Date;
  start_date_of_advertising_contract: Date;
}

export interface MarkerAndColor {
  ads_code: string;
  color: string;
  marker: Marker;
  lngLat: LngLat;
  id?: string;
  data?: DataMarker;
}

