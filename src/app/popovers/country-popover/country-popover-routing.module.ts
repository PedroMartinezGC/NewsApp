import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountryPopoverPage } from './country-popover.page';

const routes: Routes = [
  {
    path: '',
    component: CountryPopoverPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountryPopoverPageRoutingModule {}
