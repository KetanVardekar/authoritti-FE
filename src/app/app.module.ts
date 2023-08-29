import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpInterceptorClass } from './shared/interceptor/httpInterceptor';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
  NgxSliderModule,
  DragDropModule,
  NgxPrintModule,


    ToastrModule.forRoot(),
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:HttpInterceptorClass,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
