import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductDataServicesService } from 'src/app/Services/ProductService/product-data.services.service';
import { ExportxlsxServiceService } from 'src/app/Services/ExportXLSX/exportxlsx.service.service';
import { ExportcsvServiceService } from 'src/app/Services/ExportCSV/exportcsv.service.service';
import { AttachfileServiceService } from 'src/app/Services/SendMail/attachfile.service.service';
import { Buffer } from "buffer";
import { Observable, map } from 'rxjs';
import { AuthorizeService } from '../../../api-authorization/authorize.service';

@Component({
  selector: 'app-products-export',
  templateUrl: './products-export.component.html',
  styleUrls: ['./products-export.component.css']
})
export class ProductsExportComponent implements OnInit{

  public isAuthenticated?: Observable<boolean>;
  public userName?: Observable<string | null | undefined>;

  /*list of product to show in html*/
  listProducts: any[] = [];
  
  /* the input reference */
  @ViewChild('fileName')
  fileName!: ElementRef;
  /* the input reference */
  @ViewChild('fileNamecsv')
  fileNamecsv!: ElementRef;
  /* the input reference */
  @ViewChild('theuser')
  theuser!: ElementRef;
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
    private _exportcsvService: ExportcsvServiceService,
    private _attachFileService: AttachfileServiceService,
    private authorizeService: AuthorizeService){

  }

  ngOnInit(): void {
    
    this.isAuthenticated = this.authorizeService.isAuthenticated();
    this.userName = this.authorizeService.getUser().pipe(map(u => u && u.name)); 
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
        var nameFile: string ='product_data';
      }else{
        var nameFile: string =this.fileNamecsv.nativeElement.value;
      }
    this.fileNamecsv.nativeElement.innerHTML = ""; 

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = nameFile + '.csv';
    hiddenElement.click();

    //Convert to Base64 the csv File
    var base641 = Buffer.from(csvContent).toString('base64');
    var u = this.theuser.nativeElement.value;
    //Build the object for API
    var message: any = {
      "email":u,
      "subject":"send attach file",
      "htmlMessage":"Sending a Attach File",
      "attachments":[
        {
          "Content":base641,
          "Type":".csv",
          "Filename": nameFile}
      ]
    }    
    this._attachFileService.sendMailAttachFile(message).subscribe(data =>{

    },error => { console.log(error)});
  }
}
