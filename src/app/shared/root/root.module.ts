import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RootRoutingModule } from './root-routing.module';
import { CountriesListComponent } from 'src/app/components/countries-list/countries-list.component';
import { IpAddressTrackerComponent } from 'src/app/components/ip-address-tracker/ip-address-tracker.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { SelectedCountryDataComponent } from 'src/app/components/selected-country-data/selected-country-data.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ConfirmDialogComponent } from 'src/app/components/header/confirm-dialog/confirm-dialog.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SharedLibModule } from '../shared-lib.module';
import { FilterPipe } from '../pipes/filter.pipe';
import { ComaSeperatorPipe } from '../pipes/coma-seperator.pipe';
import { FirebaseService } from '../../services/firebase.service';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    ConfirmDialogComponent,
    CountriesListComponent,
    IpAddressTrackerComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegisterComponent,
    SelectedCountryDataComponent,
    FilterPipe,
    ComaSeperatorPipe,
  ],
  imports: [CommonModule, RootRoutingModule, SharedLibModule],
  providers: [FirebaseService],
})
export class RootModule {}
