import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductDataServicesService } from 'src/app/Services/ProductService/product-data.services.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit{

  /*list of product to show in html*/
  listProducts: any[] = [];
  

  constructor(private _productDataService: ProductDataServicesService){

  }

  ngOnInit(): void {
    this._productDataService.getListProducts().subscribe(data =>{
      this.listProducts = data;
      console.log(data);
    },
    error =>{
      console.log(error);
    })
  }  
}
