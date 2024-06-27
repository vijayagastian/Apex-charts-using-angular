import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AppRoutingModule } from '../app-routing.module';
import { ResponseComponent } from './response.component';



@NgModule({
  declarations: [ResponseComponent],
  imports: [
    CommonModule,
    
   
  
  ],
  providers: [],
  bootstrap: [ResponseComponent]
})
export class ResponseModule { }
