import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';
import { NewsResponse } from '../../interfaces/index';
import { PopoverService } from 'src/app/services/popover.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [NewsService]
})
export class Tab1Page implements OnInit{

  public articles         : Article[] = [];
  public page             : number = 1;

  public selectedCountry  : any = {
    id: 'us',
    path: 'assets/icon-flags/us.svg'
  }

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll; 

  constructor ( private newsSrv     : NewsService,
                private popoverSrv  : PopoverService
              ) {

  }
  ngOnInit(){
   this.newsSrv.getTopHeadlines(this.page).subscribe((response: NewsResponse)=>{
      this.articles.push(...response.articles);    //... is spread operator, it iterates each element and concatenate its
    });
  }

  loadData(){
    this.page = this.page + 1;      // we load another page

    this.newsSrv.getTopHeadlines(this.page).subscribe((response: NewsResponse)=>{
      
      if(this.articles.length == response.totalResults){    //when there are no more pages to load, the infinite scroll is disabled
        
        this.ionInfiniteScroll.disabled = true;
        console.log('No more data avaliable');
      }

      this.articles.push(...response.articles);           //if there are more pages, the array concatenate the nesxt page
    });

    setTimeout(()=>{
      this.ionInfiniteScroll.complete();
    }, 3000); 
  }

  async selectCountry(event: any){

    this.selectedCountry = await this.popoverSrv.countriesSelection(event);

    if( (this.selectedCountry.path != undefined) || (this.selectedCountry.id != undefined)){
      
      this.articles = [];
      
      this.newsSrv.getTopHeadlines(1, this.selectedCountry.id).subscribe( (response: NewsResponse)=>{
        this.articles.push(...response.articles);
      } );
    }  
  }

}


