import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountryPopoverPageRoutingModule } from './country-popover-routing.module';

import { CountryPopoverPage } from './country-popover.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountryPopoverPageRoutingModule
  ],
  declarations: [CountryPopoverPage],
  exports: [CountryPopoverPage]
})
export class CountryPopoverPageModule {}
