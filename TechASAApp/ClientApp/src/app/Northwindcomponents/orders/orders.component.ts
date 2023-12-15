import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { OrderDataServiceService } from 'src/app/Services/OrderService/order-data.service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  listOrders: any[] = [];

  constructor(private _orderDataService: OrderDataServiceService){
    
  }

  ngOnInit(): void {
    this._orderDataService.getListOrders().subscribe(data =>{
      this.listOrders = data;
      console.log(data);
    },
    error =>{
      console.log(error);
    })  
  }
}

