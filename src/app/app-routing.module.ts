import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SelectedCountryDataComponent } from './components/selected-country-data/selected-country-data.component';
import { AuthGuardGuard } from './shared/auth-guard.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signup' },
  {
    path: 'signup',
    component: LoginComponent,
  },
  {
    path: 'countries',
    canActivate: [AuthGuardGuard],
    component: CountriesListComponent,
  },
  {
    path: 'country',
    component: SelectedCountryDataComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
