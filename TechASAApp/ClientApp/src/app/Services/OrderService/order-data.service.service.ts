import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderDataServiceService {

  private baseUrl: String = "https://localhost:7040/";
  private myApiUrl = "order";
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
  }

  getListOrders():Observable<any>{
    return this.http.get(this.baseUrl + this.myApiUrl);
  }
}
