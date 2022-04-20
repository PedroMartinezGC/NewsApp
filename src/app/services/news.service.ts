import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';   //we have to be careful and use the enviroment instead of enviroment.prod
import { NewsResponse, ArticlesByCategoryAndPage, Article } from '../interfaces/index';

//import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService implements OnInit{

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage;

  constructor(private _http: HttpClient){}

  ngOnInit(): void {
  }

  getTopHeadlines(): Observable<NewsResponse>{

    return this._http.get<NewsResponse>('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: apiKey,
        country: 'us'
    }});
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false): Observable<NewsResponse>{

    return this._http.get<NewsResponse>('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: apiKey,
        country: 'us',
        category: category
    }});
  }

  private getArticlesByCategory(category: string): Observable<Article[]>{

    if(Object.keys(this.articlesByCategoryAndPage).includes(category)){

      //the object already exists
      //this.articlesByCategoryAndPage[category].page += 1;

    }else{
      this.articlesByCategoryAndPage[category] = {
        page: 0,
        articles: []
      }
    }
    const page = this.articlesByCategoryAndPage[category].page + 1;

    return this.executeQuery<NewsResponse>(`/top-headlines?category=${ category }&page=${ page }`)
    .pipe(
      map( ({ articles })=> articles )
    );
  }

}
