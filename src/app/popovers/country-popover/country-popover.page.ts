import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { flagPath } from 'src/models/flag-icons';

@Component({
  selector: 'app-country-popover',
  templateUrl: './country-popover.page.html',
  styleUrls: ['./country-popover.page.scss'],
})
export class CountryPopoverPage implements OnInit {

  //public flagPathArray: any = flagPath;
  public flagData = {};
  flagPathArray = {
    us: "/assets/icon-flags/us.svg",
    de: "/assets/icon-flags/de.svg",
    ch: "/assets/icon-flags/ch.svg",
    it: "/assets/icon-flags/it.svg",
    co: "/assets/icon-flags/co.svg",
    gb: "/assets/icon-flags/gb.svg",
    fr: "/assets/icon-flags/fr.svg",
    es: "/assets/icon-flags/es.svg"
}

  constructor( private popoverCtrl: PopoverController) { }

  ngOnInit() {
  }

  async selectedCountry(id: string){

    let selectedFlagPath = '';

    for( let i in this.flagPathArray ){
      console.log(typeof(i));
      if( i == id ) selectedFlagPath = this.flagPathArray[i];
    }
    console.log(selectedFlagPath);
    if(selectedFlagPath != undefined){
    
    Object.assign(this.flagData, {
      id: id,
      path: selectedFlagPath
    }); 
    }
    console.log(selectedFlagPath);
    await this.popoverCtrl.dismiss(this.flagData);
  }

}
