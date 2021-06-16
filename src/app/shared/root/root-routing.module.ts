import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesListComponent } from 'src/app/components/countries-list/countries-list.component';
import { IpAddressTrackerComponent } from 'src/app/components/ip-address-tracker/ip-address-tracker.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { SelectedCountryDataComponent } from 'src/app/components/selected-country-data/selected-country-data.component';
import { AuthGuardGuard } from '../auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'all-countries',
        canActivate: [AuthGuardGuard],
        component: CountriesListComponent,
      },
      {
        path: 'country',
        component: SelectedCountryDataComponent,
      },
      { path: 'ip-address-tracker', component: IpAddressTrackerComponent },
      {
        path: 'page-not-found',
        pathMatch: 'full',
        component: PageNotFoundComponent,
      },

      { path: '**', redirectTo: '/page-not-found' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {}
