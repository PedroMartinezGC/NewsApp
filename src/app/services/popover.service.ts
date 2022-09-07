import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { CountryPopoverPage } from '../popovers/country-popover/country-popover.page';

@Injectable({
  providedIn: 'root'
})
export class PopoverService {

  public popoverSelectionCountry: any = undefined;

  constructor(private popoverCtrl: PopoverController) { }

  async countriesSelection(ev: any) {

    if(this.popoverSelectionCountry != undefined) this.popoverSelectionCountry = undefined;
    
    this.popoverSelectionCountry = await this.popoverCtrl.create({
      component: CountryPopoverPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      dismissOnSelect: true
    });
    await this.popoverSelectionCountry.present();
  
    const { data } = await this.popoverSelectionCountry.onDidDismiss();
    let popoverEmptyOutput = {};

    return (data != undefined) ? data : popoverEmptyOutput;
    
  } 
}

