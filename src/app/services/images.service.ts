import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private SERVER_URL = 'http://127.0.0.1:5000'; // Thay thế bằng URL thực tế của máy chủ

  constructor(private httpClient: HttpClient) {}


  uploadImage(file: FormData) {
    return this.httpClient.post<any>(`${this.SERVER_URL}/api/images/upload-image`, file);
  }



}
