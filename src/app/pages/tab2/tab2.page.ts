import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article, NewsResponse } from '../../interfaces/index';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [NewsService]
})
export class Tab2Page implements OnInit{

  categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology'
  ];

  selectedCategory: string = this.categories[0];
  articles: Article[] = [];
  page: number = 1;

  constructor(private _newsService: NewsService) {

  }

  ngOnInit(): void {
    this.takeHeadlines();
  }

  takeHeadlines(){
    this._newsService.getTopHeadlinesByCategory(this.selectedCategory, this.page).subscribe(response=>{

      this.articles.splice(0, this.articles.length);    //when each category is selected, the articles of the previous are deleted
      this.page = 1;                                    //the initial page is the page 1 each time we change the category

      this.articles.push(...response.articles);

      console.log(this.articles);
    });
  }

  segmentChanged(event: any){
    this.selectedCategory = event.detail.value;

    console.log(this.selectedCategory);

    this.takeHeadlines();
  }

  loadData(event: any){

    this.page = this.page + 1;      //we load another page

    this._newsService.getTopHeadlinesByCategory(this.selectedCategory, this.page).subscribe((response: NewsResponse)=>{
      
      if(this.articles.length == response.totalResults){
        
        event.target.disabled = true;
      }

      this.articles.push(...response.articles);

      console.log('have pushed');
      console.log(this.articles);
    });

    console.log('load more data');

    setTimeout(()=>{
      event.target.complete();
    }, 3000);
  }

}
