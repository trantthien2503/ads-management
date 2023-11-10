import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  public PROVINCEURL = 'https://provinces.open-api.vn/api/p/79?depth=3';
  constructor(private httpClient: HttpClient) {}
  getProvenceHCM() {
    return this.httpClient.get<any>(this.PROVINCEURL);
  }
}
