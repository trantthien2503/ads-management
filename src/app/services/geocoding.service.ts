import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hereMapAPI } from 'src/apis/hereMapAPI';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
  public URL_GEOCODING = 'https://discover.search.hereapi.com/v1/geocode';
  public apiKey = hereMapAPI.apiKey;
  constructor(private httpClient: HttpClient) {}

  getLocation(address: string) {
    const encodedAddress = encodeURIComponent(address).replace(/%20/g, '+')
    const url = `${this.URL_GEOCODING}?q=${encodedAddress}&apiKey=${this.apiKey}`;
    return this.httpClient.get<any>(url);
  }
}
