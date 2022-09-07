import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;
  private localArticles: Article[] = [];

  constructor( private storage: Storage ) {
    this.init();
    this.loadFavorites();
  }

  get getLocalArticles(){
    return [ ...this.localArticles ];
  }

  async init(){

    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any){

    this._storage?.set(key, value);
  }

  async saveRemoveArticle(article: Article){

    const exists = this.localArticles.find(localArticle => localArticle.title === article.title);

    if( exists ){
      this.localArticles = this.localArticles.filter( localArticle => localArticle.title !== article.title )

    }else{ this.localArticles = [article, ...this.localArticles] }

    this._storage.set('articles', this.localArticles);
  }

  async loadFavorites(){

    try{
      const articles = await this._storage.get('articles');
      this.localArticles = articles || [];

    } catch( error ){}
  }

  articleInFavorites( article: Article ){
    return !!this.localArticles.find( localArticle => localArticle.title === article.title );
  }
}
