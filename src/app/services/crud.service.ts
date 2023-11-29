import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private SERVER_URL = 'http://127.0.0.1:5000'; // Thay thế bằng URL thực tế của máy chủ

  constructor(private httpClient: HttpClient) {}

  /** Hàm thực hiện gọi api thêm dữ liệu
   *
   * @param data: data = {field: 'reports', data: {....}}
   * @returns
   */
  add(data: any) {
    return this.httpClient.post<any>(
      `${this.SERVER_URL}/api/add-data-by-fields`,
      data
    );
  }

  find(field: string, search_field: string, search_value: string){
    const data = {
      field,
      search_field,
      search_value
    }
    return this.httpClient.post<any>(
      `${this.SERVER_URL}/api/search-by-fields`,
      data
    );
  }

  update(field: string, id: string, dataUpdate: object){
    let post = {
      field: field,
      id: id,
      data_update: dataUpdate
    }
    return this.httpClient.post<any>(`${this.SERVER_URL}/api/update-by-fields`, post);
  }

  get(field: string){
    const data = {
      field
    }
     return this.httpClient.post<any>(
      `${this.SERVER_URL}/api/get-data-by-fields`,
      data
    );
  }
}
