import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article;
  @Input() i: number;

  constructor( private iab: InAppBrowser,
               private platform: Platform,
               private actionSheetController: ActionSheetController,
               private socialSharing: SocialSharing,
               private storageSrv: StorageService
  ) { }

  openArticle(){
    if(this.platform.is("ios") || this.platform.is("android")){
      const browser = this.iab.create(this.article.url);
      browser.show();
      return;
    }
  }

  async openOptionsMenu(){

    const articleInFavorite = this.storageSrv.articleInFavorites(this.article);

    const shareButton = {
      text: 'Share',
      icon: 'share-outline',
      handler: ()=> this.shareArticle()
    };

    let normalButtons = [
      {
        text: articleInFavorite ? 'Remove Favorite': 'Favorite',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: ()=> this.favArticle()
      },
      {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'cancel'
      }
    ]

    if ( this.platform.is('capacitor') ){
      normalButtons.push(shareButton);
    }

    const actionSheet = await  this.actionSheetController.create({

      header: 'Options',
      buttons: normalButtons
    });

    await actionSheet.present();
  }


  shareArticle(){

    this.socialSharing.share(

      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    );
  }

  favArticle(){
    this.storageSrv.saveRemoveArticle(this.article);
  }

}
