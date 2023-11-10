import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private SERVERB_URL = 'http://127.0.0.1:5000'; // Thay thế bằng URL thực tế của máy chủ

  constructor(private httpClient: HttpClient) {}


  /** Thực hiện gọi tới phương api đăng nhập
   *
   * @param username
   * @param password
   * @returns
   */
  login(email: any, password: any) {
    return this.httpClient.post<any>(`${this.SERVERB_URL}/api/users/login`, {
      email: email,
      password: password,
    });
  }

  register(dataRegister: object) {
    return this.httpClient.post<any>(`${this.SERVERB_URL}/api/users/register`, dataRegister);
  }


  updateUser(idUser: any, dataUpdate: object ){
    let post = {
      field: 'users',
      id: idUser,
      data_update: dataUpdate
    }
    return this.httpClient.post<any>(`${this.SERVERB_URL}/api/update-by-fields`, post);
  }
}
