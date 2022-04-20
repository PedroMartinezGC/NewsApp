import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  providers: [NewsService]
})
export class Tab1Page implements OnInit{

  articles: Article[] = [];

  constructor(private _newsService: NewsService) {

  }
  ngOnInit(){
    this._newsService.getTopHeadlines().subscribe((response)=>{

      this.articles.push(...response.articles);    //... is spread operator, it iterates each element and concatenate its

      console.log(this.articles);
    });
  }

}
