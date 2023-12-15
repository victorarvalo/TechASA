import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderDataServiceService } from 'src/app/Services/OrderService/order-data.service.service';
import { ExportxlsxServiceService } from 'src/app/Services/ExportXLSX/exportxlsx.service.service';
import { ExportcsvServiceService } from 'src/app/Services/ExportCSV/exportcsv.service.service';

@Component({
  selector: 'app-orders-export',
  templateUrl: './orders-export.component.html',
  styleUrls: ['./orders-export.component.css']
})
export class OrdersExportComponent implements OnInit{
  
  /*list of order to show in html*/
  listOrders: any[] = [];
  /* the input reference */
  @ViewChild('fileName') fileName!: ElementRef;
  /* the input reference */
  @ViewChild('fileNamecsv') fileNamecsv!: ElementRef;
  /* reference of the checkboxes */
  @ViewChild('OrderIdch') OrderIdch!: ElementRef;
  @ViewChild('customerIdch') customerIdch!: ElementRef;
  @ViewChild('employeeIdch') employeeIdch!: ElementRef;
  @ViewChild('orderDatech') orderDatech!: ElementRef;
  @ViewChild('requiredDatech') requiredDatech!: ElementRef;
  @ViewChild('shippedDatech') shippedDatech!: ElementRef;
  @ViewChild('shipViach') shipViach!: ElementRef;
  @ViewChild('freightch') freightch!: ElementRef;
  @ViewChild('shipNamech') shipNamech!: ElementRef;
  @ViewChild('shipAddressch') shipAddressch!: ElementRef;
  @ViewChild('shipCitych') shipCitych!: ElementRef;
  @ViewChild('shipRegionch') shipRegionch!: ElementRef;
  @ViewChild('shipPostalCodech') shipPostalCodech!: ElementRef;
  @ViewChild('shipCountrych') shipCountrych!: ElementRef;

  constructor(private _orderDataService: OrderDataServiceService,
    private _exportService: ExportxlsxServiceService,
    private _exportcsvService: ExportcsvServiceService){}

  ngOnInit(): void {
    this._orderDataService.getListOrders().subscribe(data =>{
      this.listOrders = data;
      console.log(data);
    },
    error =>{
      console.log(error);
    }) 
  }

  /**
   * Function prepares data to pass to export service to create excel from Table DOM reference
   *
   */
  exportElmToExcel(): void {
    var a = this.listOrders;
    let columns: string[] = [];
    //delete especific columns
    if(this.OrderIdch.nativeElement.checked){a.forEach(element => {delete element.orderId});}
    if(this.customerIdch.nativeElement.checked){a.forEach(element => {delete element.customerId});}
    if(this.employeeIdch.nativeElement.checked){a.forEach(element => {delete element.employeeId});}
    if(this.orderDatech.nativeElement.checked){a.forEach(element => {delete element.orderDate});}
    if(this.requiredDatech.nativeElement.checked){a.forEach(element => {delete element.requiredDate});}
    if(this.shippedDatech.nativeElement.checked){a.forEach(element => {delete element.shippedDate});}
    if(this.shipViach.nativeElement.checked){a.forEach(element => {delete element.shipVia});}
    if(this.freightch.nativeElement.checked){a.forEach(element => {delete element.freight});}
    if(this.shipNamech.nativeElement.checked){a.forEach(element => {delete element.shipName});}
    if(this.shipAddressch.nativeElement.checked){a.forEach(element => {delete element.shipAddress});}
    if(this.shipCitych.nativeElement.checked){a.forEach(element => {delete element.shipCity});}
    if(this.shipRegionch.nativeElement.checked){a.forEach(element => {delete element.shipRegion});}
    if(this.shipPostalCodech.nativeElement.checked){a.forEach(element => {delete element.shipPostalCode});}
    if(this.shipCountrych.nativeElement.checked){a.forEach(element => {delete element.shipCountry});}
    
    if(this.fileName.nativeElement.value == "" ||
          this.fileName.nativeElement.value.length == 0){
        this._exportService.exportTableElmToExcel(a, 'order_data');
      }else{
        this._exportService.exportTableElmToExcel(a, this.fileName.nativeElement.value);
      }      
      this.fileName.nativeElement.innerHTML = "";
  }

  exportElmToCSV(): void {
    var a = this.listOrders;
    let columns: string[] = [];
    //delete especific columns
    if(this.OrderIdch.nativeElement.checked){a.forEach(element => {delete element.orderId});}
    if(this.customerIdch.nativeElement.checked){a.forEach(element => {delete element.customerId});}
    if(this.employeeIdch.nativeElement.checked){a.forEach(element => {delete element.employeeId});}
    if(this.orderDatech.nativeElement.checked){a.forEach(element => {delete element.orderDate});}
    if(this.requiredDatech.nativeElement.checked){a.forEach(element => {delete element.requiredDate});}
    if(this.shippedDatech.nativeElement.checked){a.forEach(element => {delete element.shippedDate});}
    if(this.shipViach.nativeElement.checked){a.forEach(element => {delete element.shipVia});}
    if(this.freightch.nativeElement.checked){a.forEach(element => {delete element.freight});}
    if(this.shipNamech.nativeElement.checked){a.forEach(element => {delete element.shipName});}
    if(this.shipAddressch.nativeElement.checked){a.forEach(element => {delete element.shipAddress});}
    if(this.shipCitych.nativeElement.checked){a.forEach(element => {delete element.shipCity});}
    if(this.shipRegionch.nativeElement.checked){a.forEach(element => {delete element.shipRegion});}
    if(this.shipPostalCodech.nativeElement.checked){a.forEach(element => {delete element.shipPostalCode});}
    if(this.shipCountrych.nativeElement.checked){a.forEach(element => {delete element.shipCountry});}
    
    var csvContent = this._exportcsvService.saveDataInCSV(a);
    if(this.fileNamecsv.nativeElement.value == "" ||
          this.fileNamecsv.nativeElement.value.length == 0){
        var name: string = 'order_data';
      }else{
        var name: string = this.fileNamecsv.nativeElement.value;
      }      
      this.fileNamecsv.nativeElement.innerHTML = "";

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }
}
