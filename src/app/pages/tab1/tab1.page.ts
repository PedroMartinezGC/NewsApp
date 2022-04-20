import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';
import { IonInfiniteScroll } from '@ionic/angular';
import { NewsResponse } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [NewsService]
})
export class Tab1Page implements OnInit{

  articles: Article[] = [];
  page: number = 1;

  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll; 

  constructor(private _newsService: NewsService) {

  }
  ngOnInit(){
    this._newsService.getTopHeadlines(this.page).subscribe((response: NewsResponse)=>{

      this.articles.push(...response.articles);    //... is spread operator, it iterates each element and concatenate its

      console.log(this.articles);
    });
  }

  loadData(){
    this.page = this.page + 1;      //we load another page

    this._newsService.getTopHeadlines(this.page).subscribe((response: NewsResponse)=>{
      
      if(this.articles.length == response.totalResults){    //when there are no more pages to load, the infinite scroll is disabled
        
        this.ionInfiniteScroll.disabled = true;
        console.log('No more data avaliable');
      }

      this.articles.push(...response.articles);           //if there are more pages, the array concatenate the nesxt page

      console.log('have pushed');
    });

    console.log('load more data');

    setTimeout(()=>{
      this.ionInfiniteScroll.complete();
    }, 3000);
  }
}


