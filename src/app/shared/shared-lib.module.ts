import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FlexLayoutModule,
    NgxSpinnerModule,
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FlexLayoutModule,
    NgxSpinnerModule,
  ],
})
export class SharedLibModule {}
