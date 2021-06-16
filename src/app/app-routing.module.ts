import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { IpAddressTrackerComponent } from './components/ip-address-tracker/ip-address-tracker.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SelectedCountryDataComponent } from './components/selected-country-data/selected-country-data.component';
import { AuthGuardGuard } from './shared/auth-guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
