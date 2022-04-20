import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces/index';

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

  constructor(private _newsService: NewsService) {

  }

  ngOnInit(): void {
    this.takeHeadlines();
  }

  takeHeadlines(){
    this._newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe(response=>{

      this.articles.splice(0, this.articles.length);

      this.articles.push(...response.articles);

      console.log(this.articles);
    });
  }

  segmentChanged(event: any){
    this.selectedCategory = event.detail.value;

    console.log(this.selectedCategory);

    this.takeHeadlines();
  }

}
