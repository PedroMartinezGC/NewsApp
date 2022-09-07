import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';   //we have to be careful and use the enviroment instead of enviroment.prod
import { NewsResponse, Article } from '../interfaces/index';

//import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService implements OnInit{

  constructor(private _http: HttpClient){}

  ngOnInit(): void {
  }

  getTopHeadlines(page: number, id: string = 'us'): Observable<NewsResponse>{

    return this._http.get<NewsResponse>('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: apiKey,
        country: id,
        page: page,
        category: 'business'
    }});
  }

  getTopHeadlinesByCategory(category: string, page: number, id: string = 'us'): Observable<NewsResponse>{

    return this._http.get<NewsResponse>('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: apiKey,
        country: id,
        category: category,
        page: page
    }});
  }

}
