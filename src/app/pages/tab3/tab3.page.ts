import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Article } from 'src/app/interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  get articles(): Article[]{

    return this.storageSrv.getLocalArticles;
  }

  constructor( private storageSrv: StorageService ) {}

}
