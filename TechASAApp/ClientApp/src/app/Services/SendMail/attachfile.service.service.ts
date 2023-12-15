import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AttachfileServiceService {

  private baseUrl: String = "https://localhost:7040/";
  private myApiUrl = "sendattach";
  constructor(private http: HttpClient) { }

  sendMailAttachFile(message: any) {
    return this.http.post(this.baseUrl + this.myApiUrl, message);
  }
}
