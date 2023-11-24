import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  public PROVINCEURL = 'https://provinces.open-api.vn/api/';
  constructor(private httpClient: HttpClient) {}
  getProvenceHCM() {
    const url = this.PROVINCEURL + `p/79?depth=3`;
    return this.httpClient.get<any>(url);
  }

  /** Lấy thông tin quận
   *
   */
  getDistrict(code: number) {
    const url = this.PROVINCEURL + `d/${code}`;
    return this.httpClient.get<any>(url);
  }

  /** Lấy thông tin Phường
   *
   */
  getWard(code: number) {
    const url = this.PROVINCEURL + `w/${code}`;
    return this.httpClient.get<any>(url);
  }
}
