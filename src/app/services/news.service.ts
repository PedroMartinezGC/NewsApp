import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';   //we have to be careful and use the enviroment instead of enviroment.prod
import { NewsResponse } from '../interfaces/index';

//import { map } from 'rxjs/operators';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class NewsService implements OnInit{

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

  getTopHeadlinesByCategory(selectedCategory: string): Observable<NewsResponse>{
    return this._http.get<NewsResponse>('https://newsapi.org/v2/top-headlines', {
      params: {
        apiKey: apiKey,
        country: 'us',
        category: selectedCategory
    }});
  }

}
