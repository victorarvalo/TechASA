import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductDataServicesService } from 'src/app/Services/ProductService/product-data.services.service';
import { ExportxlsxServiceService } from 'src/app/Services/ExportXLSX/exportxlsx.service.service';
import { ExportcsvServiceService } from 'src/app/Services/ExportCSV/exportcsv.service.service';

@Component({
  selector: 'app-products-export',
  templateUrl: './products-export.component.html',
  styleUrls: ['./products-export.component.css']
})
export class ProductsExportComponent {
  /*list of product to show in html*/
  listProducts: any[] = [];
  
  /* the input reference */
  @ViewChild('fileName')
  fileName!: ElementRef;
  /* the input reference */
  @ViewChild('fileNamecsv')
  fileNamecsv!: ElementRef;
  /* reference of the checkboxes */
  @ViewChild('productIdch')productIdch!: ElementRef;
  @ViewChild('productNamech')productNamech!: ElementRef;
  @ViewChild('supplierIdch')supplierIdch!: ElementRef;
  @ViewChild('categoryIdch')categoryIdch!: ElementRef;
  @ViewChild('quantityPerUnitch')quantityPerUnitch!: ElementRef;
  @ViewChild('unitPricech')unitPricech!: ElementRef;
  @ViewChild('unitsInStockch')unitsInStockch!: ElementRef;
  @ViewChild('unitsOnOrderch')unitsOnOrderch!: ElementRef;
  @ViewChild('reorderLevelch')reorderLevelch!: ElementRef;
  @ViewChild('discontinuedch')discontinuedch!: ElementRef;

  constructor(private _productDataService: ProductDataServicesService,
    private _exportService: ExportxlsxServiceService,
    private _exportcsvService: ExportcsvServiceService){

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

  /**
   * Function prepares data to pass to export service to create excel from Table DOM reference
   *
   */
  exportElmToExcel(): void {
    var a = this.listProducts;
    let columns: string[] = [];
    //delete especific columns
    if(this.productIdch.nativeElement.checked){a.forEach(element => {delete element.productId});}
    if(this.productNamech.nativeElement.checked){a.forEach(element => {delete element.productName});}
    if(this.supplierIdch.nativeElement.checked){a.forEach(element => {delete element.supplierId});}
    if(this.categoryIdch.nativeElement.checked){a.forEach(element => {delete element.categoryId});}
    if(this.quantityPerUnitch.nativeElement.checked){a.forEach(element => {delete element.quantityPerUnit});}
    if(this.unitPricech.nativeElement.checked){a.forEach(element => {delete element.unitPrice});}
    if(this.unitsInStockch.nativeElement.checked){a.forEach(element => {delete element.unitsInStock});}
    if(this.unitsOnOrderch.nativeElement.checked){a.forEach(element => {delete element.unitsOnOrder});}
    if(this.reorderLevelch.nativeElement.checked){a.forEach(element => {delete element.reorderLevel});}
    if(this.discontinuedch.nativeElement.checked){a.forEach(element => {delete element.discontinued});}

    if(this.fileName.nativeElement.value == "" ||
          this.fileName.nativeElement.value.length == 0){
        this._exportService.exportTableElmToExcel(a, 'product_data');
      }else{
        this._exportService.exportTableElmToExcel(a, this.fileName.nativeElement.value);
      }
    this.fileName.nativeElement.innerHTML = "";      
  }

  exportElmToCSV(): void{
    var a = this.listProducts;
    let columns: string[] = [];
    //delete especific columns
    if(this.productIdch.nativeElement.checked){a.forEach(element => {delete element.productId});}
    if(this.productNamech.nativeElement.checked){a.forEach(element => {delete element.productName});}
    if(this.supplierIdch.nativeElement.checked){a.forEach(element => {delete element.supplierId});}
    if(this.categoryIdch.nativeElement.checked){a.forEach(element => {delete element.categoryId});}
    if(this.quantityPerUnitch.nativeElement.checked){a.forEach(element => {delete element.quantityPerUnit});}
    if(this.unitPricech.nativeElement.checked){a.forEach(element => {delete element.unitPrice});}
    if(this.unitsInStockch.nativeElement.checked){a.forEach(element => {delete element.unitsInStock});}
    if(this.unitsOnOrderch.nativeElement.checked){a.forEach(element => {delete element.unitsOnOrder});}
    if(this.reorderLevelch.nativeElement.checked){a.forEach(element => {delete element.reorderLevel});}
    if(this.discontinuedch.nativeElement.checked){a.forEach(element => {delete element.discontinued});}

    var csvContent = this._exportcsvService.saveDataInCSV(a);
    if(this.fileNamecsv.nativeElement.value == "" ||
          this.fileNamecsv.nativeElement.value.length == 0){
        var name: string ='product_data';
      }else{
        var name: string =this.fileNamecsv.nativeElement.value;
      }
    this.fileNamecsv.nativeElement.innerHTML = ""; 

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }
}
