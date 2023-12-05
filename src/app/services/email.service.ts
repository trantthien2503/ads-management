import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MailOptions } from '../interface/interfaces';
import { Observable } from 'rxjs';

@Injectable()
export class EmailService {
  private SERVER_URL = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) {}
  sendEmail(data: MailOptions): Observable<any> {
    const url = `${this.SERVER_URL}/api/send-email`; // Đường dẫn tới API gửi email
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(url, data);
  }
}
