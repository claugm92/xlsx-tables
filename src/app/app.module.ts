import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {InputTextModule} from 'primeng/inputtext';


import { ProductService } from './productservice';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TableModule,
    FileUploadModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastModule,
    InputTextModule

  ],
  providers: [ProductService,MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
