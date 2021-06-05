import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

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
    ToastrModule.forRoot({
      maxOpened: 1,
      preventDuplicates: true,
      autoDismiss: true,
      closeButton: true,
      tapToDismiss: false,
    }),
  ],
  exports: [
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    ToastrModule,
  ],
})
export class SharedLibModule {}
