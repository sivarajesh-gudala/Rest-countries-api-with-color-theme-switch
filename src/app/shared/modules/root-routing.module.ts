import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from 'src/app/components/login/login.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { CountriesListComponent } from 'src/app/components/countries-list/countries-list.component';
import { SelectedCountryDataComponent } from 'src/app/components/selected-country-data/selected-country-data.component';
import { IpAddressTrackerComponent } from 'src/app/components/ip-address-tracker/ip-address-tracker.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';

import { AuthGuardGuard } from '../auth-guard.guard';

import { Path } from '../enums/route-path.enum';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: Path.LOGIN, pathMatch: 'full' },
      { path: Path.LOGIN, component: LoginComponent },
      { path: Path.SIGNUP, component: RegisterComponent },
      {
        path: Path.ALLCOUNTRIES,
        canActivate: [AuthGuardGuard],
        component: CountriesListComponent,
      },
      {
        path: Path.COUNTRY,
        component: SelectedCountryDataComponent,
      },
      { path: Path.IPADDRESS, component: IpAddressTrackerComponent },
      {
        path: Path.PAGENOTFOUND,
        pathMatch: 'full',
        component: PageNotFoundComponent,
      },

      { path: Path.WILDCARD, redirectTo: Path.PAGENOTFOUND },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {}
