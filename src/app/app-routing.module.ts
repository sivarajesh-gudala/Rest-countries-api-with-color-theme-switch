import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SelectedCountryDataComponent } from './components/selected-country-data/selected-country-data.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'countries' },
  {
    path: 'countries',
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
