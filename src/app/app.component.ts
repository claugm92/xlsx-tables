import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './productservice';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'xlsx';
  products: Product[] | any;

  selectedProducts: Product[] | any;

  cols: any[] | any;

  exportColumns: any[] | any;

  uploadedFiles: any[] = [];

  output: any;
  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.productService
      .getProductsSmall()
      .then((data) => (this.products = data));

    this.cols = [
      { field: 'code', header: 'Code' },
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'quantity', header: 'Quantity' },
    ];

    this.exportColumns = this.cols.map((col: { header: any; field: any }) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }
  addSingle() {
    this.messageService.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  onFileChange(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    import('xlsx').then((xlsx) => {
      let workBook: any = null;
      let jsonData = null;
      const reader = new FileReader();
      const file = this.uploadedFiles[0];
      reader.onload = (event) => {
        const data = reader.result;
        workBook = xlsx.read(data, { type: 'binary' });
        jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
          const sheet = workBook.Sheets[name];
          console.log(sheet);
          initial[name] = xlsx.utils.sheet_to_json(sheet);
          return initial;
        }, {});
        const dataString = JSON.stringify(jsonData);
        console.log(jsonData.Sheet1);
        this.output = jsonData.Sheet1;
      };
      reader.readAsBinaryString(file);
    });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.output);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      console.log(workbook);
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'output');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    // import('file-saver').then((FileSaver) => {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
    // });
  }
}
